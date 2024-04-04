import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import ParticlesBackground from "../components/particlesbackground";

const SignUp = () => {
  const [formData, setFormData] = useState({
    otp: "",
    forSignup: true,
  });
  const [showOTP, setShowOTP] = useState(false);
  const [OTP, setOTP] = useState(0);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSendOTP = async () => {
    try {
      var notifiyloading = toast.loading("Loading...");
      const res = await fetch("/api/auth/sendOTP", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        toast.error(data.message, {
          id: notifiyloading,
          style: { background: "red", color: "white" },
        });
        setShowOTP(false);
        return;
      }
      setOTP(data.otp);
      toast.success("otp send successfully", { id: notifiyloading });
      setShowOTP(true);
    } catch (error) {
      toast.error(error.message, {
        id: notifiyloading,
        style: { background: "red", color: "white" },
      });
    }
  };

  const handlesubmit = async (e) => {
    try {
      e.preventDefault();
      const notifiyloading = toast.loading("Loading...");
      if (formData.otp != OTP) {
        toast.error("Ivaild otp", {
          id: notifiyloading,
          duration: 4000,
          style: { background: "red", color: "white" },
        });
        return;
      }
      const res = await fetch("/api/auth/signup", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        toast.error(data.message, {
          id: notifiyloading,
          style: {
            backgroundColor: "red",
            color: "white",
          },
        });
        return;
      }
      toast.success("your account has been generated now you can sign in", {
        id: notifiyloading,
        duration: 4000,
      });
      navigate("/");
    } catch (error) {
      toast.error(error, {
        id: notifiyloading,
        style: {
          backgroundColor: "red",
          color: "white",
        },
      });
    }
  };

  return (
    <div>
      <div style={{ position: "relative", zIndex: -1 }}>
        <ParticlesBackground />
      </div>
      <div className="max-w-lg mx-auto bg-slate-500 rounded mt-44 p-8">
        <h1 className="text-3xl text-center font-semibold mb-7 font-mono">
          Sign Up
        </h1>
        <form onSubmit={handlesubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="username"
            id="username"
            className="border bg-slate-200 p-3 rounded-lg"
            onChange={handleChange}
            required
          />
          <input
            type="email"
            placeholder="email"
            id="email"
            className="border bg-slate-200 p-3 rounded-lg"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            placeholder="password"
            id="password"
            className="border bg-slate-200 p-3 rounded-lg"
            onChange={handleChange}
            required
          />
          {showOTP && (
            <>
              <span className="text-xl">
                We send you OTP on your {formData.email}
              </span>
              <input
                type="text"
                placeholder="otp"
                id="otp"
                className="border bg-slate-200 p-3 rounded-lg"
                onChange={handleChange}
                required
              />
            </>
          )}
          {showOTP ? (
            <button
              onClick={handlesubmit}
              className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95"
            >
              Sign Up
            </button>
          ) : (
            <div
              onClick={handleSendOTP}
              className="bg-slate-700 text-center text-white p-3 rounded-lg uppercase hover:opacity-95  hover:cursor-pointer"
            >
              Submit
            </div>
          )}
        </form>
        <div className="flex gap-2 mt-5">
          <p>Have an account?</p>
          <Link to={"/"}>
            <span className="text-white font-mono">Sign in</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
