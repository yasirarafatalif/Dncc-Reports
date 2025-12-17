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
import UserIssue from "../Pages/DashBoard/NormalUser/UserIssue";
import AllIssueCard from "../Pages/AllIssue/AllIssueCard";
import ManageUsers from "../Pages/DashBoard/Admin/ManageUsers";
import AllIssueManage from "../Pages/DashBoard/Admin/AllIssueManage";
import ManageStaff from "../Pages/DashBoard/Admin/ManageStaff";
import ApplyStaff from "../Pages/DashBoard/Staff/ApplyStaff";
import AccepetIssue from "../Pages/DashBoard/Staff/AccepetIssue";
import AdminRoute from "./AdminRoute";
import StaffRoute from "./StaffRoute";
import IssueBostPayment from "../Pages/DashBoard/Payments/IssueBostPayment";
import UserSubcription from "../Pages/DashBoard/Payments/UserSubcription";
import UserSubcriptionSuccess from "../Pages/DashBoard/Payments/UserSubcriptionSuccess";
import AllPayments from "../Pages/DashBoard/Admin/AllPayments";
import DashboardLayout from "../LayOuts/DashboardLayout";
import Dashboard from "../Pages/DashBoard/Dashboard";
import About from "../Pages/About/About";
import AllResolvedIssue from "../Pages/DashBoard/Admin/AllResolvedIssue";

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
      {path: '/about' , Component: About},
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
    {path:"/dashboard", Component: Dashboard},
    {path:'/dashboard/payment-success', Component: IssueBostPayment},
    {path:'/dashboard/user-subcription-payment-success', Component: UserSubcriptionSuccess},
    {path:'/dashboard/admin-all-issue-manage', element: <AdminRoute> <AllIssueManage></AllIssueManage></AdminRoute>},
    {path:'/dashboard/user-subcription', element:  <UserSubcription></UserSubcription>},
    {path:'/dashboard/admin-all-manage-staff', element: <AdminRoute><ManageStaff></ManageStaff></AdminRoute>},
    {path:'/dashboard/apply-staff', Component: ApplyStaff},
    {path:'/dashboard/staff-accept-issue', element: <StaffRoute><AccepetIssue></AccepetIssue></StaffRoute>},
    {path:'/dashboard/manage-user', element: <AdminRoute><ManageUsers></ManageUsers></AdminRoute>},
    {path:'/dashboard/admin-all-resolved-issue-manage', element: <AdminRoute><AllResolvedIssue></AllResolvedIssue></AdminRoute>},
    {path:'/dashboard/all-payments-info', element: <AdminRoute><AllPayments></AllPayments></AdminRoute>}
  ]
}
])