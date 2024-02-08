import { Link, useParams } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useEffect, useState } from "react";

const Header = () => {
  const [issignedin, setIssignedin] = useState(false);
  const { id } = useParams();
  useEffect(() => {
    const userToken = localStorage.getItem('userToken');
    if (userToken) {
      setIssignedin(true);
    }
  }, [issignedin]);
  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-slate-600">Billing</span>
            <span className="text-slate-800">Management-System</span>
          </h1>
        </Link>
        {/* <form className="bg-slate-100 p-3 rounded-lg flex justify-center items-center">
          <input
            type="text"
            placeholder="search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64"
          />
          <FaSearch />
        </form> */}
        <ul className="flex gap-4">
          <Link to={"/Dashboard/"+id}>
            <li className="hidden sm:inline text-slate-800 hover:underline">
              Home
            </li>
          </Link>
          <Link to="/About">
            <li className="hidden sm:inline text-slate-800 hover:underline">
              About
            </li>
          </Link>
          {issignedin ? (
            <Link to={"/profile/"+id}>
              <img
                className="rounded-full h-7 w-7 object-cover"
                src="https://logodix.com/logo/1984127.png"
                alt="Profile"
              />
            </Link>
          ) : (
            <Link to="/sign-in">
              <li className="text-slate-800 hover:underline">Sign in</li>
            </Link>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Header;
