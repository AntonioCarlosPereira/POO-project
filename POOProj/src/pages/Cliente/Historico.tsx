import { useState, useEffect } from "react";
import Navbar from "../../Components/AppNavbar";
import "./Historico.css";

interface HistoricItem {
  id: number;
  prestador: string;
  categoria: string;
  data: string;
  status: string;
}

export default function ClientHistoric() {
  const [historic, setHistoric] = useState<HistoricItem[]>([]);

  useEffect(() => {
    // Aqui iria sua chamada de API real futuramente
    const mockData: HistoricItem[] = [
      {
        id: 1,
        prestador: "João Mecânico",
        categoria: "Revisão de Carro",
        data: "10/10/2024",
        status: "Concluído",
      },
      {
        id: 2,
        prestador: "Lucas Eletricista",
        categoria: "Troca de Fiação",
        data: "02/09/2024",
        status: "Cancelado",
      },
      {
        id: 3,
        prestador: "Marcos Pintor",
        categoria: "Pintura Interna",
        data: "15/08/2024",
        status: "Concluído",
      },
    ];

    setHistoric(mockData);
  }, []);

  return (
    <>
      <Navbar />
      <div className="historic-container">
        <h2>Histórico de Serviços</h2>

        {historic.length === 0 ? (
          <p className="empty-message">Você ainda não possui serviços realizados.</p>
        ) : (
          <div className="historic-list">
            {historic.map((item) => (
              <div key={item.id} className="historic-card">
                <div className="historic-info">
                  <h3>{item.categoria}</h3>
                  <p><strong>Prestador:</strong> {item.prestador}</p>
                  <p><strong>Data:</strong> {item.data}</p>
                  <p className={`status ${item.status.toLowerCase()}`}>
                    {item.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
