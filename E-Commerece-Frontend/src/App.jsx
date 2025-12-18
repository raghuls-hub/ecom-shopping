import { Link, Route, Routes } from "react-router-dom";
import Products from "./components/Products";
import Product from "./components/Product";
import { useEffect, useState } from "react";
import Cart from "./components/Cart";
import BuyNow from "./components/BuyNow";
import Login from "./components/Login";
import ProtectedRoute from "./pages/ProtectedRoute";
import AddProduct from "./components/AddProduct";
function App() {
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const logout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <>
      <div>
        <header
          style={{
            textAlign: "center",
            display: "flex",
            justifyContent: "space-between",
            height: "80px",
            marginBottom: "40px",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)",
          }}
        >
          <Link to="/">
            <h1
              style={{
                alignContent: "center",
                marginTop: "0px",
                fontSize: "45px",
              }}
            >
              Ragkra Shopping
            </h1>
          </Link>{" "}
          <span style={{ fontSize: "20px", alignContent: "center" }}>
            <Link to="/addproduct">Add Product</Link>
            {" | "}
            <Link to="/cart">Cart ({cart.length})</Link> {" | "}
            {localStorage.getItem("user") ? (
              <button onClick={logout}>Logout</button>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </span>
        </header>
        <main>
          <Routes>
            <Route
              path="/"
              element={<Products cart={cart} setCart={setCart} />}
            ></Route>
            <Route
              path="/product/:id"
              element={<Product cart={cart} setCart={setCart} />}
            />

            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <Cart cart={cart} setCart={setCart} />
                </ProtectedRoute>
              }
            ></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/addproduct" element={<AddProduct />}></Route>
            <Route
              path="/buynow"
              element={
                <ProtectedRoute>
                  <BuyNow cart={cart} setCart={setCart} />
                </ProtectedRoute>
              }
            ></Route>
          </Routes>
        </main>
        <footer>
          <p>&#169; 2025 MERN Ecommerce Project</p>
        </footer>
      </div>
    </>
  );
}
export default App;
