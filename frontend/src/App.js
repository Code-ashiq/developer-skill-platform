import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CodeEditor from "./pages/CodeEditor";
import Analytics from "./pages/Analytics";
import Submissions from "./pages/Submissions";
import AdminQuestions from "./pages/AdminQuestions";
import Register from "./pages/Register";
import Problems from "./pages/Problems";

import ProtectedRoute from "./components/ProtectedRoute";
import { getUserRole } from "./utils/auth";
import { Toaster } from "react-hot-toast";

function AdminRoute({ children }) {

  const token = localStorage.getItem("token");
  const isAdmin = getUserRole();

  if (!token) return <Navigate to="/" />;
  if (!isAdmin) return <Navigate to="/dashboard" />;

  return children;
}

function App() {

  return (
    <>
    <Toaster position="top-right" />
    <BrowserRouter>

      <Routes>

        {/* Public */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/problems" element={<Problems />} />
        <Route path="/problems/:id" element={<CodeEditor />} />

        {/* Protected */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/analytics"
          element={
            <ProtectedRoute>
              <Analytics />
            </ProtectedRoute>
          }
        />

        <Route
          path="/submissions"
          element={
            <ProtectedRoute>
              <Submissions />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/questions"
          element={
            <AdminRoute>
              <AdminQuestions />
            </AdminRoute>
          }
        />

      </Routes>

    </BrowserRouter>
    </>

  );
}

export default App;