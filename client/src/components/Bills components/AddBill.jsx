import { useEffect, useState } from "react";
import Header from "../Header";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { MdAddBox } from "react-icons/md";

const AddBill = () => {
  const [FormData, setFormData] = useState({});
  const [categories, setcategories] = useState([]);
  const [categoriesData, setcategoriesData] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  // const { id } = useParams();
  const location = useLocation();
  const { id } = location.state;
  useEffect(() => {
    fetch("/api/user/getCategories/" + id)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setcategories(res);
      });
  }, []);

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0");
  var yyyy = today.getFullYear();
  today = yyyy + "-" + mm + "-" + dd;

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    toast.loading.remove();
  };

  const handleCategoriesChange = (e) => {
    setcategoriesData(e.target.value);
  };

  const handleAddCategory = async () => {
    try {
      const notifiyloading = toast.loading("Loading...");
      if (categoriesData == "") {
        notifyWarning("Please enter a categorie", notifiyloading);
        return;
      }

      const res = await fetch("/api/user/addCategories/" + id, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ categories: [categoriesData, ...categories] }),
      });
      const data = await res.json();
      if (data.success === false) {
        toast.error(data.message, {
          id: notifiyloading,
          style: { backgroundColor: "red", color: "white" },
        });
        return;
      }

      fetch("/api/user/getCategories/" + id)
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          setcategories(res);
        })
        .catch((err) => {
          toast.error(data.message, {
            id: notifiyloading,
            style: { backgroundColor: "red", color: "white" },
          });
          return;
        });
      toast.success("category added successfully", { id: notifiyloading });
      closeModal();
    } catch (error) {
      toast.error(error.message, {
        id: notifiyloading,
        style: { backgroundColor: "red", color: "white" },
      });
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...FormData,
      [e.target.id]: e.target.value,
    });
  };

  const notifyWarning = (message, notifiyloading) => {
    toast(message, {
      id: notifiyloading,
      duration: 4000,
      position: "top-center",
      style: {
        backgroundColor: "yellow",
      },
      icon: "⚠️",
    });
  };

  const handlesubmit = async (e) => {
    try {
      e.preventDefault();
      const notifiyloading = toast.loading("Loading...");
      if (FormData.categories == null) {
        notifyWarning("Please enter a categories", notifiyloading);
        return;
      }

      const res = await fetch("/api/user/addBills/" + id, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(FormData),
      });
      const data = await res.json();
      if (data.success === false) {
        toast.error(data.message, {
          id: notifiyloading,
          style: { backgroundColor: "red", color: "white" },
        });
        return;
      }
      toast.success("Bill added successfully", { id: notifiyloading });
      navigate("/AllBills", { state: { id: id } });
    } catch (error) {
      toast.error(error.message, {
        id: notifiyloading,
        style: { backgroundColor: "red", color: "white" },
      });
    }
  };
  return (
    <>
      <Header />
      <div className="p-3 pt-32 max-w-5xl mx-auto">
        <div className="p-8 mt-6 lg:mt-0 rounded shadow bg-slate-200">
          <form onSubmit={handlesubmit}>
            {/* Categories */}
            <div className="md:flex mb-6">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4"
                  htmlFor="categories"
                >
                  Categories
                  <span className="required bold" style={{ color: "red" }}>
                    {" "}
                    *
                  </span>
                </label>
              </div>
              <div className="md:w-2/3 flex">
                <select
                  name=""
                  className="htmlForm-select border rounded-lg p-3 block w-full focus:bg-white"
                  id="categories"
                  onChange={handleChange}
                  required
                  placeholder="Choose a Categories"
                >
                  <option placeholder="Choose a Categories">
                    Choose a Categories
                  </option>
                  {categories.map((c) => {
                    return (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    );
                  })}
                </select>
                <button
                  className="ml-2 font-bold rounded"
                  type="button"
                  onClick={openModal}
                >
                  <MdAddBox size={"40"} />
                </button>
              </div>
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
                        Add your Categorie
                      </h3>
                      <div className="mt-2">
                        <input
                          className="htmlForm-input border p-3 rounded-lg block w-full focus:bg-white"
                          id="categorie"
                          placeholder="categorie"
                          type="text"
                          onChange={handleCategoriesChange}
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
                        onClick={handleAddCategory}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* description */}
            <div className="md:flex mb-6">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4"
                  htmlFor="description"
                >
                  Description
                  <span class="required bold" style={{ color: "red" }}>
                    {" "}
                    *
                  </span>
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="htmlForm-input border p-3 rounded-lg block w-full focus:bg-white"
                  id="description"
                  placeholder="description"
                  type="text"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Amount */}
            <div className="md:flex mb-6">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4"
                  htmlFor="amount"
                >
                  Amount
                  <span class="required bold" style={{ color: "red" }}>
                    {" "}
                    *
                  </span>
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="htmlForm-input border p-3 rounded-lg block w-full focus:bg-white"
                  id="amount"
                  placeholder="Amount"
                  type="Number"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Date */}
            <div className="md:flex mb-6">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4"
                  htmlFor="date"
                >
                  Date
                  <span class="required bold" style={{ color: "red" }}>
                    {" "}
                    *
                  </span>
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="htmlForm-input border p-3 rounded-lg block w-full focus:bg-white"
                  id="date"
                  type="Date"
                  defaultValue={today}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* <div className="md:flex mb-6">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4"
                  htmlFor="my-textarea"
                >
                  Text Area
                </label>
              </div>
              <div className="md:w-2/3">
                <textarea
                  className="htmlForm-textarea block w-full focus:bg-white"
                  id="my-textarea"
                  value=""
                  rows="6"
                ></textarea>
                <p className="py-2 text-sm text-gray-600">
                  add notes about populating the field
                </p>
              </div>
            </div> */}

            {/* buttons */}
            <div className="md:flex md:items-center">
              <div className="md:w-1/3"></div>
              <div className="md:w-2/3 flex justify-between">
                <button
                  className="shadow bg-slate-700 hover:bg-slate-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded "
                  type="submit"
                >
                  Save
                </button>
                <button
                  className="shadow bg-slate-700 hover:bg-slate-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                  onClick={() => {
                    navigate("/Dashboard", { state: { id: id } });
                  }}
                >
                  Discard
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddBill;
