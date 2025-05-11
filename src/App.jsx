// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import UserBoard from "./pages/UserBoard";
import ModeratorBoard from "./pages/ModeratorBoard";
import AdminBoard from "./pages/AdminBoard";
import Unauthorized from "./pages/Unauthorized";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <Router>
      <AuthProvider>
        <div>
          <Navbar />
          <div className="container mt-3 pb-5">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/unauthorized" element={<Unauthorized />} />
              
              {/* Rutas protegidas */}
              <Route element={<ProtectedRoute />}>
                <Route path="/profile" element={<Profile />} />
                <Route path="/user" element={<UserBoard />} />
              </Route>
              
              <Route 
                element={
                  <ProtectedRoute requiredRoles={["ROLE_MODERATOR", "ROLE_ADMIN"]} />
                }
              >
                <Route path="/mod" element={<ModeratorBoard />} />
              </Route>
              
              <Route 
                element={
                  <ProtectedRoute requiredRoles={["ROLE_ADMIN"]} />
                }
              >
                <Route path="/admin" element={<AdminBoard />} />
              </Route>
              
              {/* Ruta 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;