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
import AllRejectedIssue from "../Pages/DashBoard/Admin/AllRejectedIssue";
import StaffResloved from "../Pages/DashBoard/Staff/StaffResloved";
import PaymentsHistory from "../Pages/DashBoard/NormalUser/PaymentsHistory";
import Contact from "../Pages/Contact/Contact";
import CitizenRoute from "./CitizenRoute";

export const router = createBrowserRouter([
   {
   path: '/',
    element: <MainLayOut></MainLayOut>,
    errorElement: <ErrorPage />,
    children: [
      {index: true , Component: Home},
      {path: '/register' , Component: Register},
      {path: '/login' , Component: LogIn},
      {path: '/about' , Component: About},
      {path: '/user-profile' , element: <PrivateRoute> <UserProfile></UserProfile></PrivateRoute>},
      {path: '/issue/:id' , element: <PrivateRoute> <IssueDetails></IssueDetails></PrivateRoute>},
      {path: '/submit-issue' , element: <PrivateRoute><UserSubmitIssue></UserSubmitIssue></PrivateRoute>},
      { path:'/all-issue', element:  < AllIssueCard></AllIssueCard>},
      { path:'/contact', element:  <Contact></Contact>}
     
    ]

},

{
   path: '/dashboard',
  element: <PrivateRoute>
    <DashboardLayout></DashboardLayout>
  </PrivateRoute>,
  children:[
     {path:"/dashboard", Component: Dashboard},
    {path:'/dashboard/user-issue', Component: UserIssue},
    {path:'/dashboard/payment-success', element: <CitizenRoute><IssueBostPayment></IssueBostPayment></CitizenRoute> },
    {path:'/dashboard/user-subcription-payment-success', element:<CitizenRoute><UserSubcriptionSuccess></UserSubcriptionSuccess></CitizenRoute>  },
    {path:'/dashboard/admin-all-issue-manage', element: <AdminRoute> <AllIssueManage></AllIssueManage></AdminRoute>},
    {path:'/dashboard/user-subcription', element:  <CitizenRoute><UserSubcription></UserSubcription></CitizenRoute>},
    {path:'/dashboard/admin-all-manage-staff', element: <AdminRoute><ManageStaff></ManageStaff></AdminRoute>},
    {path:'/dashboard/staff-accept-issue', element: <StaffRoute><AccepetIssue></AccepetIssue></StaffRoute>},
    {path:'/dashboard/manage-user', element: <AdminRoute><ManageUsers></ManageUsers></AdminRoute>},
    {path:'/dashboard/admin-all-resolved-issue-manage', element: <AdminRoute><AllResolvedIssue></AllResolvedIssue></AdminRoute>},
    {path:'/dashboard/admin-all-rejected-issue-manage', element: <AdminRoute><AllRejectedIssue></AllRejectedIssue></AdminRoute>},
    {path:'/dashboard/all-payments-info', element: <AdminRoute><AllPayments></AllPayments></AdminRoute>},
    {path:'/dashboard/staff-resloved-issue', element: <StaffRoute><StaffResloved></StaffResloved></StaffRoute>},
    {path:'/dashboard/payment-history', element: <CitizenRoute><PaymentsHistory></PaymentsHistory></CitizenRoute>}
  ]
}
])