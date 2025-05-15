import React, { useState, useEffect } from 'react';
import OrderCardBar from "../components/OrderCardBar";

// Dummy data (vervang dit met je backend data in de toekomst)
const dummyOrders = [
    {
      table: 1,
      time: "13:12",
      items: [
        { name: "Coca-Cola", quantity: 2, status: "waiting" },
        { name: "Verse Jus d'Orange", quantity: 1, status: "waiting" },
        { name: "Spa Blauw", quantity: 1, status: "waiting" }
      ]
    },
    {
      table: 4,
      time: "13:25",
      items: [
        { name: "Bavaria", quantity: 3, status: "waiting" },
        { name: "Tonic", quantity: 2, status: "waiting" }
      ]
    },
    {
      table: 9,
      time: "13:32",
      items: [
        { name: "Spa Rood", quantity: 1, status: "waiting" }
      ]
    },
    {
      table: 11,
      time: "13:35",
      items: [
        { name: "Radler", quantity: 2, status: "waiting" }
      ]
    },
    {
      table: 2,
      time: "13:52",
      items: [
        { name: "Cappuccino", quantity: 1, status: "waiting" },
        { name: "Latte Macchiato", quantity: 1, status: "waiting" }
      ]
    },
    {
      table: 12,
      time: "14:02",
      items: [
        { name: "Bavaria", quantity: 1, status: "waiting" },
        { name: "Tonic", quantity: 1, status: "waiting" }
      ]
    },
    {
      table: 3,
      time: "14:03",
      items: [
        { name: "Coca-Cola", quantity: 1, status: "waiting" },
        { name: "Spa Blauw", quantity: 1, status: "waiting" }
      ]
    },
    {
      table: 5,
      time: "14:05",
      items: [
        { name: "Radler", quantity: 2, status: "waiting" },
        { name: "Tonic", quantity: 2, status: "waiting" }
      ]
    },
    {
      table: 6,
      time: "14:08",
      items: [
        { name: "Espresso", quantity: 1, status: "waiting" },
        { name: "Latte Macchiato", quantity: 1, status: "waiting" }
      ]
    },
    {
      table: 4,
      time: "14:10",
      items: [
        { name: "Bavaria", quantity: 3, status: "waiting" },
        { name: "Tonic", quantity: 2, status: "waiting" }
      ]
    },
    {
      table: 1,
      time: "14:12",
      items: [
        { name: "Coca-Cola", quantity: 2, status: "waiting" },
        { name: "Verse Jus d'Orange", quantity: 1, status: "waiting" },
        { name: "Spa Blauw", quantity: 1, status: "waiting" }
      ]
    },
    {
      table: 4,
      time: "14:14",
      items: [
        { name: "Bavaria", quantity: 5, status: "waiting" },
        { name: "Tonic", quantity: 3, status: "waiting" }
      ]
    }
  ];  

const BarDashboard = () => {
  const [orders, setOrders] = useState(dummyOrders);
  const [waitingItems, setWaitingItems] = useState({});

  useEffect(() => {
    const itemsCount = {};

    // Tel het aantal gerechten in de wachtstatus
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
    <div className="flex h-screen bg-[#F5F5F5]"> {/* Lichtgrijze achtergrond voor de pagina */}
      <div className="w-3/4 p-6 flex flex-wrap">
        <h1 className="text-3xl font-bold mb-6 w-full">Bar overzicht</h1>
        {orders.map((order, index) => (
          <div key={index} className="w-1/2 p-2">
            <OrderCardBar order={order} />
          </div>
        ))}
      </div>

      {/* Zijbalk met wachtende gerechten */}
      <div className="w-1/4 bg-white p-6 flex flex-col"> {/* Wit voor de zijbalk */}
        <h2 className="text-xl font-bold mb-4">Wachtende Drankjes</h2>
        <ul className="flex-grow">
          {Object.entries(waitingItems).map(([itemName, quantity]) => (
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

export default BarDashboard;
