import React, { useState, useEffect } from 'react';
import OrderCardBediening from "../components/OrderCardBediening";
import axios from 'axios';
import * as signalR from '@microsoft/signalr';

const BedieningDashboard = () => {
    const [orders, setOrders] = useState([]);
    const [doneItems, setDoneItems] = useState({});
    const [completedOrders, setCompletedOrders] = useState([]);
    const [connection, setConnection] = useState(null);

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        const connection = new signalR.HubConnectionBuilder()
            .withUrl('https://localhost:7117/orderhub', { withCredentials: true })
            .withAutomaticReconnect()
            .configureLogging(signalR.LogLevel.Debug)
            .build();

        connection.on('ReceiveOrder', (order) => {
            console.log('Nieuwe order ontvangen via SignalR (bediening):', order);

            if (order.status === "Waiting" || order.status === "Bar Finished" || order.status === "Keuken Finished") {
                setOrders(prev => prev.filter(o => o.orderId !== order.orderId));
                return;
            }

            const filteredItems = order.orderItems
                .filter(item =>
                    order.status === "Done" ||
                    order.status === "Bar Done" ||
                    order.status === "Keuken Done" ||
                    order.status === "Bar PreDone" ||
                    order.status === "Keuken PreDone"
                )
                .map(item => ({
                    name: item.dish?.name || item.dishName || "Onbekend gerecht",
                    quantity: item.quantity,
                    status: "done"
                }));

            if (filteredItems.length === 0) return;

            const newOrder = {
                tableId: order.tableId,
                orderId: order.orderId,
                time: order.orderTime.substring(0, 5),
                items: filteredItems
            };

            setOrders(prev => {
                const existing = prev.find(o => o.orderId === newOrder.orderId);
                let updated;
                if (existing) {
                    updated = prev.map(o => o.orderId === newOrder.orderId ? newOrder : o);
                } else {
                    updated = [...prev, newOrder];
                }
                updated.sort((a, b) => a.time.localeCompare(b.time));
                return updated;
            });
        });

        connection.start()
            .then(() => {
                console.log('Verbonden met SignalR hub');
                setConnection(connection);
            })
            .catch(err => {
                console.error('SignalR Connection Error:', err);
            });

        return () => {
            connection.stop().then(() => console.log('SignalR verbinding gestopt.'));
        };
    }, []);
    

    const getData = async () => {
        try {
            const result = await axios.get("/api/Order/all-orders");

            const ordersWithItems = result.data
                .filter(order => 
                    order.status === "Done" ||
                    order.status === "Bar Done" ||
                    order.status === "Keuken Done" ||
                    order.status === "Bar PreDone" ||
                    order.status === "Keuken PreDone"
                )
                .map(order => {
                    const filteredItems = order.orderItems.map(item => ({
                        name: item.dish?.name || "Onbekend gerecht",
                        quantity: item.quantity,
                        status: "done"
                    }));

                    return {
                        orderId: order.orderId,
                        tableId: order.tableId,
                        status: order.status,
                        time: order.orderTime.substring(0, 5),
                        items: filteredItems
                    };
                });

            ordersWithItems.sort((a, b) => a.time.localeCompare(b.time));
            setOrders(ordersWithItems);
        } catch (error) {
            console.error("Error bij ophalen van data:", error);
        }
    };

    useEffect(() => {
        const itemsCount = {};

        orders.forEach(order => {
            order.items.forEach(item => {
                if (item.status === "done") {
                    itemsCount[item.name] = (itemsCount[item.name] || 0) + item.quantity;
                }
            });
        });

        setDoneItems(itemsCount);
    }, [orders]);

    return (
        <div className="flex h-screen bg-[#F5F5F5]">
            <div className="w-full p-6 overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">Bedieningoverzicht</h1>
                    <button
                        onClick={async () => {
                            if (completedOrders.length === 0) return;

                            const lastCompleted = completedOrders[completedOrders.length - 1];

                            await getData();
                            let newStatus = null;

                            switch (lastCompleted.status) {
                                case "Finished":
                                case "Bar PreDone":
                                case "Keuken PreDone":
                                    newStatus = "Done";
                                    break;
                                case "Bar Finished":
                                    newStatus = "Bar Done";
                                    break;
                                case "Keuken Finished":
                                    newStatus = "Keuken Done";
                                    break;
                                default:
                                    console.log("Kan bediening-status niet terugzetten voor status:", lastCompleted.status);
                                    return;
                            }

                            const resetItems = lastCompleted.items.map(item => ({...item, status: "done"}));
                            const restoredOrder = {...lastCompleted, items: resetItems};

                            setOrders(prev => {
                                const updated = [...prev, restoredOrder];
                                updated.sort((a, b) => a.time.localeCompare(b.time));
                                return updated;
                            });

                            setCompletedOrders(prev => prev.slice(0, -1));

                            axios.put(
                                `https://localhost:7117/api/Order/${lastCompleted.orderId}/status`,
                                `"Done"`,
                                {
                                    headers: {
                                        'Content-Type': 'application/json'
                                    }
                                }
                            ).then(response => {
                                console.log("Status succesvol teruggezet naar Done:", response.data);
                            }).catch(error => {
                                console.error("Fout bij terugzetten status:", error);
                            });
                        }}
                        className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800"
                    >
                        Bestelling terughalen
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {orders.map((order) => (
                        <OrderCardBediening
                            key={order.orderId}
                            order={order}
                            onUpdate={(updatedOrder) => {
                                setOrders(prevOrders =>
                                    prevOrders.map((o) => o.orderId === updatedOrder.orderId ? updatedOrder : o)
                                );
                            }}
                            onComplete={async () => {
                                await getData();
                                let newStatus = order.status;

                                if (order.status === "Bar Done") {
                                    newStatus = "Bar Finished";
                                } else if (order.status === "Keuken Done") {
                                    newStatus = "Keuken Finished";
                                } else if (order.status === "Done") {
                                    newStatus = "Finished";
                                } else if (order.status === "Bar PreDone" || order.status === "Keuken PreDone") {
                                    newStatus = "Finished";
                                } else {
                                    // Geen update nodig, bar is al klaar
                                    console.log("Bar al afgehandeld, geen update nodig.", newStatus);
                                    setOrders(prevOrders => prevOrders.filter(o => o.orderId !== order.orderId));
                                    setCompletedOrders(prev => [...prev, order]);
                                    return;
                                }

                                console.log("Nieuwe status: ", newStatus);
                                setOrders(prevOrders => prevOrders.filter(o => o.orderId !== order.orderId));
                                setCompletedOrders(prev => [...prev, order]);

                                axios.put(
                                    `https://localhost:7117/api/Order/${order.orderId}/status`,
                                    JSON.stringify(newStatus),
                                    {
                                        headers: {
                                            'Content-Type': 'application/json'
                                        }
                                    }
                                ).then(response => {
                                    console.log("Status succesvol aangepast naar Finished:", response.data);
                                }).catch(error => {
                                    console.error("Fout bij aanpassen status:", error);
                                });
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BedieningDashboard;
