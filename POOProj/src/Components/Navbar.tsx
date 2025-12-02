import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./navbar.css";

export default function Navbar() {
  const [tipo, setTipo] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) setTipo(userData.tipo); // cliente | prestador | proprietario
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <Link className="navbar-brand" to="/">Serviços+</Link>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navMenu"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navMenu">
        <ul className="navbar-nav me-auto">

          {/* CLIENTE */}
          <li className="nav-item">
            <Link className="nav-link" to="/client/menu">Cliente</Link>
          </li>

          {/* PRESTADOR — aparece só se o tipo for prestador ou proprietario */}
          {(tipo === "prestador" || tipo === "proprietario") && (
            <li className="nav-item">
              <Link className="nav-link" to="/prestador">Prestador</Link>
            </li>
          )}

          {/* PROPRIETARIO — só aparece se for proprietario */}
          {tipo === "proprietario" && (
            <li className="nav-item">
              <Link className="nav-link" to="/proprietario">Proprietário</Link>
            </li>
          )}

          {/* PERFIL */}
          <li className="nav-item">
            <Link className="nav-link" to="/perfil">Perfil</Link>
          </li>
        </ul>

        {/* Logout */}
        <button
          className="btn btn-outline-light"
          onClick={() => {
            localStorage.removeItem("user");
            window.location.href = "/login";
          }}
        >
          Sair
        </button>
      </div>
    </nav>
  );
}
