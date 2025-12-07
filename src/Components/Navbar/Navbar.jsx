import React from 'react';
import { Link, NavLink } from 'react-router';
import useAuth from '../../Hooks/useAuth';
import toast from 'react-hot-toast';
import "./Navbar.css";

const Navbar = () => {
    const { user, logOut } = useAuth()
    const handelLogOut = () => {
        logOut()
            .then(result => {
                toast.success("You Are SuccessFully Log Out")
            })
            .catch(err => {
                // console.log(err);
            })
    }

    return (
        <div>

            <div className="navbar bg-base-100 shadow-sm">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex="-1"
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            <li> <NavLink>Home</NavLink></li>
                            <li> <NavLink to='/'>Home</NavLink></li>
                            <li> <NavLink to='/submit-issue'>Submit Issue</NavLink></li>
                            <li> <NavLink to='/about'>About</NavLink></li>
                            <li> <NavLink to='/blog'>Blog</NavLink></li>
                            <li> <NavLink to='/all-issue'>All Issues</NavLink></li>
                            <li> <NavLink to='/contact'>Contact</NavLink></li>




                        </ul>
                    </div>
                    <Link to='/'><button className=" text-xl">Hello</button></Link>
                    {/* <Link to='/'><button className=" text-xl"><Logo></Logo></button></Link> */}
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu gap-2  text-gray-400 menu-horizontal px-1">
                        <li> <NavLink to='/'>Home</NavLink></li>
                        <li> <NavLink to='/submit-issue'>Submit Issue</NavLink></li>
                        <li> <NavLink to='/about'>About</NavLink></li>
                        <li> <NavLink to='/blog'>Blog</NavLink></li>
                        <li> <NavLink to='/all-issue'>All Issues</NavLink></li>
                        <li> <NavLink to='/contact'>Contact</NavLink></li>


                    </ul>
                </div>
                <div className="navbar-end gap-2 ">
                    {/* <Link to='/rider' className='btn rounded-lg bg-[#caeb66]'>Be A Rider</Link> */}
                    {
                        user ? (
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
                                    <li className="font-semibold text-gray-700 px-3 py-2">
                                        {user.displayName || "User"}
                                    </li>
                                    <li><Link to="/dashboard">Dashboard</Link></li>
                                    <li><Link to="/user-profile">Profile</Link></li>

                                    <li>
                                        <button onClick={handelLogOut} className="text-red-500">
                                            Log Out
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        ) : (
                            <Link to="/login" className="btn rounded-lg bg-green-500 text-white hover:bg-green-600">
                                Log In
                            </Link>
                        )
                    }



                </div>
            </div>

        </div>
    );
};

export default Navbar;