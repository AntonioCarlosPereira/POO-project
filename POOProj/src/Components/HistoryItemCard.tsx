import React from 'react';
import './HistoryItemCard.css'; // Usaremos um CSS simples para o card

interface HistoryItemCardProps {
  servico: string;
  cliente: string;
  data: string;
  local: string;
  preco: string;
  status: 'Solicitado' | 'Aceito' | 'Recusado' | 'Concluído';
}

export default function HistoryItemCard({ servico, cliente, data, local, preco, status }: HistoryItemCardProps) {
    
    // Converte o status para uma classe CSS minúscula (ex: 'Solicitado' -> 'solicitado')
    const statusClass = status.toLowerCase();

    return (
        <div className="history-item-card shadow-sm">
            <div className="history-info">
                <h4 className="service-title">{servico}</h4>
                <p>
                    <strong>Cliente:</strong> {cliente}
                </p>
                <p>
                    <strong>Data:</strong> {data}
                </p>
                <p>
                    <strong>Local:</strong> {local}
                </p>
                <p>
                    <strong>Preço:</strong> {preco}
                </p>
            </div>
            
            {/* Exibição do Status no canto direito */}
            <div className={`status-badge status-${statusClass}`}>
                {status}
            </div>
        </div>
    );
}