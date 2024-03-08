import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoding] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  
  const notifyWarning = (message) => {
    toast(message, {
      duration: 2000,
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

  const handlesubmit = async (e) => {
    try {
      e.preventDefault();
      setLoding(true);
      const res = await fetch("/api/auth/signup", {
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
        return;
      }
      setLoding(false);
      setError(null);
      // alert("Your id has been generated now you can sign in");
      // notifyWarning("your id has been generated now you can sign in");
      toast("your id has been generated now you can sign in", {
          duration: 3000,
          position: "bottom-center",
    
          // Styling
          style: {
            backgroundColor: "#50BF5F",
            marginBottom: "50px",
            color: "white",
          },
          className: "",
    
          // Custom Icon
          icon: "🎉",
    
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
      setTimeout(() => {
        navigate("/sign-in");
      }, 3000);
    } catch (error) {
      setLoding(false);
      setError(error.message);
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
          className="border p-3 rounded-lg"
          onChange={handleChange}
          required
        />
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
          {loading ? "Loading..." : "Sign Up"}
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to={"/sign-in"}>
          <span className="text-blue-700">Sign in</span>
        </Link>
      </div>
      {/* {error && <p className="text-red-500 mt-5">{error}</p>} */}
      <Toaster />
    </div>
  );
};

export default SignUp;
