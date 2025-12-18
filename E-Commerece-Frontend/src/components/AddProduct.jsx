import React, { useState } from "react";
import { API } from "../utils/Api";

export default function AddProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const product = { name, price, image, description };

    try {
      const res = await fetch(`${API}/api/postProducts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });

      if (res.ok) {
        alert("Product added successfully");
        setName("");
        setPrice("");
        setImage("");
        setDescription("");
      } else {
        alert("Failed to add product");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to add product");
    }
  };

  return (
    <div className="min-h-[550px] flex items-center justify-center bg-[#eaf2ff] px-4">
      <div className="w-full max-w-[500px] p-[30px] bg-white rounded-2xl shadow-xl border border-[#d6e4ff] p-8">
        <h2 className="text-2xl font-semibold text-[#0b1c3d] mb-6 text-center">
          Add Product
        </h2>
 
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-[#0b1c3d] mb-1">
              Product Name
            </label>
            <input
              type="text"
              value={name}
              placeholder="Enter product name"
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-[7px] border border-[#d6e4ff] h-[30px]
                         focus:outline-none focus:ring-2 focus:ring-[#0057ff]"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-[#0b1c3d] mb-1">
              Price
            </label>
            <input
              type="number"
              value={price}
              placeholder="Enter price"
              onChange={(e) => setPrice(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-[7px] border border-[#d6e4ff] h-[30px]
                         focus:outline-none focus:ring-2 focus:ring-[#0057ff]"
            />
          </div>

          {/* Image */}
          <div>
            <label className="block text-sm font-medium text-[#0b1c3d] mb-1">
              Image URL
            </label>
            <input
              type="text"
              value={image}
              placeholder="Enter image URL"
              onChange={(e) => setImage(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-[7px] border border-[#d6e4ff] h-[30px]
                         focus:outline-none focus:ring-2 focus:ring-[#0057ff]"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-[#0b1c3d] mb-1">
              Description
            </label>
            <textarea
              value={description}
              placeholder="Enter product description"
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              required
              className="w-full px-4 py-3 rounded-[7px] border border-[#d6e4ff] h-[30px]
                         focus:outline-none focus:ring-2 focus:ring-[#0057ff]"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="mt-2 w-full py-3 rounded-[7px] bg-[#0057ff]
                       text-white font-medium hover:bg-[#003ecb]
                       transition"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}
