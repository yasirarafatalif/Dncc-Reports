import { createBrowserRouter } from "react-router";
import MainLayOut from "../LayOuts/MainLayOut";
import Home from "../Home/MainHome/Home";
import Register from "../Pages/Register/Register";

export const router = createBrowserRouter([
   {
   path: '/',
    element: <MainLayOut></MainLayOut>,
    // errorElement: <ErrorPage />,
    children: [
      {index: true , Component: Home},
      // {path: '/register' , Component: Register},
      {path: '/login' , Component: Register},
     
    ]

}
])