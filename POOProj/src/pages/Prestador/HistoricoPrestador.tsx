import React, { useState, useEffect, useMemo, useCallback } from "react";
import HistoryItemCard from "../../Components/HistoryItemCard"; 
import Navbar from "../../Components/AppNavbar";
import "./HistoricoPrestador.css";

// Interface e dados mockados (MOCK_HISTORY e ALL_STATUSES permanecem)
interface ServiceHistoryItem {
  id: number;
  servico: string;
  cliente: string;
  data: string;
  local: string;
  preco: string;
  status: 'Solicitado' | 'Aceito' | 'Recusado' | 'Concluído'; 
}

const ALL_STATUSES = ['Todos', 'Solicitado', 'Aceito', 'Recusado', 'Concluído'] as const;

// Dados mockados representando o histórico completo do prestador
const MOCK_HISTORY: ServiceHistoryItem[] = [
    { id: 101, servico: "Banho e Tosa", cliente: "Ana Carolina", data: "10/02/2025 (14:00h)", local: "Rua das Flores, 123", preco: "R$ 60,00", status: "Concluído" },
    { id: 102, servico: "Passeio", cliente: "Roberto Silva", data: "08/02/2025 (09:00h)", local: "Parque Central", preco: "R$ 30,00", status: "Recusado" },
    { id: 103, servico: "Adestramento", cliente: "Patrícia Lopes", data: "05/02/2025 (16:00h)", local: "Av. Brasil, 999", preco: "R$ 120,00", status: "Concluído" },
    { id: 104, servico: "Limpeza de Pele", cliente: "João Mendes", data: "20/07/2024 (17:00h)", local: "Pet Shop Central", preco: "R$ 80,00", status: "Solicitado" },
    { id: 105, servico: "Manutenção", cliente: "Fernanda Costa", data: "25/12/2025 (11:00h)", local: "Oficina do Zé", preco: "R$ 200,00", status: "Aceito" },
    { id: 106, servico: "Ajuste de Cama", cliente: "Leo", data: "25/01/2025 (11:00h)", local: "Casa do Leo", preco: "R$ 10,00", status: "Aceito" },
    { id: 107, servico: "Instalação de Tomada", cliente: "Maria", data: "25/01/2025 (11:00h)", local: "Casa da Maria", preco: "R$ 50,00", status: "Solicitado" },
];


export default function HistoricoPrestador() {
  const [history, setHistory] = useState<ServiceHistoryItem[]>([]);
  const [currentFilter, setCurrentFilter] = useState<typeof ALL_STATUSES[number]>('Todos'); 
  const [isLoading, setIsLoading] = useState(true);

  // 1. Função para buscar histórico baseada no status
  const fetchHistory = useCallback(async (status: typeof ALL_STATUSES[number]) => {
    setIsLoading(true);
    let endpoint = "/historico/prestador";
    
    // Determina o parâmetro de filtro para a API
    const filterParam = status === 'Todos' ? '' : `?status=${status.toLowerCase()}`;
    endpoint += filterParam;

    // 🔥 COLOQUE A CHAMADA DA API (GET) REAL AQUI
    console.log(`CHAMADA API: GET ${endpoint}`);

    // --- SIMULAÇÃO DA RESPOSTA DA API ---
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Na vida real, você usaria: const response = await fetch(endpoint);
    // Para simular, filtramos localmente o MOCK_HISTORY, como se o backend tivesse feito isso.
    const mockFilteredData = status === 'Todos' 
        ? MOCK_HISTORY 
        : MOCK_HISTORY.filter(item => item.status === status);

    setHistory(mockFilteredData);
    // ------------------------------------
    
    setIsLoading(false);
  }, []);

  // 2. useEffect para disparar a busca sempre que o filtro muda
  useEffect(() => {
    fetchHistory(currentFilter);
  }, [fetchHistory, currentFilter]); // Depende da função e do filtro

  // A mensagem de vazio agora não precisa mais de useMemo
  const emptyMessage = `Você não possui serviços com status "${currentFilter.toLowerCase()}".`;

  return (
    <>
      <Navbar />
      
      <div className="prestador-historico-container">
        <h2 className="title">Histórico de Serviços</h2>

        {/* Barra de Filtros de Status */}
        <div className="status-filter-nav">
          {ALL_STATUSES.map(status => (
            <button
              key={status}
              className={currentFilter === status ? 'active' : ''}
              // Ao clicar, apenas atualiza o estado, o useEffect faz a requisição
              onClick={() => setCurrentFilter(status)}
            >
              {status}
            </button>
          ))}
        </div>
        
        <hr className="filter-separator" />
        
        <div className="list-content-wrapper">
            {isLoading ? (
                <p className="empty-message">Carregando histórico...</p>
            ) : history.length === 0 ? (
                <p className="empty-message">{emptyMessage}</p>
            ) : (
                <div className="historic-list">
                    {history.map((item) => (
                        <HistoryItemCard
                          key={item.id}
                          servico={item.servico}
                          cliente={item.cliente}
                          data={item.data} 
                          local={item.local}
                          preco={item.preco}
                          status={item.status} 
                        />
                    ))}
                </div>
            )}
        </div>
      </div>
    </>
  );
}