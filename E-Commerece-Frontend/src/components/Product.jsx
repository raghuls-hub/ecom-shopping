import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { API } from "../utils/Api";
import { useNavigate } from "react-router-dom";

export default function Product({ cart, setCart }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  const handleAddToCart = () => {
  const existing = cart.find((p) => p._id === product._id);

  if (existing) {
    setCart(
      cart.map((p) =>
        p._id === product._id
          ? { ...p, quantity: p.quantity + 1 }
          : p
      )
    );
  } else {
    setCart([
      ...cart,
      {
        _id: product._id,
        name: product.name,
        price: product.price,
        description: product.description,
        image: product.image,
        quantity: 1,
      },
    ]);
  }

  navigate("/");
};


  useEffect(() => {
    fetch(`${API}/api/getProducts`)
      .then((res) => res.json())
      .then((data) => {
        const prod = data.find((p) => p._id === id);
        setProduct(prod);
      });
  }, [id]);

  if (!product) return <p className="text-center py-10">Product not found</p>;

  return (
    <div className="container mx-auto px-4 py-12 flex justify-center rounded-[20px] border w-[500px] p-[30px] shadow-[0_10px_30px_rgba(0,0,0,0.15)] ">
      <div className="w-[500px] h-[500px] bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden flex flex-col">
        {/* Image */}
        <div className="h-1/2 w-full">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="h-1/2 p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
              {product.name}
            </h2>

            <div className="text-2xl font-bold text-indigo-600 mb-3">
              ₹{product.price}
            </div>

            <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed line-clamp-3">
              {product.description}
            </p>
          </div>

          <button
            onClick={handleAddToCart}
            className="inline-flex justify-center items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition border-1 rounded-[20px] p-[5px]"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
