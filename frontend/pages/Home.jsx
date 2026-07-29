import { useState, useEffect } from "react";
import { Link } from "react-router"; // If using React Router v6, use: react-router-dom
import api from "../api/axios";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const loadProducts = async () => {
    try {
      const res = await api.get(`/products?search=${search}&category=${category}`);
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [search, category]);

  return (
    <div className="p-6">
      {/* Heading */}
      <h1 className="text-3xl font-bold mb-6">Product List</h1>

      {/* Search & Category Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded-md px-4 py-2 w-full md:w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Categories</option>
          <option value="Footwear">Footwear</option>
          <option value="Nike">Nike</option>
          <option value="Mobiles">Mobiles</option>
          <option value="Laptops">Laptops</option>
        </select>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.length > 0 ? (
          products.map((product) => (
            <Link
              key={product._id}
              to={`/product/${product._id}`}
              className="border rounded-lg p-4 hover:shadow-lg transition duration-300"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-48 object-contain bg-gray-100 rounded"
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/300x200?text=No+Image";
                }}
              />

              <h2 className="mt-4 text-lg font-semibold">
                {product.title}
              </h2>

              <p className="text-sm text-gray-500">
                Category: {product.category}
              </p>

              <p className="text-xl font-bold text-green-600 mt-2">
                ₹{product.price}
              </p>

              <p className="text-sm text-gray-500">
                Stock: {product.stock}
              </p>
            </Link>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 text-lg">
            No products found.
          </div>
        )}
      </div>
    </div>
  );
}