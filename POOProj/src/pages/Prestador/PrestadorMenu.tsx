import React from "react";
import { useNavigate } from "react-router-dom";
import "./prestadorMenu.css";

export default function PrestadorMenu() {
  const navigate = useNavigate();

  return (
    <div className="prestador-menu">
      <h2>Menu do Prestador</h2>

      <button onClick={() => navigate("/prestador/cadastrar")}>
        Cadastrar Serviço
      </button>

      <button onClick={() => navigate("/prestador/gerenciar")}>
        Gerenciar Solicitações
      </button>

      <button onClick={() => navigate("/prestador/historico")}>
        Histórico
      </button>
    </div>
  );
}
