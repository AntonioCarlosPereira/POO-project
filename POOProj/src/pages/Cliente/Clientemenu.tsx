import React from "react";
import Navbar from '../../Components/Navbar';
import { useNavigate } from "react-router-dom";
import "./clientemenu.css";

export default function ClientMenu() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      <div
        className="container d-flex flex-column justify-content-center align-items-center"
        style={{ minHeight: "80vh" }}
      >
        <h2 className="mb-4 fw-bold">Menu do Cliente</h2>

        <div className="d-flex flex-column gap-3 w-100" style={{ maxWidth: "350px" }}>
          <button
            className="btn btn-primary btn-lg w-100"
            onClick={() => navigate("/client/agendar")}
          >
            Agendar Serviço
          </button>

          <button
            className="btn btn-outline-primary btn-lg w-100"
            onClick={() => navigate("/client/historico")}
          >
            Histórico de Serviços
          </button>

          <button
            className="btn btn-secondary btn-lg w-100"
            onClick={() => navigate("/profile")}
          >
            Perfil
          </button>
        </div>
      </div>
    </>
  );
}
