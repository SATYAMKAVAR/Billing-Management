import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Signin from "./pages/Signin";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import Dashboard from "./components/Dashboard";
import AllCategories from "./components/Bills components/AllCategories";
import UpdateBill from "./components/Bills components/UpdateBill";
import AllBills from "./components/Bills components/AllBills";
import AddBill from "./components/Bills components/AddBill";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Signin />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="sign-in" element={<Signin />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/CreateNewBill" element={<AddBill />} />
          <Route path="/AllBills" element={<AllBills />} />
          <Route path="/UpdateBill/:index" element={<UpdateBill />} />
          <Route path="/AllCategories" element={<AllCategories />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="bottom-center" containerStyle={{margin:"50px"}}/>
    </>
  );
}

export default App;
