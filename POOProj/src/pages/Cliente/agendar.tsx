import React, { useState } from "react";
import Navbar from "../../Components/Navbar";
import { useNavigate } from "react-router-dom";
import "./agendar.css";

export default function ClientSchedule() {
  const navigate = useNavigate();

  const [service, setService] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Aqui você pode salvar os filtros no estado global/context API
    // ou navegar passando params
    navigate("/client/results", {
      state: { service, date, location },
    });
  };

  return (
    <>
      <Navbar />

      <div className="container mt-5" style={{ maxWidth: "600px" }}>
        <h2 className="fw-bold mb-4 text-center">Agendar Serviço</h2>

        <form className="card p-4 shadow-sm" onSubmit={handleSearch}>
          {/* Tipo de serviço */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Serviço desejado</label>
            <input
              type="text"
              className="form-control"
              placeholder="Ex: Corte de cabelo, jardinagem, limpeza..."
              value={service}
              onChange={(e) => setService(e.target.value)}
              required
            />
          </div>

          {/* Data */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Data</label>
            <input
              type="date"
              className="form-control"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          {/* Local (opcional) */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Local (opcional)</label>
            <input
              type="text"
              className="form-control"
              placeholder="Endereço ou bairro"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary btn-lg w-100">
            Buscar Serviços
          </button>
        </form>
      </div>
    </>
  );
}
