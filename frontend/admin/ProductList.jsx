import {useEffect, useState} from "react";
import api from "../api/axios";
import {Link} from "react-router-dom";

export default function ProductList(){
    const [products, setProducts] = useState([]);

    const loadProducts = async()=>{
        const response = await api.get("/products");
        setProducts(response.data);
    }

    const deleteProducts = async(id)=>{
        try{
            await api.delete(`/products/delete/${id}`);
            alert("Product deleted successfully");
            loadProducts();
        }catch(err){
        console.error("Error deleting product: ", err);
    }
    }

    useEffect(()=>{
        loadProducts();
    },[]);

    return(
        <div className="max-w-4x1 mx-auto mt-10">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2x1 fonyt-bold">Product List</h2>
                <Link to="/admin/products/add" className="text-blue-600 hover:text-blue-700 
                transition-colors duration-200">
                       Add New Product
                </Link>
            </div>

        <table className="w-full border-collapse border border-gray-300">
            <thead>
                <tr className="bg-gray-100">
                    <th className="border border-gray-200 px-4 py-2">Title</th>
                    <th className="border border-gray-200 px-4 py-2">Price</th>
                    <th className="border border-gray-200 px-4 py-2">Stock</th>
                    <th className="border border-gray-200 px-4 py-2">Actions</th>
                </tr>
            </thead>
            <tbody>
                {products.map((products)=>(
                    <tr key={products.id} className = "text-center">
                        <td className="border border-gray-200 px-4 py-2">{products.title}</td>
                        <td className="border border-gray-200 px-4 py-2">{products.price}</td>
                        <td className="border border-gray-200 px-4 py-2">{products.Stock}</td>
                        <td className="border border-gray-200 px-4 py-2">{products.Actions}</td>
                        <td className="border border-gray-200 px-4 py-2">
                            <Link to={`/admin/products/update/${products.id}`} className="text-base text-gray-700">
                               Edit
                            </Link>
                        </td>
                    <button onClick={()=>deleteProduct(products.id)}
                        className="text-base text-gray-700">
                        Delete
                    </button>
                    </tr> 
                ))}
            </tbody>
        </table>
        </div>
    )
}