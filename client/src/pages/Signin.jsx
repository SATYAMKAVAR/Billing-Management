import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Signin = () => {
  const [formData, setFormData] = useState({});
  const [activeEmail, setActiveEmail] = useState({ toUser: "", otp: "" });
  const [showModal, setShowModal] = useState(false);
  const [OTP, setOTP] = useState(0);
  const [showOTP, setShowOTP] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSendOTP = async (e) => {
    try {
      e.preventDefault();
      const notifiyloading = toast.loading("Loading...");
      const res = await fetch("/api/auth/sendOTP", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(activeEmail),
      });
      const data = await res.json();
      if (data.success === false) {
        toast.error(data.message, {
          id: notifiyloading,
          style: { background: "red", color: "white" },
        });
        return;
      }
      setOTP(data.otp);
      setShowOTP(true);
      toast.success("otp send successfully", { id: notifiyloading });
    } catch (error) {
      toast.error(error.message, {
        id: notifiyloading,
        style: { background: "red", color: "white" },
      });
    }
  };

  const handleActiveEmail = async (e) => {
    try {
      e.preventDefault();
      const notifiyloading = toast.loading("Loading...");
      if (activeEmail.otp !== OTP) {
        toast.error("Ivaild otp", {
          id: notifiyloading,
          duration: 4000,
          style: { background: "red", color: "white" },
        });
        return;
      }
      const res = await fetch("/api/auth/activeEmail", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(activeEmail),
      });
      const data = await res.json();
      if (data.success === false) {
        toast.error(data.message, {
          id: notifiyloading,
          style: { background: "red", color: "white" },
        });
        return;
      }
      toast.success("your account has been activeted now you can sign in", {
        id: notifiyloading,
        duration: 5000,
      });
      closeModal();
      setActiveEmail({toUser:"",otp:""});
    } catch (error) {
      toast.error(error.message, {
        id: notifiyloading,
        style: { background: "red", color: "white" },
      });
    }
  };

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

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const notifiyloading = toast.loading("Loading...");
      const res = await fetch("/api/auth/signin", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }).catch((e) => {
        toast.error(e.message, {
          id: notifiyloading,
          style: { background: "red", color: "white" },
        });
        return;
      });
      const data = await res.json();
      if (data.success === false) {
        toast.error(data.message, {
          id: notifiyloading,
          style: { background: "red", color: "white" },
        });
        return;
      }
      toast.success("User successfully signed in", { id: notifiyloading });
      navigate("/Dashboard", { state: { id: data._id } });
    } catch (error) {
      toast.error(error.message, {
        id: notifiyloading,
        style: { background: "red", color: "white" },
      });
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
          Sign In
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
        <span
          className="text-blue-700 hover:cursor-pointer"
          onClick={openModal}
        >
          Activate
        </span>
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
                <span className="text-2xl">
                  {showOTP && `We send you OTP on your ${activeEmail.toUser}`}
                </span>
                <h3 className="text-lg font-medium leading-6 mt-4 text-gray-900">
                  {showOTP ? "Enter OTP" : "Enter your email"}
                </h3>
                <div className="mt-2">
                  {showOTP ? (
                    <input
                      className="htmlForm-input border p-3 rounded-lg block w-full focus:bg-white"
                      id="otp"
                      placeholder="otp"
                      type="text"
                      value={activeEmail.otp}
                      onChange={handleActiveChange}
                      required
                    />
                  ) : (
                    <input
                      className="htmlForm-input border p-3 rounded-lg block w-full focus:bg-white"
                      id="toUser"
                      placeholder="email"
                      type="email"
                      onChange={handleActiveChange}
                      required
                    />
                  )}
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
                {showOTP ? (
                  <button
                    className="shadow bg-slate-400 hover:bg-slate-800 focus:shadow-outline focus:outline-none text-black hover:text-white font-bold py-2 px-4 rounded"
                    type="button"
                    onClick={handleActiveEmail}
                  >
                    Active
                  </button>
                ) : (
                  <button
                    className="shadow bg-slate-400 hover:bg-slate-800 focus:shadow-outline focus:outline-none text-black hover:text-white font-bold py-2 px-4 rounded"
                    type="button"
                    onClick={handleSendOTP}
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Signin;
