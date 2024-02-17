import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { ToastContainer } from "react-toastify";

const Signin = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoding] = useState(false);
  // const { id } = useParams();
  const notify = () => toast.success("Here is your toast.");

  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
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
        toast.error(data.message, {
          // Auto dismiss after 4 seconds
          duration: 4000,
          // Styling
  
          style: {
            color: "white",
            backgroundColor:"red"
          },
          className: "",
  
          // Custom Icon
          icon: "",
  
          // Change colors of success/error/loading icon
          iconTheme: {
            primary: "#000",
            secondary: "#fff",
          },
  
          // Aria
          role: "status",
          ariaLive: "polite",
        });
        return;
      }
      toast.success("Signed in successfully", {
        // Auto dismiss after 4 seconds
        duration: 4000,
        // Styling

        style: {
          color: "white",
        },
        className: "",

        // Custom Icon
        // icon: "👏",

        // Change colors of success/error/loading icon
        iconTheme: {
          primary: "#000",
          secondary: "#fff",
        },

        // Aria
        role: "status",
        ariaLive: "polite",
      });
      localStorage.setItem("userToken", "true");
      setLoding(false);
      setError(null);
      setTimeout(() => {
        navigate("/Dashboard/" + data._id);
      }, 1000);
    } catch (error) {
      setLoding(false);
      setError(error.message);
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
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95  disabled:opacity-80"
        >
          {loading ? "Loading..." : "Sign In"}
        </button>
      </form>
      <Toaster
        toastOptions={{
          className: "",
          // style: {
          //   border: "1px solid #713200",
          //   padding: "16px",
          //   backgroundColor: "green",
          // },
          success: {
            style: {
              background: 'green',
            },
          },
          error: {
            style: {
              background: 'red',
            },
          },
        }}
      />
      <div className="flex gap-2 mt-5">
        <p>Dont have an account?</p>
        <Link to={"/sign-up"}>
          <span className="text-blue-700">Sign up</span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  );
};

export default Signin;
