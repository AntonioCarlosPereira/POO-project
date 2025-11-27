import React from "react";
import "./notificationcard.css";

export default function NotificationCard({
  servico,
  horario,
  local,
  cliente,
  onAccept,
  onReject
}) {
  return (
    <div className="notification-card">
      <div className="notif-icon"></div>

      <div className="notif-info">
        <span><strong>Serviço:</strong> {servico}</span>
        <span><strong>Horário:</strong> {horario}</span>
        <span><strong>Local:</strong> {local}</span>
        <span><strong>Cliente:</strong> {cliente}</span>
      </div>

      <div className="notif-actions">
        <button className="btn-accept" onClick={onAccept}>✔</button>
        <button className="btn-reject" onClick={onReject}>✖</button>
      </div>
    </div>
  );
}
