import React, { useState, useEffect } from 'react';
import OrderCard from "../components/OrderCard";
import axios from 'axios';

const KitchenDashboard = () => {
    const [orders, setOrders] = useState([]);
    const [waitingItems, setWaitingItems] = useState({});
    const [completedOrders, setCompletedOrders] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            const result = await axios.get("/api/Order/all-orders");

            const ordersWithItems = result.data
                .map(order => {
                    const filteredItems = order.orderItems
                        .filter(item =>
                            item.dish &&
                            item.dish.categories &&
                            !item.dish.categories.some(cat => cat.categoryId === 3)
                        )
                        .map(item => ({
                            name: item.dish?.name || "Onbekend gerecht",
                            quantity: item.quantity,
                            status: "waiting"
                        }));

                    return {
                        orderId: order.orderId,
                        time: order.orderTime.substring(0, 5),
                        items: filteredItems
                    };
                })
                .filter(order => order.items.length > 0); // Alleen orders met overgebleven items

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
                <h1 className="text-3xl font-bold mb-6 w-full">Keukenoverzicht</h1>
                {orders.map((order) => (
                    <div key={order.orderId} className="w-1/2 p-2">
                        <OrderCard
                            order={order}
                            onUpdate={(updatedOrder) => {
                                setOrders(prevOrders =>
                                    prevOrders.map((o) => o.orderId === updatedOrder.orderId ? updatedOrder : o)
                                );
                            }}
                            onComplete={() => {
                                setOrders(prevOrders => prevOrders.filter(o => o.orderId !== order.orderId));
                                setCompletedOrders(prev => [...prev, order]);
                            }}
                        />
                    </div>
                ))}
            </div>

            <div className="w-1/4 bg-white p-6 flex flex-col">
                <h2 className="text-xl font-bold mb-4">Wachtende Gerechten</h2>
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
                    onClick={() => {
                        if (completedOrders.length === 0) return;

                        const lastCompleted = completedOrders[completedOrders.length - 1];
                        const resetItems = lastCompleted.items.map(item => ({ ...item, status: "waiting" }));
                        const restoredOrder = { ...lastCompleted, items: resetItems };

                        setOrders(prev => {
                            const updated = [...prev, restoredOrder];
                            updated.sort((a, b) => a.time.localeCompare(b.time));
                            return updated;
                        });

                        setCompletedOrders(prev => prev.slice(0, -1));
                    }}
                    className="mt-auto bg-black text-white py-2 px-4 rounded hover:bg-gray-800"
                >
                    Gerecht terughalen
                </button>
            </div>
        </div>
    );
};

export default KitchenDashboard;