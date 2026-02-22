import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Questions from "./pages/Questions";
import CodeEditor from "./pages/CodeEditor";
import Analytics from "./pages/Analytics";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/dashboard" element={<Dashboard />} />
        
        <Route path="/questions" element={<Questions />} />

        <Route path="/questions/:id" element={<CodeEditor />} />

        <Route path="/analytics" element={<Analytics />} />

      </Routes>

    </BrowserRouter>

  );
}

export default App;