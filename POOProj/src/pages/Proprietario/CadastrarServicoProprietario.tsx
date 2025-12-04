import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar";
import "./CadastrarServicoProprietario.css";

export default function CadastrarServicoProprietario() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [servico, setServico] = useState("");
  const [dataHora, setDataHora] = useState("");
  const [prestador, setPrestador] = useState("");
  const [preco, setPreco] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Aqui virá a chamada à API para cadastrar o serviço
    console.log({
      estabelecimentoId: id,
      servico,
      dataHora,
      prestador,
      preco
    });

    alert("Serviço cadastrado com sucesso!");
    navigate(`/proprietario/estabelecimento/${id}`);
  };

  return (
    <>
      <Navbar />
      
      <div className="cadastrar-servico-prop-container">
        <h2 className="cadastrar-title">Cadastrar Serviço</h2>

        <form className="cadastrar-form" onSubmit={handleSubmit}>
          
          <div className="form-group">
            <label className="form-label">Serviço *</label>
            <input
              type="text"
              className="form-input"
              placeholder="Ex: Banho e Tosa"
              value={servico}
              onChange={(e) => setServico(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Data e Hora *</label>
            <input
              type="datetime-local"
              className="form-input"
              value={dataHora}
              onChange={(e) => setDataHora(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Prestador de Serviço *</label>
            <input
              type="text"
              className="form-input"
              placeholder="Nome do prestador"
              value={prestador}
              onChange={(e) => setPrestador(e.target.value)}
              required
            />
            <small className="form-hint">
              Futuramente será um seletor de prestadores cadastrados
            </small>
          </div>

          <div className="form-group">
            <label className="form-label">Preço *</label>
            <input
              type="text"
              className="form-input"
              placeholder="R$ 0,00"
              value={preco}
              onChange={(e) => setPreco(e.target.value)}
              required
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-salvar">
              Cadastrar Serviço
            </button>

            <button 
              type="button" 
              className="btn-cancelar"
              onClick={() => navigate(`/proprietario/estabelecimento/${id}`)}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
