import React from 'react'
import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "../pages/Home";
import ProductDetails from "../pages/ProductDetails";
import Signin from "../pages/Signin.jsx";
import Signup from "../pages/Signup.jsx";
import "./index.css";  
import AddProduct from '../admin/addProduct.jsx';
import EditProduct from '../admin/editProduct.jsx';
import ProductList from '../admin/ProductList.jsx';

const router = createBrowserRouter([
  {path: "/", element:<Home/>},
  {path: "/productDetails" , element:<ProductDetails/>},
  {path:"/Signin" , element:<Signin/>},
  {path:"/Signup", element:<Signup/>},
  {path:"/admin/products", element: <ProductList/>},
  {path:"/admin/products/add", element:<AddProduct/>},
  {path:"/admin/products/edit/:id", element:<EditProduct/>},
]);

function App(){
  return <RouterProvider router={router}/>;
}

export default App;