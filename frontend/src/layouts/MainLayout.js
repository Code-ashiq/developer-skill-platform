import { Link, useNavigate } from "react-router-dom";
import { getUserRole } from "../utils/auth";

export default function MainLayout({ children }) {

  const navigate = useNavigate();

  const isAdmin = getUserRole();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("is_admin");
    navigate("/");
  };

  return (

    <div className="flex min-h-screen bg-gray-900 text-white">

      {/* Sidebar */}
      <div className="w-64 bg-gray-800 p-6">

        <h1 className="text-2xl font-bold mb-8">
          DevSkill
        </h1>

        <nav className="space-y-4">

          <Link
            to="/dashboard"
            className="block text-gray-300 hover:text-white"
          >
            Dashboard
          </Link>

          <Link
            to="/questions"
            className="block text-gray-300 hover:text-white"
          >
            Questions
          </Link>

          <Link
            to="/analytics"
            className="block text-gray-300 hover:text-white"
          >
            Analytics
          </Link>

          <Link
            to="/submissions"
            className="block text-gray-300 hover:text-white"
          >
            Submissions
          </Link>

          {isAdmin && (
            <Link
              to="/admin/questions"
              className="block text-gray-300 hover:text-white"
            >
              Admin Questions
            </Link>
          )}

          <button
            onClick={logout}
            className="block text-red-400 hover:text-red-300"
          >
            Logout
          </button>

        </nav>

      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">

        {children}

      </div>

    </div>

  );

}