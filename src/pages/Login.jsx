// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      await login(username, password);
      navigate("/profile");
    } catch (error) {
      const resMessage =
        error.response?.data?.message ||
        error.message ||
        error.toString();
      
      setMessage(resMessage);
      setLoading(false);
    }
  };

  return (
    <div className="col-md-6 offset-md-3">
      <div className="card card-container p-4 mt-5">
        <h3 className="text-center mb-4">
          <FontAwesomeIcon icon={faSignInAlt} className="me-2" />
          Iniciar Sesión
        </h3>

        <form onSubmit={handleLogin}>
          <div className="form-group mb-3">
            <label htmlFor="username">Usuario</label>
            <input
              type="text"
              className="form-control"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-group d-grid mb-3">
            <button
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? (
                <span className="spinner-border spinner-border-sm me-1"></span>
              ) : null}
              <span>Ingresar</span>
            </button>
          </div>

          {message && (
            <div className="alert alert-danger" role="alert">
              {message}
            </div>
          )}
          
          <div className="text-center mt-3">
            <p>
              ¿No tienes una cuenta? <Link to="/register">Regístrate</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;