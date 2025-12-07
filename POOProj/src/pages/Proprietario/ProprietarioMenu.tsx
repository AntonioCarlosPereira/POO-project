import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/AppNavbar";
import "./ProprietarioMenu.css";
import { json } from "stream/consumers";

interface Estabelecimento {
  id: number;
  nome: string;
  endereco: string;
}

export default function ProprietarioMenu() {
  const navigate = useNavigate();
  const [estabelecimentos, setEstabelecimentos] = useState<Estabelecimento[]>([]);

  useEffect(() => {
    const carregarDados= async()=>{
      let token = localStorage.getItem("token") 
      if(token)
        try{
          const res = await fetch("meusEstabelecimentos",{
            method: "GET",
            headers: {"Content-Type": "application/json",
              "Authorization": `Bearer: ${token}`
            },
          })
          const data = await res.json()
          if(data.success){
            console.log(data.itens)
            const lista = data.itens.map((estData:any)=>({
              id: estData.id,
              nome: estData.name,
              endereco: estData.address
            }))
            setEstabelecimentos(lista)
          }
        }
        catch(err){
          console.log(err)
        }
      else{
        navigate("/login")
      }
    }
    carregarDados()
    
  }, []);

  const handleCriarEstabelecimento = () => {
    alert("Funcionalidade de criar estabelecimento em desenvolvimento");
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