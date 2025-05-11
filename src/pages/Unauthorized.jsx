import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div className="container text-center">
      <div className="alert alert-danger mt-5" role="alert">
        <h2>Acceso No Autorizado</h2>
        <p className="lead">
          No tienes los permisos necesarios para acceder a esta página.
        </p>
      </div>
      <Link to="/" className="btn btn-primary">
        Volver a Inicio
      </Link>
    </div>
  );
};

export default Unauthorized;