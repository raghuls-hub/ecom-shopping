import React from "react";
import { useNavigate } from "react-router-dom";

export default function Cart({ cart, setCart }) {
  const navigate = useNavigate();

  const removeItem = (_id) => {
    setCart(cart.filter((item) => item._id !== _id));
  };

  const increaseQty = (item) => {
    setCart(
      cart.map((p) =>
        p._id === item._id
          ? { ...p, quantity: p.quantity + 1 }
          : p
      )
    );
  };

  const decreaseQty = (item) => {
    if (item.quantity === 1) return;

    setCart(
      cart.map((p) =>
        p._id === item._id
          ? { ...p, quantity: p.quantity - 1 }
          : p
      )
    );
  };

  const totalPrice = cart.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-6 text-[#0b1c3d]">
        Your Cart
      </h2>

      {cart.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center shadow-md border border-[#d6e4ff]">
          <p className="text-[#3b5b8a]">Your cart is empty.</p>
        </div>
      ) : (
        <>
          <div className="flex flex-wrap justify-center gap-[20px]">
            {cart.map((item) => (
              <div
                key={item._id}
                className="w-[350px] h-[380px] bg-white rounded-2xl shadow-md border border-[#d6e4ff] p-4 flex flex-col"
              >
                <div className="h-[160px] bg-[#d6e4ff] rounded-xl flex items-center justify-center overflow-hidden mb-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="flex-1">
                  <h3 className="font-semibold text-[#0b1c3d] truncate">
                    {item.name}
                  </h3>

                  <p className="text-sm text-[#3b5b8a] mt-1 line-clamp-2">
                    {item.description}
                  </p>

                  <p className="text-lg font-bold text-[#0057ff] mt-3">
                    ₹{item.price}
                  </p>

                  {/* QUANTITY CONTROLS */}
                  <div className="flex items-center gap-3 mt-2">
                    <button
                      onClick={() => decreaseQty(item)}
                      className="w-8 h-8 mr-[3px] border border-[#0057ff] text-[#0057ff] hover:bg-[#0057ff] hover:text-white transition"
                    >
                      −
                    </button>

                    <span className="text-sm font-medium">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => increaseQty(item)}
                      className="w-8 h-8 ml-[3px] border border-[#0057ff] text-[#0057ff] hover:bg-[#0057ff] hover:text-white transition"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="mt-auto">
                  <button
                    onClick={() => removeItem(item._id)}
                    className="w-full py-2 rounded-lg border border-[#e11d48] text-[#e11d48] font-medium hover:bg-[#e11d48] hover:text-white transition"
                  >
                    Remove from Cart
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col items-center gap-4">
            <div className="w-full max-w-[350px] bg-white rounded-2xl p-6 shadow-md border border-[#d6e4ff] text-center">
              <p className="text-[#3b5b8a] mb-2">Total Amount</p>
              <p className="text-2xl font-bold text-[#0057ff]">
                ₹{totalPrice}
              </p>
            </div>

            <button
              onClick={() => navigate("/buynow")}
              className="w-full max-w-[350px] py-3 rounded-lg bg-[#0057ff] text-white font-medium hover:bg-[#003ecb] transition"
            >
              Place Order
            </button>
          </div>
        </>
      )}
    </div>
  );
}
