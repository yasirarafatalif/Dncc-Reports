import { Link, Outlet } from 'react-router'
// import Sidebar from '../components/Dashboard/Sidebar/Sidebar'
// import logo from '../assets/logo.png'
// import Logo from '../Comeponents/Shared/Logo'
import { MdDirectionsBike } from "react-icons/md";

import {  Bike, CreditCard, House,  } from 'lucide-react';
// import useRole from '../Hooks/useRole';
import { FaBoxOpen, FaUserMd } from 'react-icons/fa';
import { CiSettings } from 'react-icons/ci';
import { RiEBikeFill } from "react-icons/ri";
import { SiTask } from "react-icons/si";
import { SiReacthookform } from "react-icons/si";


const DashboardLayout = () => {
//   const { role } = useRole();

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar w-full bg-base-300">
          <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost">
            {/* Sidebar toggle icon */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path><path d="M9 4v16"></path><path d="M14 10l2 2l-2 2"></path></svg>
          </label>
          {/* <Logo></Logo> */}
          {/* <img src={logo} alt="" /> */}
          {/* <div className="px-4">

        
      </div> */}
        </nav>
        {/* Page content here */}
        <Outlet></Outlet>
        {/* <div className="p-4">Page Content</div> */}
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
        <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
          {/* Sidebar content here */}
          <ul className="menu w-full grow">
            {/* List item */}
            <li>
              <Link to='/' className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Homepage">
                {/* Home icon */}
                <House />
                <span className="is-drawer-close:hidden">Homepage</span>
              </Link>
            </li>
            <li>
              <Link to='/dashboard/payment-history' className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Payment History">
                {/* Home icon */}
                <CreditCard />
                <span className="is-drawer-close:hidden">Payment History</span>
              </Link>
            </li>

            {/* List item */}
            <li>
              <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Settings">
                {/* Settings icon */}
                <CiSettings />
                <span className="is-drawer-close:hidden">Settings</span>
              </button>
            </li>

            {/* Mypercel */}
            <li>
              <Link to='/dashboard/user-issue' className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="My Issue">
                {/* Settings icon */}
               <SiReacthookform />
                <span className="is-drawer-close:hidden">

                  My Issue</span>
              </Link>
            </li>


            {/* admin only link  */}
            {/* {
              role.role === 'admin' && <>
    
                <li>
                  <Link to='/dashboard/user-management' className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="User Management">
                   
                    <FaUserMd/>
                    <span className="is-drawer-close:hidden">

                      User Management</span>
                  </Link>
                </li>

               
                <li>
                  <Link to='/dashboard/rider-assign' className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Rider Assign">
                   
                    <RiEBikeFill />
                    <span className="is-drawer-close:hidden">

                      Rider Assign</span>
                  </Link>
                </li>

   
                <li>
                  <Link to='/dashboard/rider-status' className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Rider Status">
                   
                    <MdDirectionsBike />

                    <span className="is-drawer-close:hidden">Rider Status</span>
                  </Link>
                </li>
              </>
            } */}



            {/* rider only link  */}
            {/* {
              role.role === 'rider' && <>
               
            <li>
              <Link to='/dashboard/rider-task' className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Rider Task">
              
                    <Bike />
                <span className="is-drawer-close:hidden">

                  Rider Task</span>
              </Link>
            </li>
            <li>
              <Link to='/dashboard/rider-completed-task' className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Rider Delivered Task">
                
                    <SiTask />
                <span className="is-drawer-close:hidden">

                  Rider Delivered Task</span>
              </Link>
            </li>
              </>
            } */}

          </ul>
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout
