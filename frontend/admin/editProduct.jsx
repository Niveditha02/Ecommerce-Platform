import {useState,useEffect} from "react";
import {useNavigate,useParams} from "react-router";
import api from "../api/axios.js";


export default function EditProduct(){
    const navigate = useNavigate();
    const [form,setForm] = useState({
        title:" ",
        description:" ",
        price:" ",
        category:" ",
        price:" ",
        image: " ",
        stock: " ",
    });

    const allowedFields = ["title", "description", "price",
          "category", "price", "image", "stock"
    ];

    useEffect(()=>{
        loadProduct();
    },[]);

    const handleChange = (e)=>{
        setForm({
            ...form,
            [e.target.name] : e.target.value,
        });
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            await api.put(`/products/edit/${id}`,form);
            alert("product edited successfully");
            navigate("/admin/products");
        }catch(err){
            console.log("Error in editing the product", err);
        }
    }

    return(
        <div className="max-w-md p-6 bg-white rounded-xl shadow-lg border border-gray-200">
             <h2 className="w-full bg-white border-b border-gray-200 px-6 py-4">Edit product</h2>
             <form onSubmit={handleSubmit} className="space-y-3">
                {
                    allowedFields.map((key)=>(
                        allowedFields.includes(key) &&
                        < input 
                        key = {key} 
                        name = {key}
                        value = {form[key]}
                        onChange = {handleChange}
                        placeholder={key}
                        className=""
                     className="w-full rounded-xl bg-white dark:bg-gray-900 shadow-sm border border-gray-200 dark:border-gray-700 p-6"
                   />
            ))
          }
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 font-medium">
            Edit Product
          </button>
          </form>
          </div>
    )

}