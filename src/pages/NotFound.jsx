import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="container text-center">
      <div className="mt-5">
        <h1 className="display-1">404</h1>
        <h2>Página No Encontrada</h2>
        <p className="lead">
          Lo sentimos, la página que estás buscando no existe.
        </p>
        <Link to="/" className="btn btn-primary">
          Volver a Inicio
        </Link>
      </div>
    </div>
  );
};

export default NotFound;