import React, { useState, useEffect } from 'react';
import OrderCardBar from "../components/OrderCardBar";
import axios from 'axios';
import * as signalR from '@microsoft/signalr';

const BarDashboard = () => {
    const [orders, setOrders] = useState([]);
    const [waitingItems, setWaitingItems] = useState({});
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
        console.log('Nieuwe order ontvangen via SignalR:', order);

          if (order.status === "Finished" || order.status === "Bar Finished" || order.status === "Keuken PreDone" || order.status === "Done") {
              setOrders(prev => prev.filter(o => o.orderId !== order.orderId));
              return;
          }
    
        const filteredItems = order.orderItems
    .filter(item =>
      item.dish &&
      item.dish.categories &&
      item.dish.categories.some(cat => cat.categoryId === 3)
    )
    .map(item => ({
      name: item.dish?.name || item.dishName || "Onbekend gerecht",
      quantity: item.quantity,
      status: "waiting"
    }));

  if (filteredItems.length === 0) return; // Geen relevante items? Sla de order over

  const newOrder = {
    tableId: order.tableId,
    orderId: order.orderId,
      status: order.status,
    time: order.orderTime.substring(0, 5),
    items: filteredItems
  };

          setOrders(prev => {
              const exists = prev.some(o => o.orderId === newOrder.orderId);
              if (exists) {
                  return prev.map(o =>
                      o.orderId === newOrder.orderId ? newOrder : o
                  );
              } else {
                  const updated = [...prev, newOrder];
                  updated.sort((a, b) => a.time.localeCompare(b.time));
                  return updated;
              }
          });
});
    
      // Start de verbinding
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
                const result = await axios.get("https://localhost:7117/api/Order/all-orders");

                const ordersWithItems = result.data
                    .map(order => {
                        const filteredItems = order.orderItems
                            .filter(item =>
                                item.dish &&
                                item.dish.categories &&
                                item.dish.categories.some(cat => cat.categoryId === 3) &&
                                order.status !== "Done" &&
                                order.status !== "Finished" &&
                                order.status !== "Bar Done" &&
                                order.status !== "Bar PreDone" &&
                                order.status !== "Bar Finished" &&
                                order.status !== "Keuken PreDone"
                            )
                            .map(item => ({
                                name: item.dish?.name || "Onbekend gerecht",
                                quantity: item.quantity,
                                status: "waiting"
                            }));

                        return {
                            tableId: order.tableId,
                            orderId: order.orderId,
                            status: order.status,
                            time: order.orderTime.substring(0, 5),
                            items: filteredItems
                        };
                    })
                    .filter(order => order.items.length > 0);

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
                    if (item.status === "waiting") {
                        itemsCount[item.name] = (itemsCount[item.name] || 0) + item.quantity;
                    }
                });
            });

            setWaitingItems(itemsCount);
        }, [orders]);

        return (
            <div className="flex h-screen bg-[#F5F5F5]">
                <div className="w-3/4 p-6 flex flex-wrap overflow-y-auto">
                    <h1 className="text-3xl font-bold mb-6 w-full">Baroverzicht</h1>
                    {orders.map((order) => (
                        <div key={order.orderId} className="w-1/2 p-2">
                            <OrderCardBar
                                order={order}
                                onUpdate={(updatedOrder) => {
                                    setOrders(prevOrders =>
                                        prevOrders.map((o) => o.orderId === updatedOrder.orderId ? updatedOrder : o)
                                    );
                                }}
                                onComplete={async () => {
                                    let newStatus = order.status;

                                    if (order.status === "Pending" || order.status === "Waiting") {
                                        newStatus = "Bar Done";
                                    } else if (order.status === "Keuken Done") {
                                        newStatus = "Done";
                                    } else if (order.status === "Keuken Finished") {
                                        newStatus = "Bar PreDone";
                                    } else {
                                        // Geen update nodig, bar is al klaar
                                        console.log("Bar al afgehandeld, geen update nodig.", newStatus);
                                        setOrders(prevOrders => prevOrders.filter(o => o.orderId !== order.orderId));
                                        setCompletedOrders(prev => [...prev, order]);
                                        return;
                                    }
                                    console.log("Nieuwe status: ", newStatus);

                                    axios.put(
                                        `https://localhost:7117/api/Order/${order.orderId}/status`,
                                        JSON.stringify(newStatus),
                                        {
                                            headers: {
                                                'Content-Type': 'application/json'
                                            }
                                        }
                                    ).then(response => {
                                        console.log("Status succesvol aangepast:", response.data);
                                        setOrders(prevOrders => prevOrders.filter(o => o.orderId !== order.orderId));
                                        setCompletedOrders(prev => [...prev, order]);
                                    }).catch(error => {
                                        console.error("Fout bij aanpassen status:", error);
                                    });
                                }}
                            />
                        </div>
                    ))}
                </div>

                <div className="w-1/4 bg-white p-6 flex flex-col">
                    <h2 className="text-xl font-bold mb-4">Wachtende Drankjes</h2>
                    <ul className="flex-grow">
                        {Object.entries(waitingItems)
                            .sort(([a], [b]) => a.localeCompare(b))
                            .map(([itemName, quantity]) => (
                                <li key={itemName} className="flex justify-between mb-2">
                                    <span>{itemName}</span>
                                    <span className="font-semibold">{quantity}x</span>
                                </li>
                            ))}
                    </ul>
                    <button
                        onClick={async () => {
                            if (completedOrders.length === 0) return;

                            const lastCompleted = completedOrders[completedOrders.length - 1];

                            await getData();
                            let newStatus = null;

                            switch (lastCompleted.status) {
                                case "Bar Done":
                                case "Pending":
                                case "Waiting":
                                    newStatus = "Waiting";
                                    break;
                                case "Bar PreDone":
                                    newStatus = "Keuken Finished";
                                    break;
                                case "Done":
                                    newStatus = "Keuken Done";
                                    break;
                                case "Finished":
                                    newStatus = "Keuken Finished";
                                    break;
                                case "Keuken PreDone":
                                    newStatus = "Keuken Done";
                                    break;
                                case "Bar Finished":
                                    newStatus = "Waiting";
                                    break;
                                default:
                                    console.log("Kan bar-status niet terugzetten voor status:", lastCompleted.status);
                                    return;
                            }

                            const resetItems = lastCompleted.items.map(item => ({...item, status: "waiting"}));
                            const restoredOrder = {...lastCompleted, items: resetItems, status: newStatus};

                            setOrders(prev => {
                                const updated = [...prev, restoredOrder];
                                updated.sort((a, b) => a.time.localeCompare(b.time));
                                return updated;
                            });

                            setCompletedOrders(prev => prev.slice(0, -1));

                            axios.put(
                                `https://localhost:7117/api/Order/${lastCompleted.orderId}/status`,
                                JSON.stringify(newStatus),
                                {
                                    headers: {
                                        'Content-Type': 'application/json'
                                    }
                                }
                            ).then(response => {
                                console.log("Bar-status succesvol teruggezet naar:", newStatus);
                            }).catch(error => {
                                console.error("Fout bij terugzetten status:", error);
                            });
                        }}
                        className="mt-auto bg-black text-white py-2 px-4 rounded hover:bg-gray-800"
                    >
                        Drankjes terughalen
                    </button>
                </div>
            </div>
        );
    };

    export default BarDashboard;