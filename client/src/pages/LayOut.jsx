import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Header from "../components/Header";
import About from "./About";
import Home from "./Home";
import Profile from "./Profile";
import Signin from "./Signin";
import SignUp from "./Signup";

const LayOut = () => {
  return (
    // <>
    //   <Header />
    //   <Outlet />
    // </>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
};

export default LayOut;
