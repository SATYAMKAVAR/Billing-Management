import { Link, useLocation } from "react-router-dom";

const Header = () => {
  // const { id } = useParams();
  const location = useLocation();
  const { id } = location.state;

  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to={"/Dashboard"} state={{ id: id }}>
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
          <Link to={"/Dashboard"} state={{ id: id }}>
            <li className="hidden sm:inline text-slate-800 hover:underline">
              Home
            </li>
          </Link>
          <Link to={"/CreateNewBill"} state={{ id: id }}>
            <li className="hidden sm:inline text-slate-800 hover:underline">
              Create New Bill
            </li>
          </Link>
          <Link to={"/AllCategories"} state={{ id: id }}>
            <li className="hidden sm:inline text-slate-800 hover:underline">
              All categories
            </li>
          </Link>
          <Link to={"/AllBills"} state={{ id: id }}>
            <li className="hidden sm:inline text-slate-800 hover:underline">
              All Bill
            </li>
          </Link>
          <Link to={"/profile"} state={{ id: id }}>
            <img
              className="rounded-full h-7 w-7 object-cover"
              src="https://logodix.com/logo/1984127.png"
              alt="Profile"
            />
          </Link>
        </ul>
      </div>
    </header>
  );
};

export default Header;
