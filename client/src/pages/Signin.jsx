import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const Signin = () => {
  const [formData, setFormData] = useState({});
  const [activeEmail, setActiveEmail] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoding] = useState(false);
  // const { id } = useParams();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleActiveEmail = async (e) => {
    try {
      e.preventDefault();
      setLoding(true);
      const res = await fetch("/api/auth/signin", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(activeEmail),
      });
      const data = await res.json();
      if (data.success === false) {
        setLoding(false);
        notifyError(data.message);
        return ;
      }
      setLoding(false);
      closeModal();
    } catch (error) {
      setLoding(false);
      notifyError(error.message);
    }
  }

  const handleActiveChange = (e) => { 
    setActiveEmail({
      ...activeEmail,
      [e.target.id]: e.target.value,
    });
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
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
        notifyError(data.message);
        return ;
      }
      localStorage.setItem("userToken", "true");
      setLoding(false);
      navigate("/Dashboard",{state: {id: data._id}});
    } catch (error) {
      setLoding(false);
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
        <p className="font-mono">Dont have an account?</p>
        <Link to={"/sign-up"}>
          <span className="text-blue-700">Sign up</span>
        </Link>
      </div>
      <div className="flex gap-2 mt-5">
        <p className="font-mono">Your account is deactivated?</p>
        {/* <Link to={"/sign-up"}> */}
          <span className="text-blue-700 hover:cursor-pointer" onClick={openModal}>Activate</span>
        {/* </Link> */}
      </div>
      {showModal && (
              <div className="fixed inset-0 z-10 overflow-y-auto">
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                  <div
                    className="fixed inset-0 transition-opacity"
                    aria-hidden="true"
                  >
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                  </div>
                  <span
                    className="hidden sm:inline-block sm:align-middle sm:h-screen"
                    aria-hidden="true"
                  >
                    &#8203;
                  </span>
                  <div className="inline-block align-bottom bg-slate-500 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div className=" px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                      <h3 className="text-lg font-medium leading-6 text-gray-900">
                        Enter your email
                      </h3>
                      <div className="mt-2">
                        <input
                          className="htmlForm-input border p-3 rounded-lg block w-full focus:bg-white"
                          id="email"
                          placeholder="email"
                          type="email"
                          onChange={handleActiveChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="bg-slate-500 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                      <button
                        type="button"
                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-slate-400 text-base font-bold text-black hover:text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 sm:ml-3 sm:w-auto sm:text-sm"
                        onClick={closeModal}
                      >
                        Close
                      </button>
                      <button
                        className="shadow bg-slate-400 hover:bg-slate-800 focus:shadow-outline focus:outline-none text-black hover:text-white font-bold py-2 px-4 rounded"
                        type="button"
                        onClick={handleActiveEmail}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
      <Toaster />
    </div>
  );
};

export default Signin;
