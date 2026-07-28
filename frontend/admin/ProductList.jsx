import { useEffect, useState } from "react";
import { Link } from "react-router";
import api from "../api/axios";

export default function ProductList() {
  const [products, setProducts] = useState([]);

  const loadProducts = async () => {
    try {
      const response = await api.get("/products");
      setProducts(response.data);
    } catch (err) {
      console.error("Error loading products:", err);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await api.delete(`/products/delete/${id}`);
      alert("Product deleted successfully");
      loadProducts();
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div className="max-w-5xl mx-auto mt-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Product List</h2>

        <Link
          to="/admin/products/add"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Add New Product
        </Link>
      </div>

      <table className="w-full border border-gray-300 border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Title</th>
            <th className="border px-4 py-2">Price</th>
            <th className="border px-4 py-2">Stock</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product._id} className="text-center">
              <td className="border px-4 py-2">{product.title}</td>
              <td className="border px-4 py-2">₹{product.price}</td>
              <td className="border px-4 py-2">{product.stock}</td>

              <td className="border px-4 py-2">
                <div className="flex justify-center gap-3">
                  <Link
                    to={`/admin/products/edit/${product._id}`}
                    className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => deleteProduct(product._id)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}