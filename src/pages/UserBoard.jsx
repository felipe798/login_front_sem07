import { useState, useEffect } from "react";
import ApiService from "../services/api.service";

const UserBoard = () => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserContent = async () => {
      try {
        const response = await ApiService.getUserContent();
        setContent(response.data);
      } catch (error) {
        const message =
          error.response?.data?.message ||
          error.message ||
          "Error al cargar contenido de usuario";
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserContent();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    );
  }

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>Área de Usuario</h3>
      </header>
      <p className="alert alert-info">{content}</p>
      <div className="card">
        <div className="card-header">
          Funcionalidades de Usuario
        </div>
        <div className="card-body">
          <p>
            Este es el panel para usuarios registrados. Aquí puedes acceder a las
            funcionalidades básicas de la aplicación.
          </p>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">Ver tu perfil</li>
            <li className="list-group-item">Actualizar información personal</li>
            <li className="list-group-item">Acceder a contenido exclusivo</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserBoard;