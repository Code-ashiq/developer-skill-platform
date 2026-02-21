import { useState } from "react";
import API from "../services/api";

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {

    try {

      const res = await API.post("/auth/login/", {
        email,
        password
      });

      localStorage.setItem("token", res.data.access);

      window.location.href = "/dashboard";

    } catch {
      alert("Invalid credentials");
    }

  };

  return (

    <div className="min-h-screen bg-gray-900 flex items-center justify-center">

      <div className="bg-gray-800 p-8 rounded-xl shadow-xl w-96">

        <h2 className="text-white text-3xl font-bold mb-6 text-center">
          DevSkill Login
        </h2>

        <input
          className="w-full p-3 mb-4 bg-gray-700 text-white rounded"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full p-3 mb-4 bg-gray-700 text-white rounded"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={login}
          className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded font-bold"
        >
          Login
        </button>

      </div>

    </div>
  );
}