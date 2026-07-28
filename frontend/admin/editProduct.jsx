import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import api from "../api/axios";

export default function EditProduct() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    image: "",
    stock: "",
  });

  const loadProduct = async () => {
    try {
      const response = await api.get(`/products/${id}`);

      setForm(response.data);
    } catch (err) {
      console.error("Error loading product:", err);
    }
  };

  useEffect(() => {
    loadProduct();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.put(`/products/edit/${id}`, form);

      alert("Product updated successfully");

      navigate("/admin/products");
    } catch (err) {
      console.error("Error updating product:", err);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6">
        Edit Product
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        {Object.keys(form).map((key) => (
          <input
            key={key}
            type={key === "price" || key === "stock" ? "number" : "text"}
            name={key}
            value={form[key]}
            onChange={handleChange}
            placeholder={key}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        ))}

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
        >
          Update Product
        </button>
      </form>
    </div>
  );
}