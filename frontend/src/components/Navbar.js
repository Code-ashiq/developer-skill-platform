import { Link } from "react-router-dom";

export default function Navbar() {

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (

    <nav className="bg-gray-900 border-b border-gray-700">

      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between">

        <h1 className="text-white text-xl font-bold">
          DevSkill
        </h1>

        <div className="space-x-6">

          <Link to="/dashboard" className="text-gray-300 hover:text-white">
            Dashboard
          </Link>

          <Link to="/questions" className="text-gray-300 hover:text-white">
            Questions
          </Link>

          <Link to="/analytics" className="text-gray-300 hover:text-white">
            Analytics
          </Link>

          <button
            onClick={logout}
            className="text-red-400 hover:text-red-300"
          >
            Logout
          </button>

        </div>

      </div>

    </nav>
  );
}