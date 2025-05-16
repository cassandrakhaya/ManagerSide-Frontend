import React, { useState, useEffect } from 'react';
import OrderCard from "../components/OrderCard";
import axios from 'axios';

const KitchenDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [waitingItems, setWaitingItems] = useState({});
  const [data, setData] = useState({});

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const result = await axios.get("/api/Order/all-ordered-items");
      const grouped = groupByOrderId(result.data);

      const ordersWithTime = await Promise.all(
          grouped.map(async (order) => {
            try {
              const orderDetails = await axios.get(`/api/Order/${order.orderId}`);
              const time = orderDetails.data.orderTime?.substring(0, 5);
              return { ...order, time };
            } catch (err) {
              console.error(`Fout bij ophalen van order ${order.orderId}`, err);
              return { ...order, time: "Onbekend" };
            }
          })
      );

      ordersWithTime.sort((a, b) => a.time.localeCompare(b.time));

      setOrders(ordersWithTime);
      console.log("Data responds:", ordersWithTime);
    } catch (error) {
      console.error("Error met ophalen van data:", error);
      toast.error("Data ophalen mislukt!");
    }
  };



  const groupByOrderId = (items) => {
    const grouped = {};

    items.forEach(item => {
      const orderId = item.orderId;
      if (!grouped[orderId]) {
        grouped[orderId] = {
          orderId,
          items: []
        };
      }

      grouped[orderId].items.push({
        name: item.dishName,
        quantity: item.quantity,
        status: item.status || "waiting",
      });
    });

    // Convert object naar array
    return Object.values(grouped);
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

        <button
            onClick={() => {
              console.log("Gerecht terughalen");
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
