import { useState, useEffect } from "react";
import ApiService from "../services/api.service";

const AdminBoard = () => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAdminContent = async () => {
      try {
        const response = await ApiService.getAdminContent();
        setContent(response.data);
      } catch (error) {
        const message =
          error.response?.data?.message ||
          error.message ||
          "Error al cargar contenido de administrador";
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminContent();
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
        <h3>Panel de Administrador</h3>
      </header>
      <p className="alert alert-info">{content}</p>
      <div className="card">
        <div className="card-header bg-danger text-white">
          Herramientas de Administración
        </div>
        <div className="card-body">
          <p>
            Este panel está disponible solo para administradores. Aquí puedes
            administrar todos los aspectos de la aplicación.
          </p>
          <div className="row">
            <div className="col-md-6">
              <div className="card mb-3">
                <div className="card-header">Gestión de Usuarios</div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">Ver todos los usuarios</li>
                  <li className="list-group-item">Asignar roles</li>
                  <li className="list-group-item">Bloquear/Desbloquear usuarios</li>
                </ul>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card mb-3">
                <div className="card-header">Configuración del Sistema</div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">Ver logs del sistema</li>
                  <li className="list-group-item">Configurar parámetros</li>
                  <li className="list-group-item">Gestionar backups</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminBoard;