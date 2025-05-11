// src/pages/Profile.jsx
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { currentUser } = useAuth();

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h3>Perfil de Usuario</h3>
            </div>
            <div className="card-body">
              <div className="mb-3 row">
                <label className="col-sm-3 col-form-label fw-bold">ID:</label>
                <div className="col-sm-9">
                  <p className="form-control-plaintext">{currentUser.id}</p>
                </div>
              </div>
              <div className="mb-3 row">
                <label className="col-sm-3 col-form-label fw-bold">Usuario:</label>
                <div className="col-sm-9">
                  <p className="form-control-plaintext">{currentUser.username}</p>
                </div>
              </div>
              <div className="mb-3 row">
                <label className="col-sm-3 col-form-label fw-bold">Email:</label>
                <div className="col-sm-9">
                  <p className="form-control-plaintext">{currentUser.email}</p>
                </div>
              </div>
              <div className="mb-3 row">
                <label className="col-sm-3 col-form-label fw-bold">Roles:</label>
                <div className="col-sm-9">
                  <ul className="list-group">
                    {currentUser.roles && currentUser.roles.map((role, index) => (
                      <li key={index} className="list-group-item">
                        {role}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="mb-3 row">
                <label className="col-sm-3 col-form-label fw-bold">Token:</label>
                <div className="col-sm-9">
                  <div className="form-control-plaintext">
                    <div className="token-display">
                      <small className="text-muted">
                        {currentUser.accessToken.substring(0, 20)}...{" "}
                        [Haz click para ver completo]
                      </small>
                    </div>
                    <div className="collapse" id="viewToken">
                      <div className="card card-body mt-2">
                        <code className="token-full">{currentUser.accessToken}</code>
                      </div>
                    </div>
                    <button
                      className="btn btn-sm btn-outline-primary mt-2"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#viewToken"
                      aria-expanded="false"
                      aria-controls="viewToken"
                    >
                      Mostrar/Ocultar Token Completo
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;