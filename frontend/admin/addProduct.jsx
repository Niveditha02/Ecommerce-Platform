import { useState } from "react";
import api from "../api/axios";
import {useNavigate} from "react-router-dom";

export default function AddProduct(){
    const [form,setForm] = useState({
        name = "",
        description = " ",
        price = " ",
        category = " ",
    });

    const navigate = useNavigate();
    const handleChange = (e)=>{
        setForm({
            ...form,
            [e.target.name] : e.target.value,
        });
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();
        try{
            await api.post("/products/add",form);
            alert("Product added successfully");
            navigate("/admin/products");
        }catch(error){
            console.error("Error adding product:",err);
        }
    }

    return(
       <div  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
       <h2 className="w-full bg-white border-b border-gray-200 px-6 py-4">Add new product</h2>
       <form onSubmit = {handleSubmit} className="space-y-3">
          {
            Object.keys(form).map((key)=>( 
                <input
                   key = {key}
                   name = {key}
                   value = {form[key]}
                   onChange = {handleChange}
                   placeholder = {key}
                   className="w-full rounded-xl bg-white dark:bg-gray-900 shadow-sm border border-gray-200 dark:border-gray-700 p-6"
                   />
            ))
          }
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 font-medium">
            Add Product
          </button>
          </form>
          </div>
    )
}