import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const Signin = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoding] = useState(false);
  // const { id } = useParams();
  
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const notifyWarning = (message) => {
    toast(message, {
      duration: 4000,
      position: "bottom-center",

      // Styling
      style: {
        backgroundColor: "yellow",
        marginBottom: "50px"
      },
      className: "",

      // Custom Icon
      icon: "⚠️",

      // Change colors of success/error/loading icon
      iconTheme: {
        primary: "#000",
        secondary: "yellow",
      },

      // Aria
      ariaProps: {
        role: "status",
        "aria-live": "polite",
      },
    });
  };

  const notifyError = (message) => {
    toast(message, {
      duration: 4000,
      position: "bottom-center",

      // Styling
      style: {
        backgroundColor: "red",
        marginBottom: "50px",
        color: "white",
      },
      className: "",

      // Custom Icon
      icon: "⚠️",

      // Change colors of success/error/loading icon
      iconTheme: {
        primary: "white",
        secondary: "white",
      },

      // Aria
      ariaProps: {
        role: "status",
        "aria-live": "polite",
      },
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoding(true);
      const res = await fetch("/api/auth/signin", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setLoding(false);
        setError(data.message);
        notifyError(data.message);
        return ;
      }
      localStorage.setItem("userToken", "true");
      setLoding(false);
      setError(null);
      navigate("/Dashboard",{state: {id: data._id}});
    } catch (error) {
      setLoding(false);
      setError(error.message);
      notifyError(error.message);
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="email"
          id="email"
          className="border p-3 rounded-lg"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          className="border p-3 rounded-lg"
          onChange={handleChange}
          required
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95  disabled:opacity-80"
        >
          {loading ? "Loading..." : "Sign In"}
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Dont have an account?</p>
        <Link to={"/sign-up"}>
          <span className="text-blue-700">Sign up</span>
        </Link>
      </div>
      <Toaster />
    </div>
  );
};

export default Signin;
