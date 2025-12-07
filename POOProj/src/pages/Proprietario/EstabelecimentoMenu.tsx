import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../Components/AppNavbar";
import "./EstabelecimentoMenu.css";

// ... (Interface Notificacao) ...

// Dados de Mock para simular a busca pelo ID
const mockEstabelecimentos = [
    { id: "1", nome: "Pet Shop Central", notificacoes: [/* dados */] },
    { id: "2", nome: "Clínica Veterinária", notificacoes: [/* dados diferentes */] },
    { id: "3", nome: "Estética Animal Alpha", notificacoes: [/* dados diferentes */] },
];

export default function EstabelecimentoMenu() {
  // O ID vindo do useParams é sempre uma string
  const { id } = useParams<{ id: string }>(); 
  const navigate = useNavigate();
  const [nomeEstabelecimento, setNomeEstabelecimento] = useState("");
  const [notificacoes, setNotificacoes] = useState<any[]>([]); // Usando 'any' temporariamente para simplificar

  useEffect(() => {
    if (!id) return;

    // Lógica CORRIGIDA: Buscar o nome do estabelecimento baseado no ID da URL
    const estabelecimentoEncontrado = mockEstabelecimentos.find(est => est.id === id);

    if (estabelecimentoEncontrado) {
        setNomeEstabelecimento(estabelecimentoEncontrado.nome);
        // Exemplo: Simular notificações diferentes
        if (id === "2") {
             setNotificacoes([{ id: 1, servico: "Vacinação", horario: "10:00", preco: "R$ 120,00", prestador: "Dr. Ana", cliente: "João" }]);
        } else {
             // Notificações padrão para Pet Shop Central e outros
             setNotificacoes(estabelecimentoEncontrado.notificacoes);
        }
    } else {
        setNomeEstabelecimento("Estabelecimento Não Encontrado");
        setNotificacoes([]);
    }

  }, [id]); // Roda sempre que o ID na URL muda

  // ... (handleAccept, handleReject, e o corpo do return permanecem iguais) ...
  // ...
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
        {/* ... restante do código ... */}
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
        {/* ... restante do código ... */}
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