import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";
import "./Navbar.css";
import Logo from "../Shared/Logo";
import Logo1 from "../Shared/Logo1";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const handelLogOut = () => {
    logOut()
      .then((result) => {
        toast.success("You Are SuccessFully Log Out");
      })
      .catch((err) => {});
  };

    const [theme, setTheme] = useState("light");


  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  // toggle function
const handleToggle = (e) => {
  const newTheme = e.target.checked ? "dark" : "light";
  setTheme(newTheme);
  // Important: apply to documentElement
  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
};

  return (
    <div>
      <div className="navbar bg-base-100 z-50 shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                {" "}
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                {" "}
                <NavLink to="/about">About</NavLink>
              </li>

              <li>
                {" "}
                <NavLink to="/all-issue">All Issue</NavLink>
              </li>
              <li>
                {" "}
                <NavLink to="/contact">Contact</NavLink>
              </li>
            </ul>
          </div>

          <Link to="/">
            <button className=" text-xl hidden lg:flex">
              <Logo1></Logo1>
            </button>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu gap-2   text-gray-400 menu-horizontal px-1">
            <li className="nav-btn">
              {" "}
              <NavLink to="/">Home</NavLink>
            </li>
            <li className="nav-btn">
              {" "}
              <NavLink to="/about">About</NavLink>
            </li>

            <li className="nav-btn">
              {" "}
              <NavLink to="/all-issue">All Issue</NavLink>
            </li>
            <li className="nav-btn">
              {" "}
              <NavLink to="/contact">Contact</NavLink>
            </li>
          </ul>
        </div>
        <div className="navbar-end gap-2 ">
          {
             <label className="swap swap-rotate">
      {/* checkbox */}
      <input
        type="checkbox"
        onChange={handleToggle}
        checked={theme === "dark"}
      />

      {/* sun icon (light) */}
      <svg
        className="swap-on h-10 w-10 fill-current"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM12,6.5A5.5,5.5,0,1,0,17.5,12A5.51,5.51,0,0,0,12,6.5Z" />
      </svg>

      {/* moon icon (dark) */}
      <svg
        className="swap-off h-10 w-10 fill-current"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36A10.14,10.14,0,1,0,22,14.05A1,1,0,0,0,21.64,13Z" />
      </svg>
    </label>
          }
          {user ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img
                    src={user.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                    alt="User"
                  />
                </div>
              </label>

              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 p-3 shadow rounded-xl w-52"
              >
                <li className="font-semibold nav-btn text-gray-700 px-3 py-2">
                  {user.displayName || "User"}
                </li>
                <li className="nav-btn">
                  <Link to="/dashboard">Dashboard</Link>
                </li>
                <li className="nav-btn">
                  <Link to="/user-profile">Profile</Link>
                </li>

                <li className="nav-btn">
                  <button onClick={handelLogOut} className="text-red-500">
                    Log Out
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <Link
              to="/login"
              className="btn rounded-lg bg-green-500 text-white hover:bg-green-600"
            >
              Log In
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
