// src/App.js

import React from "react";
import { Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import UploadProduct from "./components/UploadProduct";
import Header from "./components/Header";
import Home from "./components/Home";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Cart from "./components/Cart"
import ProductDetails from "./components/ProductDetails";

const App = () => {
    return (
        <div>
            <ToastContainer position="bottom-right" />
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Home />} />
            <Route path="/addproduct" element={<UploadProduct />} />
            <Route path="/cart" element={<><Header/> <Cart/></>} />
            <Route path="/product/:productId" element={ <ProductDetails/>} />
        </Routes>
        </div>

    );
};

export default App;
