import React from "react";
import { Link } from "react-router-dom";
import "./ServiceCard.css";

interface AvailableSlot {
  scheduleId: number;
  date: string;
  hour: string;
  serviceName: string;
  price: number;
  duration: string;
  placeName: string;
  workerName: string;
}

interface ServiceCardProps {
    slot: AvailableSlot;
}

export default function ServiceCard({ slot }: ServiceCardProps) {
    return (
        <div className="service-card">
            <div className="card-icon"></div>

            <div className="card-info">
                <span><strong>Serviço:</strong> {slot.serviceName}</span>
                <span><strong>Local:</strong> {slot.placeName}</span>
                <span><strong>Prestador:</strong> {slot.workerName}</span>
                <span className="info-hora">
                    <strong>Quando:</strong> {slot.date} às {slot.hour}
                </span>
                <span><strong>Duração:</strong> {slot.duration}</span>
                <span className="info-preco"><strong>Preço:</strong> R$ {slot.price.toFixed(2)}</span>
            </div>

            <div className="card-action">
                <Link 
                    to={`/client/agendar/confirmar/${slot.scheduleId}`}
                    className="btn-reservar">
                    Reservar
                </Link>
            </div>
        </div>
    );
}