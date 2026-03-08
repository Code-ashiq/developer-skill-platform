import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../services/api";

export default function Register() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {

    if (!form.username || !form.email || !form.password) {
      toast.error("All fields are required");
      return;
    }

    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {

      await API.post("/auth/register/", {
        username: form.username,
        email: form.email,
        password: form.password
      });

      toast.success("Account created successfully");

      navigate("/");

    } catch (error) {

      const message =
        error.response?.data?.email?.[0] ||
        error.response?.data?.username?.[0] ||
        error.response?.data?.password?.[0] ||
        "Registration failed";

      toast.error(message);

    }

  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-900">

      <div className="bg-gray-800 p-8 rounded-lg w-96">

        <h2 className="text-2xl text-white mb-6 text-center">
          Register
        </h2>

        <input
          name="username"
          placeholder="Username"
          onChange={handleChange}
          className="w-full p-2 mb-3 bg-gray-700 text-white rounded"
        />

        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full p-2 mb-3 bg-gray-700 text-white rounded"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full p-2 mb-3 bg-gray-700 text-white rounded"
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          onChange={handleChange}
          className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 p-2 rounded text-white"
        >
          Register
        </button>

        <p
          className="text-gray-400 mt-4 text-center cursor-pointer"
          onClick={() => navigate("/")}
        >
          Already have an account? Login
        </p>

      </div>

    </div>

  );
}