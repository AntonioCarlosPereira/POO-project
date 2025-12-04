import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar";
import NotificationCard from "../../Components/NotificationCard";
import "./EstabelecimentoMenu.css";

interface Notificacao {
  id: number;
  servico: string;
  horario: string;
  preco: string;
  prestador: string;
  cliente: string;
}

export default function EstabelecimentoMenu() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [nomeEstabelecimento, setNomeEstabelecimento] = useState("");
  const [notificacoes, setNotificacoes] = useState<Notificacao[]>([]);

  useEffect(() => {
    // Aqui virá a chamada à API para buscar dados do estabelecimento
    // Por enquanto, dados mockados
    setNomeEstabelecimento("Pet Shop Central");
    
    const mockNotificacoes: Notificacao[] = [
      {
        id: 1,
        servico: "Banho e Tosa",
        horario: "14:00",
        preco: "R$ 80,00",
        prestador: "João Silva",
        cliente: "Maria Santos"
      },
      {
        id: 2,
        servico: "Consulta Veterinária",
        horario: "16:30",
        preco: "R$ 150,00",
        prestador: "Dr. Pedro Lima",
        cliente: "Carlos Souza"
      }
    ];
    
    setNotificacoes(mockNotificacoes);
  }, [id]);

  const handleAccept = (notifId: number) => {
    setNotificacoes(prev => prev.filter(n => n.id !== notifId));
    alert("Serviço aceito com sucesso!");
  };

  const handleReject = (notifId: number) => {
    setNotificacoes(prev => prev.filter(n => n.id !== notifId));
    alert("Serviço recusado.");
  };

  return (
    <>
      <Navbar />
      
      <div className="estabelecimento-menu-container">
        <h2 className="estabelecimento-nome">{nomeEstabelecimento}</h2>

        <div className="menu-buttons">
          <button 
            className="btn-menu-action"
            onClick={() => navigate(`/proprietario/estabelecimento/${id}/cadastrar`)}
          >
            Cadastrar Serviço
          </button>

          <button 
            className="btn-menu-action btn-secondary"
            onClick={() => navigate(`/proprietario/estabelecimento/${id}/gerenciar`)}
          >
            Gerenciar Serviços
          </button>
        </div>

        <div className="notificacoes-section">
          <h3 className="section-title">Notificações</h3>
          <div className="notificacoes-barra"></div>

          {notificacoes.length === 0 ? (
            <p className="empty-notificacoes">Nenhuma notificação pendente.</p>
          ) : (
            <div className="notificacoes-lista">
              {notificacoes.map((notif) => (
                <div key={notif.id} className="notificacao-wrapper">
                  <div className="notif-card-proprietario">
                    <div className="notif-icon"></div>

                    <div className="notif-info">
                      <span><strong>Serviço:</strong> {notif.servico}</span>
                      <span><strong>Horário:</strong> {notif.horario}</span>
                      <span><strong>Preço:</strong> {notif.preco}</span>
                      <span><strong>Prestador:</strong> {notif.prestador}</span>
                      <span><strong>Cliente:</strong> {notif.cliente}</span>
                    </div>

                    <div className="notif-actions">
                      <button 
                        className="btn-accept" 
                        onClick={() => handleAccept(notif.id)}
                      >
                        ✔
                      </button>
                      <button 
                        className="btn-reject" 
                        onClick={() => handleReject(notif.id)}
                      >
                        ✖
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
