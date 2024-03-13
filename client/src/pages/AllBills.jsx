import { useEffect, useState } from "react";
import { FcAlphabeticalSortingAz, FcNumericalSorting12 } from "react-icons/fc";

import Header from "../components/Header";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { MdDeleteForever, MdEditSquare } from "react-icons/md";

const AllBills = () => {
  const [data, setData] = useState({ bills: [] });
  const [categories, setcategories] = useState([]);
  const [formData, setFormData] = useState({});
  const [sortAmount, setSortAmount] = useState(true);
  const [sortDate, setSortDate] = useState(true);
  const [sortDescription, setSortDescription] = useState(true);
  // const { id } = useParams();
  const location = useLocation();
  const { id } = location.state;
  const navigate = useNavigate();
  useEffect(() => {
    fetch("/api/user/bills/" + id)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setData(res);
      });
    fetch("/api/user/getCategories/" + id)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setcategories(res);
      });
  }, []);

  const handleChange = (e) => {
    setFormData({ categories: e.target.value });
  };

  const handleSortingDescription = () => {
    setSortDescription(!sortDescription);
    setSortAmount(true);
    setSortDate(true);
    console.log(data.bills.slice());
    if (sortDescription === true) {
      setData((prevData) => ({
        ...prevData,
        bills: prevData.bills.slice().sort((a, b) => {
          return a.description.localeCompare(b.description);
        }),
      }));
    } else {
      fetch("/api/user/bills/" + id)
        .then((res) => res.json())
        .then((res) => {
          setData(res);
        });
      }
    };
    
    const handleSortingAmount = () => {
    setSortAmount(!sortAmount);
    setSortDescription(true);
    setSortDate(true);
    if (sortAmount === true) {
      setData((prevData) => ({
        ...prevData,
        bills: prevData.bills.sort((a, b) => a.amount - b.amount),
      }));
    } else {
      // setData((prevData) => ({
      //   ...prevData,
      //   bills: prevData.bills.sort((a, b) => b.amount - a.amount),
      // }));
      fetch("/api/user/bills/" + id)
        .then((res) => res.json())
        .then((res) => {
          setData(res);
        });
    }
  };

  const handleSortingDate = () => {

    setSortDate(!sortDate);
    setSortDescription(true);
    setSortAmount(true);
    if (sortDate === true) {
      setData((prevData) => ({
        ...prevData,
        bills: prevData.bills
          .slice()
          .sort((a, b) => new Date(a.date) - new Date(b.date)),
      }));
    } else {
      fetch("/api/user/bills/" + id)
        .then((res) => res.json())
        .then((res) => {
          setData(res);
        });
    }
  };

  const handleDelete = async (index) => {
    alert("em na thai baka delete");
    fetch("/api/user/deleteBill/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ index: index }),
    });
    setData((prevData) => ({
      ...prevData,
      bills: prevData.bills.filter((bill, i) => i !== index),
    }));
  };

  const formatedData = data.bills.map((d, index) => {
    if (formData.categories === undefined) {
    } else {
      if (formData.categories === "All Categories") {
      } else {
        if (d.categories != formData.categories) {
          return;
        }
      }
    }

    return (
      <tr
        key={index}
        className="border-b hover:bg-slate-300 hover:text-slate-700 bg-gray-100"
      >
        <td className="p-3 px-5">{d.categories}</td>
        <td className="p-3 px-5">{d.description}</td>
        <td className="p-3 px-5">{d.amount}</td>
        <td className="p-3 px-5">{d.date}</td>
        <td className="p-3 px-5">
          <button
            type="button"
            className="mr-3 text-sm  py-1 px-2 rounded focus:outline-none focus:shadow-outline"
            // bg-slate-500 hover:bg-slate-800 text-white
            onClick={() => {
              navigate("/UpdateBill/" + index, { state: { id: id } });
            }}
          >
            {/* Edit */}
            <MdEditSquare size={"30px"} />
          </button>
          <button
            type="button"
            // bg-red-500 hover:bg-red-700 text-white
            className="text-sm  py-1 px-2 rounded focus:outline-none focus:shadow-outline"
            onClick={() => {
              handleDelete(index);
            }}
          >
            {/* Delete */}
            <MdDeleteForever size={"30px"} />
          </button>
        </td>
      </tr>
    );
  });

  return (
    <>
      <Header />
      <div className="text-gray-900 ">
        <div className="p-5 flex justify-center ">
          <h1 className="text-5xl font-mono">All Bills</h1>
        </div>
        <div className="px-3 py-4 flex justify-center">
          <table className="w-full text-md bg-white shadow-md rounded mb-4">
            <tbody>
              <tr className="border-b">
                <th className="text-left p-3 px-5">
                  <select
                    name=""
                    className="htmlForm-select border rounded-lg p-3 block w-full focus:bg-white"
                    id="categories"
                    onChange={handleChange}
                  >
                    <option defaultValue="All Categories">
                      All Categories
                    </option>
                    {categories.map((c) => {
                      return (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      );
                    })}
                  </select>
                </th>
                <th
                  className="text-left p-3 px-5 hover:cursor-pointer"
                  onClick={handleSortingDescription}
                >
                  <div className="flex items-center">
                    <div>Description</div>
                    {!sortDescription && (
                      <div className="ps-3">
                        <FcAlphabeticalSortingAz size={"20"}/>
                      </div>
                    )}
                  </div>
                </th>
                <th
                  className="text-left p-3 px-5 hover:cursor-pointer"
                  onClick={handleSortingAmount}
                >
                  <div className="flex items-center">
                    <div>Amount</div>
                    {!sortAmount && (
                      <div className="ps-3">
                        <FcNumericalSorting12 size={"20"}/>
                      </div>
                    )}
                  </div>
                </th>
                <th
                  className="text-left p-3 px-5 hover:cursor-pointer"
                  onClick={handleSortingDate}
                >
                  date
                </th>
                <th className="text-left p-3 px-5">Action</th>
                <th></th>
              </tr>
              {formatedData == "" ? (
                <tr>
                  <td colSpan="5">
                    <h1 className="flex justify-center p-4 bg-slate-300 text-3xl">
                      No data
                    </h1>
                  </td>
                </tr>
              ) : (
                formatedData
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AllBills;
