import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Footer from "./component/Footer";
import Navbar from "./component/Navbar";
import Cart from "./page/Cart";
import Home from "./page/Home";
import Login from "./page/Login";
import Order from "./page/Order";
import OrderDetail from "./page/OrderDetail";
import PageNotFound from "./page/PageNotFound";
import ProductDetail from "./page/ProductDetail";
import Register from "./page/Register";
import UserPage from "./page/UserPage";
import { useAppSelector } from "./redux/hooks";

const App = () => {
  const user = useAppSelector((state) => state.user.currentUser);
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/*" element={<PageNotFound />} />
          <Route path="/" element={<Home />} />
          <Route path="/search/:keyword" element={<Home />} />
          <Route
            path="/login"
            element={user ? <Navigate replace to="/" /> : <Login />}
          />
          <Route
            path="/register"
            element={user ? <Navigate replace to="/" /> : <Register />}
          />
          <Route
            path="/mypage"
            element={user ? <UserPage /> : <Navigate replace to="/login" />}
          />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route
            path="/placeorder"
            element={user ? <Order /> : <Navigate replace to="/login" />}
          />
          <Route
            path="/order/:id"
            element={user ? <OrderDetail /> : <Navigate replace to="/login" />}
          />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
