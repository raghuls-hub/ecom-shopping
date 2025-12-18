import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email) return;
    localStorage.setItem("user", email);
    navigate("/");
  };

  return (
    <div className="max-h-screen flex items-center justify-center bg-[#eaf2ff]">
      {/* CARD */}
      <div className="w-full max-w-[420px] p-[30px] bg-white rounded-2xl shadow-xl border border-[#d6e4ff] p-8">
        <h2 className="text-2xl font-semibold text-[#0b1c3d] text-center mb-6">
          Login
        </h2>

        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full h-[50px] px-4 py-3 mb-[30px] rounded-[10px] border border-[#d6e4ff] text-[#0b1c3d]
                       focus:outline-none focus:ring-2 focus:ring-[#0057ff]"
          />

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-[#0057ff] text-white font-medium
                       hover:bg-[#003ecb] transition"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-[#3b5b8a]">
          Use any email to continue
        </p>
      </div>
    </div>
  );
}
