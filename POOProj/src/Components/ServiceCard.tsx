import React from "react";
import "./ServiceCard.css";

export default function ServiceCard({ servico, horario, local, preco, extra }) {
  return (
    <div className="service-card">
      <div className="card-icon"></div>

      <div className="card-info">
        <span><strong>Serviço:</strong> {servico}</span>
        <span><strong>Horário:</strong> {horario}</span>
        <span><strong>Local:</strong> {local}</span>
        <span><strong>Preço:</strong> {preco}</span>

        {extra && <span><strong>{extra.label}:</strong> {extra.value}</span>}
      </div>
    </div>
  );
}
