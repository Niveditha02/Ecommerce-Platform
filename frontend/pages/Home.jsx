import {useState, useEffect} from "react";
import api from "../api/axios";
import {Link} from "react-router";

export default function Home(){
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");

    const loadProducts = async()=>{
        const res = await api.get(`/products?search=${search}&category=${category}`);
        setProducts(res.data);
    }

    useEffect(()=>{
        loadProducts();
    },[search, category]);

    return(
        <div className="p-6">
            <h1 className = "text-3x1 font-bold mb-4">Product List</h1>

            <div className = "mb-4 flex gap-3">
                <input placeholder="search products .."
                value = {search}
                onChange = {(e)=>setSearch(e.target.value)}
                className= "border px-3 py-2 rounded w-1/2"
                />
                {/* {category filter} */}
                <select
                   value = {category}
                   onChange = {(e)=>setCategory(e.target.value)}
                   className = "border px-3 py-2 rounded">
                    <option value="">All Catgories</option>
                    <option value="Footwear">Footwear</option>
                    <option value="Nike">Nike</option>
                </select>
            </div>
            
        </div>
    )
}

