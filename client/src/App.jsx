import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Profile from "./pages/Profile";
import About from "./pages/About";
import SignUp from "./pages/SignUp";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./components/Dashboard";
import AddBill from "./pages/AddBill";
import AllBills from "./pages/AllBills";
import UpdateBill from "./pages/UpdateBill";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Signin />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="sign-in" element={<Signin />} />
          <Route path="/About" element={<About />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/CreateNewBill" element={<AddBill />} />
          <Route path="/AllBill" element={<AllBills />} />
          <Route path="/UpdateBill/:index" element={<UpdateBill />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
