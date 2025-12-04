import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar";
import "./ProprietarioMenu.css";

interface Estabelecimento {
  id: number;
  nome: string;
  endereco: string;
}

export default function ProprietarioMenu() {
  const navigate = useNavigate();
  const [estabelecimentos, setEstabelecimentos] = useState<Estabelecimento[]>([]);

  useEffect(() => {
    // Aqui futuramente virá a chamada à API
    // Por enquanto, dados mockados para exemplo
    const mockData: Estabelecimento[] = [
      { id: 1, nome: "Pet Shop Central", endereco: "Rua das Flores, 123" },
      { id: 2, nome: "Clínica Veterinária", endereco: "Av. Brasil, 456" },
    ];
    
    setEstabelecimentos(mockData);
  }, []);

  const handleCriarEstabelecimento = () => {
    // Navega para tela de criação (a implementar futuramente)
    alert("Funcionalidade de criar estabelecimento em desenvolvimento");
  };

  const handleGerenciar = (id: number) => {
    navigate(`/proprietario/estabelecimento/${id}`);
  };

  return (
    <>
      <Navbar />
      
      <div className="proprietario-container">
        <h2 className="proprietario-title">Meus Estabelecimentos</h2>

        <button 
          className="btn-criar-estabelecimento"
          onClick={handleCriarEstabelecimento}
        >
          + Criar Estabelecimento
        </button>

        {estabelecimentos.length === 0 ? (
          <div className="empty-state">
            <p>Você ainda não possui estabelecimentos cadastrados.</p>
            <p className="empty-subtitle">Clique no botão acima para criar seu primeiro!</p>
          </div>
        ) : (
          <div className="estabelecimentos-lista">
            {estabelecimentos.map((est) => (
              <div key={est.id} className="estabelecimento-card">
                <div className="estabelecimento-icon"></div>
                
                <div className="estabelecimento-info">
                  <h3>{est.nome}</h3>
                  <p>{est.endereco}</p>
                </div>

                <button 
                  className="btn-gerenciar"
                  onClick={() => handleGerenciar(est.id)}
                >
                  Gerenciar
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
