import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../Components/Navbar";
import "./GerenciarProprietario.css";

interface Servico {
  id: number;
  servico: string;
  horario: string;
  preco: string;
  prestador: string;
  estado: string;
}

export default function GerenciarProprietario() {
  const { id } = useParams();
  const [servicos, setServicos] = useState<Servico[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    // Carrega serviços iniciais
    loadServicos();
  }, []);

  useEffect(() => {
    // Infinite scroll
    const handleScroll = () => {
      if (!hasMore || loading) return;

      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 200
      ) {
        loadServicos();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, loading]);

  const loadServicos = () => {
    if (loading) return;

    setLoading(true);

    // Simula chamada à API
    setTimeout(() => {
      const novosServicos: Servico[] = Array.from({ length: 5 }).map((_, i) => ({
        id: Date.now() + i,
        servico: "Banho e Tosa",
        horario: "2025-01-15 14:00",
        preco: "R$ 80,00",
        prestador: "João Silva",
        estado: i % 3 === 0 ? "Concluído" : i % 3 === 1 ? "Agendado" : "Cancelado"
      }));

      setServicos(prev => [...prev, ...novosServicos]);
      setLoading(false);

      // Simula fim dos dados após 20 itens
      if (servicos.length >= 20) {
        setHasMore(false);
      }
    }, 1000);
  };

  const getEstadoClass = (estado: string) => {
    switch (estado) {
      case "Concluído":
        return "estado-concluido";
      case "Agendado":
        return "estado-agendado";
      case "Cancelado":
        return "estado-cancelado";
      default:
        return "";
    }
  };

  return (
    <>
      <Navbar />
      
      <div className="gerenciar-prop-container">
        <h2 className="gerenciar-title">Gerenciar Serviços</h2>

        {servicos.length === 0 && !loading ? (
          <p className="empty-servicos">Nenhum serviço cadastrado ainda.</p>
        ) : (
          <div className="servicos-lista">
            {servicos.map((serv) => (
              <div key={serv.id} className="servico-card">
                <div className="servico-icon"></div>

                <div className="servico-info">
                  <h4>{serv.servico}</h4>
                  <p><strong>Horário:</strong> {serv.horario}</p>
                  <p><strong>Preço:</strong> {serv.preco}</p>
                  <p><strong>Prestador:</strong> {serv.prestador}</p>
                </div>

                <div className={`servico-estado ${getEstadoClass(serv.estado)}`}>
                  {serv.estado}
                </div>
              </div>
            ))}
          </div>
        )}

        {loading && (
          <div className="loading-indicator">
            <div className="spinner"></div>
            <p>Carregando mais serviços...</p>
          </div>
        )}

        {!hasMore && servicos.length > 0 && (
          <p className="end-message">Não há mais serviços para carregar.</p>
        )}
      </div>
    </>
  );
}
