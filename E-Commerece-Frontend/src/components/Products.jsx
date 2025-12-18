import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API } from "../utils/Api";

export default function Products({ setCart, cart }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${API}/api/getProducts`)
      .then((res) => res.json())
      .then(setProducts)
      .catch(console.error);
  }, []);

  const addToCart = (item) => {
  const existing = cart.find((p) => p._id === item._id);

  if (existing) {
    setCart(
      cart.map((p) =>
        p._id === item._id
          ? { ...p, quantity: p.quantity + 1 }
          : p
      )
    );
  } else {
    setCart([
      ...cart,
      {
        _id: item._id,
        name: item.name,
        price: item.price,
        description: item.description,
        image: item.image,
        quantity: 1,
      },
    ]);
  }
};


  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      await fetch(`${API}/api/deleteProducts/${id}`, {
        method: "DELETE",
      });
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch {
      alert("Delete failed");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-6 text-center">All Products</h2>

      {/* FLEX CONTAINER */}
      <div className="flex flex-wrap justify-center gap-[20px]">
        {products.map((p) => (
          <div className="CARD">
            <div
              key={p._id}
              className="w-[350px] h-[350px] bg-white dark:bg-gray-800 rounded-lg shadow-md flex flex-col"
            >
              {/* IMAGE */}
              <div className="h-[150px] flex items-center justify-center bg-gray-100">
                <img
                  src={p.image}
                  alt={p.name}
                  className="h-[120px] w-[120px] object-cover rounded"
                />
              </div>

              {/* CONTENT */}
              <div className="flex-1 px-4 py-3 flex flex-col">
                <h3 className="text-sm font-semibold truncate">{p.name}</h3>

                <p className="text-xs mt-1 line-clamp-2">{p.description}</p>

                <div className="text-sm font-bold mt-2">₹{p.price}</div>

                {/* BUTTONS */}
                <div className="mt-auto flex gap-2">
                  <Link
                    to={`/product/${p._id}`}
                    className="flex-1 text-center text-xs py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
                  >
                    View
                  </Link>

                  <button
                    onClick={() => addToCart(p)}
                    className="flex-1 text-xs py-2 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Add to cart
                  </button>

                  <button
                    onClick={() => deleteProduct(p._id)}
                    className="flex-1 text-xs py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
