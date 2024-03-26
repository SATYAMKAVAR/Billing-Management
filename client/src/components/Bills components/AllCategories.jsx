import { useEffect, useState } from "react";
import Header from "../Header";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { BiEditAlt } from "react-icons/bi";
import { MdOutlineDeleteForever } from "react-icons/md";
import { CgAddR } from "react-icons/cg";

const AllCategory = () => {
  const [categories, setcategories] = useState([]);
  const [categoriesData, setcategoriesData] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [index, setIndex] = useState(Number);
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
  }, [categories]);

  const openAddModal = () => {
    setShowAddModal(true);
  };

  const closeAddModal = () => {
    setShowAddModal(false);
    toast.loading.remove();
  };

  const openEditModal = (index) => {
    setShowEditModal(true);
    setIndex(index);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    toast.loading.remove();
  };

  const handleChange = (e) => {
    setcategoriesData(e.target.value);
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

  const handleAdd = async () => {
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

      // fetch("/api/user/getCategories/" + id)
      //   .then((res) => {
      //     return res.json();
      //   })
      //   .then((res) => {
      //     setcategories(res);
      //   })
      //   .catch((err) => {
      //     toast.error(data.message, {
      //       id: notifiyloading,
      //       style: { backgroundColor: "red", color: "white" },
      //     });
      //     return;
      //   });
      toast.success("category added successfully", { id: notifiyloading });
      setcategoriesData("");
      closeAddModal();
    } catch (error) {
      toast.error(error.message, {
        id: notifiyloading,
        style: { backgroundColor: "red", color: "white" },
      });
    }
  };

  const handleUpdate = async (e) => {
    try {
      e.preventDefault();
      const notifiyloading = toast.loading("Loading...");
      if (categoriesData == "") {
        notifyWarning("Please enter a categories", notifiyloading);
        return;
      }

      const res = await fetch("/api/user/updateCategories/" + id, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ categories: categoriesData, index: index }),
      });
      const data = await res.json();
      if (data.success === false) {
        toast.error(data.message, {
          id: notifiyloading,
          style: { backgroundColor: "red", color: "white" },
        });
        return;
      }
      // fetch("/api/user/getCategories/" + id)
      //   .then((res) => {
      //     return res.json();
      //   })
      //   .then((res) => {
      //     setcategories(res);
      //   });
      toast.success("Category edited successfully", { id: notifiyloading });
      closeEditModal();
    } catch (error) {
      toast.error(error.message, {
        id: notifiyloading,
        style: { backgroundColor: "red", color: "white" },
      });
    }
  };

  const handleDelete = async (index) => {
    try {
      if (!confirm("Are you sure you want to delete ")) {
        return;
      }
      const notifiyloading = toast.loading("Loading...");
      const res = fetch("/api/user/deleteCategories/" + id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ index: index }),
      });
      if (res.success === false) {
        toast.error(data.message, {
          id: notifiyloading,
          style: { backgroundColor: "red", color: "white" },
        });
        return;
      }
      setcategories(categories.filter((bill, i) => i !== index));
      toast.success("Categorie deleted successfully", { id: notifiyloading });
    } catch (error) {
      toast.error(error.message, {
        id: notifiyloading,
        style: { backgroundColor: "red", color: "white" },
      });
    }
  };

  const formatedcategories = categories.map((c, index) => {
    return (
      <div key={index} className="p-2 max-w-xl mx-auto">
        <div className="flex justify-between rounded bg-slate-200 p-3 px-4">
          <div className="">{index + 1}</div>
          <div>{c}</div>
          <div className="flex gap-8">
            <button className="">
              <BiEditAlt
                size={25}
                color="green"
                onClick={() => {
                  openEditModal(index);
                }}
              />
            </button>
            <button className="">
              <MdOutlineDeleteForever
                color="red"
                size={25}
                onClick={() => {
                  handleDelete(index);
                }}
              />
            </button>
          </div>
        </div>
      </div>
    );
  });

  return (
    <>
      <Header />
      <div className="p-5 pt-10 flex justify-center gap-10">
        <h1 className="text-5xl font-mono">All Category</h1>
      </div>
      <div className="flex justify-center gap-5">
        {/* <span>Want to add new categorie then click here</span> */}
        <button>
          <CgAddR size={35} onClick={openAddModal} />
        </button>
      </div>
      {showAddModal && (
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
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="bg-slate-500 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-slate-400 text-base font-bold text-black hover:text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={closeAddModal}
                >
                  Close
                </button>
                <button
                  className="shadow bg-slate-400 hover:bg-slate-800 focus:shadow-outline focus:outline-none text-black hover:text-white font-bold py-2 px-4 rounded"
                  type="button"
                  onClick={handleAdd}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showEditModal && (
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
                  Edit your Categorie
                </h3>
                <div className="mt-2">
                  <input
                    className="htmlForm-input border p-3 rounded-lg block w-full focus:bg-white"
                    id="categorie"
                    placeholder="categorie"
                    type="text"
                    defaultValue={categories[index]}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="bg-slate-500 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-slate-400 text-base font-bold text-black hover:text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={closeEditModal}
                >
                  Close
                </button>
                <button
                  className="shadow bg-slate-400 hover:bg-slate-800 focus:shadow-outline focus:outline-none text-black hover:text-white font-bold py-2 px-4 rounded"
                  type="button"
                  onClick={handleUpdate}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {formatedcategories}
    </>
  );
};

export default AllCategory;
