import { NavLink, Outlet, useNavigate } from 'react-router'
import { MdDirectionsBike, MdMenu } from "react-icons/md";
import "./Dashboard.css";

import { Bike, CreditCard, House, } from 'lucide-react';
// import useRole from '../Hooks/useRole';
import { FaBoxOpen, FaHome, FaUserCog, FaUserMd, FaWpforms } from 'react-icons/fa';
import { CiCreditCard1, CiSettings } from 'react-icons/ci';
import { RiEBikeFill, RiUserVoiceLine } from "react-icons/ri";
import { SiTask } from "react-icons/si";
import { SiReacthookform } from "react-icons/si";
import { IoIosAddCircleOutline } from 'react-icons/io';
import { FaHouseFlag, FaUsersGear } from 'react-icons/fa6';
import useRole from '../Hooks/useRole';
import useAuth from '../Hooks/useAuth';
import Dashboard from './../Pages/DashBoard/Dashboard';



const DashboardLayout = () => {
  const { role } = useRole();
  const { user } = useAuth()
  const naviget= useNavigate()

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar flex justify-between w-full bg-base-300">
          {/* Sidebar toggle icon */}
          <div className='flex items-center justify-between'>


            {/* <Logo1></Logo1> */}
          </div>
          <div className="px-4">

            <div className="navbar-end gap-2 ">
              {/* <NavLink to='/rider' className='btn rounded-lg bg-[#caeb66]'>Be A Rider</NavLink> */}
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
                      <li className="font-semibold nav-btn text-gray-700 px-3 py-2">
                        {user.displayName || "User"}
                      </li>
                      <li className='nav-btn'><NavLink to="/dashboard">Dashboard</NavLink></li>
                      <li className='nav-btn'><NavLink to="/user-profile">Profile</NavLink></li>

                      <li className='nav-btn'>
                        <button
                          //  onClick={handelLogOut} 
                          className="text-red-500">
                          Log Out
                        </button>
                      </li>
                    </ul>
                  </div>
                ) : (
                  <NavLink to="/login" className="btn rounded-lg bg-green-500 text-white hover:bg-green-600">
                    Log In
                  </NavLink>
                )
              }



            </div>


          </div>
        </nav>
        {/* Page content here */}
        <Outlet></Outlet>
        <div className="p-4">


        </div>
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
        <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
          {/* Sidebar content here */}
          <ul className="menu w-full grow">

            <li   >
            
                <label htmlFor="my-drawer-4" aria-label="open sidebar" >
              <div 
              
              className="is-drawer-close:tooltip flex justify-between items-center is-drawer-close:tooltip-right" data-tip="Dashboard">
                
                  <MdMenu />


            
                <span className="is-drawer-close:hidden">Dashboard</span>
              </div>
                  </label>
             
              

            </li>



            <li>
              <NavLink to='/' className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Homepage">
                {/* Home icon */}
                <FaHome />
                <span className="is-drawer-close:hidden">Homepage</span>
              </NavLink>
            </li>


            


            {/* citizen only route*/}
            {
              role === 'citizen' &&
              <>

                <li>
                  <NavLink to='/dashboard/payment-history' className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Payment History">
                    {/* Home icon */}
                    <CiCreditCard1 />
                    <span className="is-drawer-close:hidden">Payment History</span>
                  </NavLink>
                </li>

                {/* List item */}

                {/* Mypercel */}
                <li>
                  <NavLink to='/dashboard/user-issue' className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="My Issue">
                    {/* Settings icon */}
                    <SiReacthookform />
                    <span className="is-drawer-close:hidden">

                      My Issue</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to='/submit-issue' className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Report Issue">
                    {/* Settings icon */}
                    <IoIosAddCircleOutline />
                    <span className="is-drawer-close:hidden">

                      Report Issue</span>
                  </NavLink>
                </li>
              </>
            }





            {/* 
            <li>
              <NavLink to='/dashboard' className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Apply For Staff">

                <RiUserVoiceLine />
                <span className="is-drawer-close:hidden">

                  Apply For Staff</span>
              </NavLink>
            </li> */}
            {
              role === 'Field Staff' &&
              <>
                <li>
                  <NavLink to='/dashboard/staff-accept-issue' className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Assign Issue">
                    {/* Settings icon */}
                    <FaWpforms />
                    <span className="is-drawer-close:hidden">

                      Assign Issue</span>
                  </NavLink>
                </li>
              </>
            }



            {/* admin only route */}


            {
              role === 'admin' &&
              <>
                <li>
                  <NavLink to='/dashboard/manage-user' className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Manage users">
                    {/* Settings icon */}
                    <FaUserCog />
                    <span className="is-drawer-close:hidden">

                      Manage users</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to='/dashboard/all-payments-info' className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Payments Info">
                    {/* Settings icon */}
                    <CiCreditCard1 />
                    <span className="is-drawer-close:hidden">

                      Payments Info</span>
                  </NavLink>
                </li>
            
                <li>
                  <NavLink to='/dashboard/admin-all-manage-staff' className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Manage Staff">
                    {/* Settings icon */}
                    <FaUsersGear />
                    <span className="is-drawer-close:hidden">

                      Manage Staff</span>
                  </NavLink>
                </li>
              </>
            }

          </ul>
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout
