import React, { useState, useEffect } from 'react';
import OrderCard from "../components/OrderCard";

// Dummy data (vervang dit met je backend data in de toekomst)
const dummyOrders = [
  {
    table: 1,
    time: "13:12",
    items: [
      { name: "Pizza Funghi", quantity: 2, status: "waiting" },
      { name: "Lasagne", quantity: 1, status: "waiting" },
      { name: "Salade Caprese", quantity: 1, status: "waiting" }
    ]
  },
  {
    table: 4,
    time: "13:25",
    items: [
      { name: "Burger", quantity: 3, status: "waiting" },
      { name: "Frietjes", quantity: 2, status: "waiting" }
    ]
  },
  {
    table: 9,
    time: "13:32",
    items: [
      { name: "Salade Caprese", quantity: 1, status: "waiting" }
    ]
  },
  {
    table: 11,
    time: "13:35",
    items: [
      { name: "Burger", quantity: 2, status: "waiting" }
    ]
  },
  {
    table: 2,
    time: "13:52",
    items: [
      { name: "Lasagne", quantity: 1, status: "waiting" },
      { name: "Salade Caprese", quantity: 1, status: "waiting" }
    ]
  },
  {
    table: 12,
    time: "14:02",
    items: [
      { name: "Burger", quantity: 1, status: "waiting" },
      { name: "Frietjes", quantity: 1, status: "waiting" }
    ]
  },
  {
    table: 3,
    time: "14:03",
    items: [
      { name: "Pizza Funghi", quantity: 1, status: "waiting" },
      { name: "Salade Caprese", quantity: 1, status: "waiting" }
    ]
  },
  {
    table: 5,
    time: "14:05",
    items: [
      { name: "Burger", quantity: 2, status: "waiting" },
      { name: "Frietjes", quantity: 2, status: "waiting" }
    ]
  },
  {
    table: 6,
    time: "14:08",
    items: [
      { name: "Pizza Funghi", quantity: 1, status: "waiting" },
      { name: "Lasagne", quantity: 1, status: "waiting" }
    ]
  },
  {
    table: 4,
    time: "14:10",
    items: [
      { name: "Burger", quantity: 3, status: "waiting" },
      { name: "Frietjes", quantity: 2, status: "waiting" }
    ]
  },
  {
    table: 1,
    time: "14:12",
    items: [
      { name: "Pizza Funghi", quantity: 2, status: "waiting" },
      { name: "Lasagne", quantity: 1, status: "waiting" },
      { name: "Salade Caprese", quantity: 1, status: "waiting" }
    ]
  },
  {
    table: 4,
    time: "14:14",
    items: [
      { name: "Burger", quantity: 5, status: "waiting" },
      { name: "Frietjes", quantity: 3, status: "waiting" }
    ]
  }
];

const KitchenDashboard = () => {
  const [orders, setOrders] = useState(dummyOrders);
  const [waitingItems, setWaitingItems] = useState({});

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
