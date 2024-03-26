import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handlesubmit = async (e) => {
    try {
      e.preventDefault();
      const notifiyloading = toast.loading("Loading...");
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
      toast.success("your id has been generated now you can sign in", {
        id: notifiyloading,
        duration: 4000,
      });
      navigate("/sign-in");
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
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
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
        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95  disabled:opacity-80">
          Sign Up
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to={"/sign-in"}>
          <span className="text-blue-700">Sign in</span>
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
