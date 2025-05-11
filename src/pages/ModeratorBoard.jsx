import { useState, useEffect } from "react";
import ApiService from "../services/api.service";

const ModeratorBoard = () => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchModContent = async () => {
      try {
        const response = await ApiService.getModeratorContent();
        setContent(response.data);
      } catch (error) {
        const message =
          error.response?.data?.message ||
          error.message ||
          "Error al cargar contenido de moderador";
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchModContent();
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
        <h3>Panel de Moderador</h3>
      </header>
      <p className="alert alert-info">{content}</p>
      <div className="card">
        <div className="card-header bg-warning text-dark">
          Herramientas de Moderación
        </div>
        <div className="card-body">
          <p>
            Este panel está disponible solo para moderadores. Aquí puedes gestionar
            y moderar el contenido de la aplicación.
          </p>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">Revisar contenido de usuarios</li>
            <li className="list-group-item">Moderar comentarios</li>
            <li className="list-group-item">Gestionar reportes</li>
            <li className="list-group-item">Ver estadísticas de actividad</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ModeratorBoard;