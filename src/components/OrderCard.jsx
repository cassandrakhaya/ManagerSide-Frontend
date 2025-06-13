import React, { useState } from "react";

const OrderCard = ({ order, onUpdate, onComplete }) => {
  const [items, setItems] = useState(order.items);

  const updateStatus = (index, newStatus) => {
    const updated = [...items];
    updated[index].status = newStatus;
    setItems(updated);
    onUpdate({ ...order, items: updated });
  };

  const allDone = items.every(item => item.status === "done");

  const getStatusClass = (status) => {
    switch (status) {
      case "waiting":
        return "border-red-500";
      case "inProgress":
        return "border-yellow-400";
      case "done":
        return "border-green-500";
      default:
        return "";
    }
  };

  return (
      <div className="bg-white rounded-2xl shadow-md p-4 mb-6 flex flex-col h-full">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-bold">Tafel {order.tableId}</h2>
          <span className="text-gray-500">{order.time}</span>
        </div>

        <ul className="space-y-3 flex-grow">
          {items.map((item, index) => (
              <li
                  key={index}
                  className={`p-3 rounded-lg border-2 ${getStatusClass(item.status)}`}
              >
                <div className="flex justify-between items-center">
                  <div>
                <span className="font-medium">
                  {item.quantity}x {item.name}
                </span>
                  </div>
                  <div className="space-x-1">
                    <button
                        className={`px-4 py-2 rounded ${item.status === "waiting" ? "bg-red-500 text-white" : "bg-gray-200"}`}
                        onClick={() => updateStatus(index, "waiting")}
                    >
                      Wacht
                    </button>
                    <button
                        className={`px-4 py-2 rounded ${item.status === "inProgress" ? "bg-yellow-400 text-white" : "bg-gray-200"}`}
                        onClick={() => updateStatus(index, "inProgress")}
                    >
                      Bezig
                    </button>
                    <button
                        className={`px-4 py-2 rounded ${item.status === "done" ? "bg-green-500 text-white" : "bg-gray-200"}`}
                        onClick={() => updateStatus(index, "done")}
                    >
                      Klaar
                    </button>
                  </div>
                </div>
              </li>
          ))}
        </ul>

        <div className="mt-4 text-right">
          <button
              className={`w-full px-4 py-2 rounded text-white ${allDone ? "bg-green-600 hover:bg-green-700" : "bg-gray-400 cursor-not-allowed"}`}
              disabled={!allDone}
              onClick={onComplete}
          >
            Bestelling is klaar
          </button>
        </div>
      </div>
  );
};

export default OrderCard;
