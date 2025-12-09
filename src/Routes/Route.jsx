import { createBrowserRouter } from "react-router";
import MainLayOut from "../LayOuts/MainLayOut";
import Home from "../Home/MainHome/Home";
import Register from "../Pages/Register/Register";
import PrivateRoute from "./PrivateRoute";
import UserProfile from "../Pages/UserProfile/UserProfile";
import ErrorPage from './../Pages/ErrorPage/ErrorPage';
import IssueDetailsPreview from './../Pages/IssuseDetalis/IssueDetailsPreview';
import UserSubmitIssue from "../Pages/UserIssuse/UserSubmitIssue";
import LogIn from './../Pages/LogIn/LogIn';
import IssueDetails from "../Pages/UserIssuse/IssueDetails";
import DashboardLayout from "../LayOuts/DashboardLayOut";
import UserIssue from "../Pages/DashBoard/NormalUser/UserIssue";
import AllIssueCard from "../Pages/AllIssue/AllIssueCard";
import ManageUsers from "../Pages/DashBoard/Admin/ManageUsers";
import AllIssueManage from "../Pages/DashBoard/Admin/AllIssueManage";
import ManageStaff from "../Pages/DashBoard/Admin/ManageStaff";
import ApplyStaff from "../Pages/DashBoard/Staff/ApplyStaff";
import AccepetIssue from "../Pages/DashBoard/Staff/AccepetIssue";
import AdminRoute from "./AdminRoute";

export const router = createBrowserRouter([
   {
   path: '/',
    element: <MainLayOut></MainLayOut>,
    errorElement: <ErrorPage />,
    children: [
      {index: true , Component: Home},
      // {path: '/register' , Component: Register},
      {path: '/register' , Component: Register},
      {path: '/login' , Component: LogIn},
      {path: '/user-profile' , element: <PrivateRoute> <UserProfile></UserProfile></PrivateRoute>},
      {path: '/issue/:id' , element: <PrivateRoute> <IssueDetails></IssueDetails></PrivateRoute>},
      {path: '/submit-issue' , element: <PrivateRoute><UserSubmitIssue></UserSubmitIssue> </PrivateRoute>},
      { path:'/all-issue', element:  < AllIssueCard></AllIssueCard>}
     
    ]

},

{
   path: '/dashboard',
  element: <PrivateRoute>
    <DashboardLayout></DashboardLayout>
  </PrivateRoute>,
  children:[
    {path:'/dashboard/user-issue', Component: UserIssue},
    {path:'/dashboard/admin-all-issue-manage', element: <AdminRoute> <AllIssueManage></AllIssueManage></AdminRoute>},
    {path:'/dashboard/admin-all-manage-staff', element: <AdminRoute><ManageStaff></ManageStaff></AdminRoute>},
    {path:'/dashboard/apply-staff', Component: ApplyStaff},
    {path:'/dashboard/staff-accept-issue', element: <AdminRoute><AccepetIssue></AccepetIssue></AdminRoute>},
    {path:'/dashboard/manage-user', element: <AdminRoute><ManageUsers></ManageUsers></AdminRoute>}
  ]
}
])