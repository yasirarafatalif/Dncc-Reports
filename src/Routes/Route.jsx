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
      {path: '/issues/1' , element: <PrivateRoute> <IssueDetailsPreview></IssueDetailsPreview></PrivateRoute>},
      // {path: '/issue/:id' , element: <PrivateRoute> <IssueDetailsPreview></IssueDetailsPreview></PrivateRoute>},
      {path: '/submit-issue' , element: <PrivateRoute><UserSubmitIssue></UserSubmitIssue> </PrivateRoute>},
     
    ]

},

{
   path: '/dashboard',
  element: <PrivateRoute>
    <DashboardLayout></DashboardLayout>
  </PrivateRoute>,
  children:[
    {path:'/dashboard/user-issue', Component: UserIssue}
  ]
}
])