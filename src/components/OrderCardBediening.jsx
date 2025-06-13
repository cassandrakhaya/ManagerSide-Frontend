import React from "react";

const OrderCardBediening = ({ order, onComplete }) => {
    const getStatusClass = () => "border-gray-300"; // optioneel, kun je verwijderen

    return (
        <div className="bg-white rounded-2xl shadow-md p-4 mb-6 flex flex-col h-full">
            <div className="flex justify-between items-center mb-3">
                <h2 className="text-xl font-bold">Tafel {order.tableId}</h2>
                <span className="text-gray-500">{order.time}</span>
            </div>

            <ul className="space-y-3 flex-grow">
                {order.items.map((item, index) => (
                    <li
                        key={index}
                        className={`p-3 rounded-lg border-2 ${getStatusClass()}`}
                    >
                        <div className="flex justify-between items-center">
                            <div>
                                <span className="font-medium">
                                    {item.quantity}x {item.name}
                                </span>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>

            <div className="mt-4 text-right">
                <button
                    className="w-full px-4 py-2 rounded text-white bg-green-600 hover:bg-green-700"
                    onClick={onComplete}
                >
                    Bestelling is klaar
                </button>
            </div>
        </div>
    );
};

export default OrderCardBediening;
