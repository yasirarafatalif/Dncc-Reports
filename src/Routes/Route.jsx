import { createBrowserRouter } from "react-router";
import MainLayOut from "../LayOuts/MainLayOut";
import Home from "../Home/MainHome/Home";
import Register from "../Pages/Register/Register";

import PrivateRoute from "./PrivateRoute";
import UserProfile from "../Pages/UserProfile/UserProfile";
import ErrorPage from './../Pages/ErrorPage/ErrorPage';

export const router = createBrowserRouter([
   {
   path: '/',
    element: <MainLayOut></MainLayOut>,
    errorElement: <ErrorPage />,
    children: [
      {index: true , Component: Home},
      // {path: '/register' , Component: Register},
      {path: '/login' , Component: Register},
      {path: '/user-profile' , element: <PrivateRoute> <UserProfile></UserProfile></PrivateRoute>},
     
    ]

}
])