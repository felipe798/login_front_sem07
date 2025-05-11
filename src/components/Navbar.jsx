// src/components/Navbar.jsx
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faHome, 
  faUser, 
  faSignInAlt, 
  faUserPlus,
  faSignOutAlt,
  faUserShield,
  faUserCog
} from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const { currentUser, isAdmin, isModerator, logout } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link to="/" className="navbar-brand">
          <FontAwesomeIcon icon={faHome} className="me-2" />
          Mi Aplicación
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Inicio
              </Link>
            </li>
            
            {currentUser && (
              <li className="nav-item">
                <Link to="/user" className="nav-link">
                  Área de Usuario
                </Link>
              </li>
            )}
            
            {isModerator && (
              <li className="nav-item">
                <Link to="/mod" className="nav-link">
                  <FontAwesomeIcon icon={faUserShield} className="me-1" />
                  Panel Moderador
                </Link>
              </li>
            )}
            
            {isAdmin && (
              <li className="nav-item">
                <Link to="/admin" className="nav-link">
                  <FontAwesomeIcon icon={faUserCog} className="me-1" />
                  Panel Admin
                </Link>
              </li>
            )}
          </ul>
          
          {currentUser ? (
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link to="/profile" className="nav-link">
                  <FontAwesomeIcon icon={faUser} className="me-1" />
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={(e) => {
                  e.preventDefault();
                  logout();
                }}>
                  <FontAwesomeIcon icon={faSignOutAlt} className="me-1" />
                  Cerrar Sesión
                </a>
              </li>
            </ul>
          ) : (
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link to="/login" className="nav-link">
                  <FontAwesomeIcon icon={faSignInAlt} className="me-1" />
                  Iniciar Sesión
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/register" className="nav-link">
                  <FontAwesomeIcon icon={faUserPlus} className="me-1" />
                  Registrarse
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;