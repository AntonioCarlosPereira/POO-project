import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/AppNavbar";
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
    // Dados mockados
    const mockData: Estabelecimento[] = [
      { id: 1, nome: "Pet Shop Central", endereco: "Rua das Flores, 123" },
      { id: 2, nome: "Clínica Veterinária", endereco: "Av. Brasil, 456" },
      { id: 3, nome: "Estética Animal Alpha", endereco: "Rua da Paz, 789" }, // Adicionado mais um para teste
    ];
    
    setEstabelecimentos(mockData);
  }, []);

  const handleCriarEstabelecimento = () => {// Verifique no console do navegador se o ID está correto
    console.log(`Navegando para a tela de criar estabelecimento`);
    
    // A rota correta é /proprietario/estabelecimento/:id
    navigate(`/proprietario/estabelecimento/novo`);
  };

  const handleGerenciar = (id: number) => {
    // Verifique no console do navegador se o ID está correto
    console.log(`Navegando para o estabelecimento com ID: ${id}`);
    
    // A rota correta é /proprietario/estabelecimento/:id
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