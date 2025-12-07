import React from "react";
import ServiceCard from "../../Components/ServiceCard";
import Navbar from "../../Components/AppNavbar";
import "./HistoricoPrestador.css";

export default function HistoricoPrestador() {
  // 🔥 Aqui futuramente você vai puxar do backend.
  // Por enquanto, dados mockados:
  const historico = [
    {
      servico: "Banho e Tosa",
      horario: "10/02 - 14:00",
      local: "Rua das Flores, 123",
      preco: "R$ 60,00",
      extra: { label: "Status", value: "Concluído" },
    },
    {
      servico: "Passeio",
      horario: "08/02 - 09:00",
      local: "Parque Central",
      preco: "R$ 30,00",
      extra: { label: "Status", value: "Cancelado pelo Cliente" },
    },
    {
      servico: "Adestramento",
      horario: "05/02 - 16:00",
      local: "Av. Brasil, 999",
      preco: "R$ 120,00",
      extra: { label: "Status", value: "Concluído" },
    },
  ];

  return (
    <>
      <Navbar />
      
      <div className="prestador-historico-container">
        <h2 className="title">Histórico de Serviços</h2>

      </div>
    </>
  );
}
