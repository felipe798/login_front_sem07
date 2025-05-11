// src/pages/Home.jsx
import { useState, useEffect } from "react";
import ApiService from "../services/api.service";

const Home = () => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPublicContent = async () => {
      try {
        const response = await ApiService.getPublicContent();
        setContent(response.data);
      } catch (error) {
        const message =
          error.response?.data?.message ||
          error.message ||
          "Error al cargar contenido";
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchPublicContent();
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
        <h3>{content}</h3>
        <p className="lead">
          ¡Bienvenido a nuestra aplicación! Esta es una página pública accesible
          para todos los usuarios.
        </p>
      </header>
      <div className="row">
        <div className="col-md-4">
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">Características</h5>
              <p className="card-text">
                Nuestra aplicación ofrece autenticación segura con JWT y acceso
                basado en roles.
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">Tecnologías</h5>
              <p className="card-text">
                Desarrollado con React, Node.js, Express y PostgreSQL.
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">Seguridad</h5>
              <p className="card-text">
                Implementamos autenticación JWT y validación de datos para
                mantener su información segura.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;