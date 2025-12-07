import React, { useState } from "react";
import NotificationCard from "../../Components/NotificationCard";
import "./Gerenciar.css";

interface Notificacao {
  id: number;
  servico: string;
  horario: string;
  local: string;
  cliente: string;
}

export default function Gerenciar() {
  const [notificacoes, setNotificacoes] = useState<Notificacao[]>([
    {
      id: 1,
      servico: "Limpeza",
      horario: "14:00",
      local: "Centro",
      cliente: "João Silva"
    },
    {
      id: 2,
      servico: "Manutenção",
      horario: "09:00",
      local: "Vila Mariana",
      cliente: "Maria Souza"
    }
  ]);

  const handleAccept = (id: number) => {
    setNotificacoes((prev) => prev.filter((n) => n.id !== id));
    alert("Serviço aceito!");
  };

  const handleReject = (id: number) => {
    setNotificacoes((prev) => prev.filter((n) => n.id !== id));
    alert("Serviço rejeitado.");
  };

  return (
    <div className="gerenciar-page">
      <h2>Solicitações Recebidas</h2>

      {notificacoes.length === 0 && (
        <p className="sem-solicitacoes">Nenhuma solicitação no momento.</p>
      )}

      {notificacoes.map((n) => (
        <NotificationCard
          key={n.id}
          servico={n.servico}
          horario={n.horario}
          local={n.local}
          cliente={n.cliente}
          onAccept={() => handleAccept(n.id)}
          onReject={() => handleReject(n.id)}
        />
      ))}
    </div>
  );
}
