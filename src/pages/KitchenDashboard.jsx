import React, { useState, useEffect } from 'react';
import OrderCard from "../components/OrderCard";
import axios from 'axios';

const KitchenDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [waitingItems, setWaitingItems] = useState({});
  const [dishes, setDishes] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ordersRes, dishesRes] = await Promise.all([
          axios.get("http://localhost:5068/api/order"),
          axios.get("http://localhost:5068/api/dish")
        ]);

        const dishMap = {};
        dishesRes.data.forEach(d => {
          dishMap[d.dishID] = d.name;
        });
        setDishes(dishMap);

        const transformedOrders = ordersRes.data.map(order => ({
          table: order.tableId,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          items: order.orderedItems.map(item => ({
            name: dishMap[item.dishId] || `Dish ${item.dishId}`,
            quantity: item.quantity,
            status: "waiting"
          }))
        }));

        setOrders(transformedOrders);
      } catch (error) {
        console.error("Fout bij ophalen van data:", error);
      }
    };

    fetchData();
  }, []);

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
        {orders.map((order, index) => (
          <div key={index} className="w-1/2 p-2">
            <OrderCard
              order={order}
              onUpdate={(updatedOrder) => {
                setOrders(prevOrders =>
                  prevOrders.map((o, i) => (i === index ? updatedOrder : o))
                );
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
      </div>
    </div>
  );
};

export default KitchenDashboard;
