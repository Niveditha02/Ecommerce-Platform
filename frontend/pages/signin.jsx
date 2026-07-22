import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "../api/axios";

export default function Signin() {
    const [form, setForm] = useState({
        email: "",
        password: ""
    })

    const navigate = useNavigate();
    const [msg, setMsg] = useState("");

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("/auth/signin", form);
            setMsg(response.data.message);
            navigate("/");
        } catch (err) {
            setMsg(err.response?.data?.message || "An error occured");
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200
                    w-[430px] p-8">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Sign in</h2>
                    <p className="text-sm text-gray-600">Please enter your details below.</p>
                </div>

                {msg && (
                    <div className={`p-4 rounded-md mb-6 text-sm font-medium text-center 
                    ${msg.toLowerCase().includes('error') || msg.toLowerCase().includes('failed') || msg.toLowerCase().includes('occured') ?
                            'bg-red-50 text-red-700 border border-red-200' : 'bg-green-50 text-green-700 border border-green-200'}`}>
                        {msg}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
                    <div className="flex flex-col">
                        <input name='email'
                            type="email"
                            placeholder="Enter an email address"
                            value={form.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 
                            focus:ring-blue-500 focus:border-blue-500" required />
                    </div>

                    <div className="flex flex-col">
                        <input name='password'
                            type="password"
                            placeholder="Enter a password"
                            value={form.password}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 
                            focus:ring-blue-500 focus:border-blue-500" required />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white font-semibold py-2.5 px-4 rounded-md hover:bg-blue-700 
                        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-2 
                        transition-colors">
                        Sign In
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-gray-600">
                    Don't have an account?{' '}
                    <a href="/signup" className="font-semibold text-blue-600 hover:text-blue-500 hover:underline">
                        Sign up
                    </a>
                </p>
            </div>
        </div>
    );
}