import { useEffect, useState } from "react";
import Header from "../components/Header";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const Profile = () => {
  const [data, setData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoding] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  // const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const {id} = location.state;
  useEffect(() => {
    // const res = await fetch("/api/user/"+id);
    // setData(res.json());
    fetch("/api/user/" + id)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setData(res);
      });
  }, []);
  
  const handleChange = (e) => {
    setData({ ...data, [e.target.id]: e.target.value });
  };

  const handleSignOut = () => {
    localStorage.removeItem("userToken");
    navigate("/");
  };

  const notifyWarning = (message) => {
    toast(message, {
      duration: 4000,
      position: "top-center",

      // Styling
      style: {
        backgroundColor: "yellow",
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
      position: "top-center",

      // Styling
      style: {
        backgroundColor: "red",
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

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoding(true);
      const res = await fetch(`/api/user/update/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const resData = await res.json();
      if (resData.success === false) {
        setLoding(false);
        setError(resData.message);
        notifyError(resData.message);
        return;
      }
      setLoding(false);
      setError(null);
      toast("User is updated successfully!", {
        duration: 4000,
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
    } catch (error) {
      setLoding(false);
      setError(error.message);
      notifyError(error.message);
    }
  };

  const handleDeleteUser = async () => {
    try {
      // const res = await fetch(`/api/user/delete/${data._id}`, {
      //   method: "DELETE",
      // });
      const res = await fetch(`/api/user/update/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isActive: false }),
      });
      const resData = await res.json();
      if (resData.success === false) {
        setError(resData.message);
        notifyError(resData.message);
        return;
      }
      toast("User is Deactivate successfully!", {
        duration: 2500,
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
      setError(null);
      setInterval(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      setError(error.message);
      notifyError(error.message);
    }
  };
  return (
    <>
      <Header />
      <div className="p-3 max-w-lg mx-auto">
        <h1 className="text-3xl text-center font-semibold my-7">Profile</h1>
        <form onSubmit={handleSubmit} className="flex gap-4 flex-col">
          {/* <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
        /> */}
          {/* <img
          onClick={() => fileRef.current.click()}
          src={formData.avatar || currentUser.avatar}
          alt="profile"
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
        /> */}
          {/* <p className="text-sm self-center">
          {fileUploadError ? (
            <span className="text-red-700">
              Error Image upload (image must be less than 2 mb)
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className="text-slate-700">{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className="text-green-700">Image successfully uploaded!</span>
            ) : (
            ""
          )}
        </p> */}
          <input
            type="text"
            placeholder="username"
            id="username"
            className="border p-3 rounded-lg"
            defaultValue={data.username}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            placeholder="email"
            id="email"
            className="border p-3 rounded-lg"
            defaultValue={data.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            placeholder="password"
            id="password"
            className="border p-3 rounded-lg"
            defaultValue={data.password}
            onChange={handleChange}
            required
          />
          <button className="bg-green-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80">
            update
          </button>
        </form>
        <div className="flex justify-between mt-5">
          <span
            onClick={handleDeleteUser}
            className="text-red-700 cursor-pointer"
          >
            Deactivate account
          </span>
          {/* <span
            onClick={handleDeleteUser}
            className="text-red-700 cursor-pointer"
          >
            Delete account
          </span> */}
          <span className="text-red-700 cursor-pointer" onClick={handleSignOut}>
            Sign out
          </span>
        </div>
        <p className="text-red-700 mt-5">{error ? error : ""}</p>
        <p className="text-green-700 mt-5"></p>
      </div>
      <Toaster />
    </>
  );
};

export default Profile;
