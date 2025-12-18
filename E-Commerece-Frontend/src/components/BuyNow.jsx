import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function BuyNow({ cart, setCart }) {
  const navigate = useNavigate();
  const [orderItems] = useState(cart); // snapshot of cart

  const totalAmount = orderItems.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

  useEffect(() => {
    if (orderItems.length > 0) {
      setCart([]); // clear cart AFTER snapshot
    }
  }, []);

  if (!orderItems || orderItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#eaf2ff]">
        <p className="text-[#0b1c3d]">No order details found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#eaf2ff] px-4">
      <div className="w-[500px] bg-white rounded-2xl shadow-xl p-8">

        <h2 className="text-2xl font-semibold text-center mb-6">
          Order Placed Successfully
        </h2>

        {orderItems.map((item) => (
          <div
            key={item._id}
            className="flex justify-between mb-3"
          >
            <span>
              {item.name} x {item.quantity}
            </span>
            <span>
              ₹{item.price * item.quantity}
            </span>
          </div>
        ))}

        <hr className="my-4" />

        <p className="text-xl font-bold text-center">
          Total: ₹{totalAmount}
        </p>

        <button
          onClick={() => navigate("/")}
          className="w-full mt-6 py-3 bg-blue-600 text-white rounded-lg"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}
