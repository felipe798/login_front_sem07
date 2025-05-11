// src/pages/Register.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  
  const { register } = useAuth();

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");
    setSuccessful(false);
    setLoading(true);

    try {
      await register(username, email, password);
      setSuccessful(true);
      setMessage("¡Registro exitoso! Ahora puedes iniciar sesión.");
    } catch (error) {
      const resMessage =
        error.response?.data?.message ||
        error.message ||
        error.toString();
      
      setMessage(resMessage);
      setSuccessful(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="col-md-6 offset-md-3">
      <div className="card card-container p-4 mt-5">
        <h3 className="text-center mb-4">
          <FontAwesomeIcon icon={faUserPlus} className="me-2" />
          Registro de Usuario
        </h3>

        {!successful && (
          <form onSubmit={handleRegister}>
            <div className="form-group mb-3">
              <label htmlFor="username">Usuario</label>
              <input
                type="text"
                className="form-control"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                minLength="3"
                maxLength="20"
              />
            </div>

            <div className="form-group mb-3">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                minLength="6"
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
                <span>Registrarse</span>
              </button>
            </div>
          </form>
        )}

        {message && (
          <div
            className={
              successful ? "alert alert-success" : "alert alert-danger"
            }
            role="alert"
          >
            {message}
          </div>
        )}
        
        {successful ? (
          <div className="text-center mt-3">
            <Link to="/login" className="btn btn-primary">
              Ir a Iniciar Sesión
            </Link>
          </div>
        ) : (
          <div className="text-center mt-3">
            <p>
              ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;