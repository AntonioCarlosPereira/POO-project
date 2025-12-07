import { useState, useEffect, useMemo } from "react";
import Navbar from "../../Components/AppNavbar";
import "./Historico.css";

interface ScheduleItem {
  id: number;
  prestador: string;
  categoria: string;
  data: string;
  // NOVOS STATUS
  status: 'Solicitado' | 'Aceito' | 'Recusado' | 'Concluído'; 
}

// NOVO ARRAY DE STATUS
const ALL_STATUSES = ['Todos', 'Solicitado', 'Aceito', 'Recusado', 'Concluído'] as const;

// Dados mockados atualizados para usar os novos status
const MOCK_APPOINTMENTS: ScheduleItem[] = [
    {
        id: 1,
        prestador: "João Mecânico",
        categoria: "Revisão de Carro",
        data: "10/12/2025 (14:00h)",
        status: "Aceito", 
    },
    {
        id: 2,
        prestador: "Lucas Eletricista",
        categoria: "Troca de Fiação",
        data: "02/11/2025 (10:30h)",
        status: "Solicitado", 
    },
    {
        id: 3,
        prestador: "Marcos Pintor",
        categoria: "Pintura Interna",
        data: "15/08/2024 (09:00h)",
        status: "Concluído",
    },
    {
        id: 4,
        prestador: "Ana Cabeleireira",
        categoria: "Corte e Química",
        data: "20/07/2024 (17:00h)",
        status: "Recusado", 
    },
    {
        id: 5,
        prestador: "Dra. Maria",
        categoria: "Consulta Odontológica",
        data: "25/12/2025 (11:00h)",
        status: "Aceito",
    },
];

export default function ClientSchedules() {
  const [schedules, setSchedules] = useState<ScheduleItem[]>([]);
  // Estado inicial ajustado para um dos novos status
  const [currentFilter, setCurrentFilter] = useState<typeof ALL_STATUSES[number]>('Aceito'); 

  useEffect(() => {
    setSchedules(MOCK_APPOINTMENTS);
  }, []);

  const filteredSchedules = useMemo(() => {
    if (currentFilter === 'Todos') {
      return schedules;
    }
    return schedules.filter(item => item.status === currentFilter);
  }, [schedules, currentFilter]);
  
  const emptyMessage = `Você não possui agendamentos com status "${currentFilter.toLowerCase()}".`;

  return (
    <>
      <Navbar />
      <div className="appointments-container">
        <h2>Meus Agendamentos</h2>

        <div className="status-filter-nav">
          {ALL_STATUSES.map(status => (
            <button
              key={status}
              className={currentFilter === status ? 'active' : ''}
              onClick={() => setCurrentFilter(status)}
            >
              {status}
            </button>
          ))}
        </div>

        {filteredSchedules.length === 0 ? (
          <p className="empty-message">{emptyMessage}</p>
        ) : (
          <div className="historic-list">
            {filteredSchedules.map((item) => (
              <div key={item.id} className="historic-card">
                <div className="historic-info">
                  <h3>{item.categoria}</h3>
                  <p><strong>Prestador:</strong> {item.prestador}</p>
                  <p><strong>Data:</strong> {item.data}</p>
                </div>
                <p className={`status ${item.status.toLowerCase()}`}>
                    {item.status}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}