import React, { useState, useEffect, useCallback } from "react";
import Navbar from '../../Components/AppNavbar'; 
import NotificationCard from "../../Components/NotificationCard";
import "./Gerenciar.css";

interface Agendamento {
  id: number;
  servico: string;
  horario: string;
  local: string;
  cliente: string;
}

// MOCK de dados: simula os agendamentos que viriam do backend já filtrados por "solicitado"
const MOCK_AGENDAMENTOS: Agendamento[] = [
    { id: 1, servico: "Limpeza de Pele", horario: "14:00", local: "Centro", cliente: "João Silva" },
    { id: 2, servico: "Manutenção de Máquina", horario: "09:00", local: "Vila Mariana", cliente: "Maria Souza" },
    { id: 3, servico: "Conserto de Fuga", horario: "11:30", local: "Jardim Paulista", cliente: "Carlos Alberto" },
];

export default function Gerenciar() {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [notificationMessage, setNotificationMessage] = useState<string | null>(null);

  // Função para exibir o pop-up de notificação temporário
  const showNotification = useCallback((msg: string) => {
      setNotificationMessage(msg);
      setTimeout(() => setNotificationMessage(null), 3000);
  }, []);

  // 1. Função de Busca (GET) para agendamentos solicitados
  const fetchPendingServices = useCallback(async () => {
      setIsLoading(true);
      
      // ⚠️ COLOQUE A CHAMADA DA API (GET) PARA BUSCAR SERVIÇOS PENDENTES AQUI
      console.log("CHAMADA API: GET /agendamentos?status=solicitado");

      // SIMULAÇÃO DE RESPOSTA DO BACKEND
      await new Promise(resolve => setTimeout(resolve, 1500)); 
      
      setAgendamentos(MOCK_AGENDAMENTOS);
      setIsLoading(false);
  }, []);

  useEffect(() => {
      fetchPendingServices();
  }, [fetchPendingServices]);

  // 2. Função para atualizar o status (PATCH/PUT)
  const handleUpdateStatus = useCallback(async (id: number, status: 'aceito' | 'recusado') => {
    // Remoção otimista do item na interface
    setAgendamentos(prev => prev.filter(n => n.id !== id));
    
    // ⚠️ COLOQUE A CHAMADA DA API (PATCH/PUT) PARA ATUALIZAR O STATUS AQUI
    console.log(`CHAMADA API: PATCH /agendamentos/${id}, status=${status}`);
    
    // SIMULAÇÃO DE RESPOSTA DO BACKEND
    await new Promise(resolve => setTimeout(resolve, 800));
    
    showNotification(`Serviço ${status === 'aceito' ? 'aceito' : 'rejeitado'} com sucesso!`);
  }, [showNotification]);


  const handleAccept = (id: number) => {
    handleUpdateStatus(id, 'aceito');
  };

  const handleReject = (id: number) => {
    handleUpdateStatus(id, 'recusado');
  };
  
  return (
    <>
      <Navbar />
      
      {/* Notificação Pop-up */}
      {notificationMessage && (
        <div className={`custom-popup-notification ${notificationMessage.includes('rejeitado') ? 'bg-danger' : 'bg-success'}`}>
            {notificationMessage}
        </div>
      )}

      {/* Estrutura de Layout Bootstrap */}
      <div className="gerenciar-container p-4">
        <h2 className="fw-bold mb-5 text-center">Solicitações Recebidas</h2>

        <div className="row justify-content-center">
            <div className="col-lg-8">
                
                {isLoading ? (
                    <div className="text-center text-primary-dark">Carregando solicitações...</div>
                ) : agendamentos.length === 0 ? (
                    <div className="card p-4 shadow-lg text-center">
                        <p className="sem-solicitacoes lead mb-0">Não há agendamentos não respondidos.</p>
                    </div>
                ) : (
                    // Mapeamento dos Cards de Notificação
                    <div className="agendamentos-list">
                        {agendamentos.map((n) => (
                            <div key={n.id} className="mb-3">
                                <NotificationCard
                                    servico={n.servico}
                                    horario={n.horario}
                                    local={n.local}
                                    cliente={n.cliente}
                                    onAccept={() => handleAccept(n.id)}
                                    onReject={() => handleReject(n.id)}
                                />
                            </div>
                        ))}
                    </div>
                )}
                
            </div>
        </div>
      </div>
    </>
  );
}