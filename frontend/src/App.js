import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Questions from "./pages/Questions";
import CodeEditor from "./pages/CodeEditor";
import Analytics from "./pages/Analytics";
import Submissions from "./pages/Submissions";
import AdminQuestions from "./pages/AdminQuestions";

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
          path="/questions"
          element={
            <ProtectedRoute>
              <Questions />
            </ProtectedRoute>
          }
        />

        <Route
          path="/questions/:id"
          element={
            <ProtectedRoute>
              <CodeEditor />
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