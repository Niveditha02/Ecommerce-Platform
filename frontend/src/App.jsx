import React from 'react'
import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "../pages/Home";
import ProductDetails from "../pages/ProductDetails";
import Signin from "../pages/Signin.jsx";
import Signup from "../pages/Signup.jsx";
import "./index.css";  

const router = createBrowserRouter([
  {path: "/", element:<Home/>},
  {path: "/productDetails" , element:<ProductDetails/>},
  {path:"/Signin" , element:<Signin/>},
  {path:"/Signup", element:<Signup/>}
]);

function App(){
  return <RouterProvider router={router}/>;
}

export default App;