import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/AppNavbar";
import "./criar_estabelecimento_css.css";

export default function CriarEstabelecimento() {
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [endereco, setEndereco] = useState("");
  const [telefone, setTelefone] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categoria, setCategoria] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Aqui virá a chamada à API para criar o estabelecimento
    console.log({
      nome,
      endereco,
      telefone,
      descricao,
      categoria
    });

    alert("Estabelecimento criado com sucesso!");
    navigate("/proprietario/menu");
  };

  return (
    <>
      <Navbar />
      
      <div className="criar-estabelecimento-container">
        <h2 className="criar-estabelecimento-title">Criar Estabelecimento</h2>

        <form className="criar-estabelecimento-form" onSubmit={handleSubmit}>
          
          <div className="form-group">
            <label className="form-label">Nome do Estabelecimento *</label>
            <input
              type="text"
              className="form-input"
              placeholder="Ex: Pet Shop Central"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Categoria *</label>
            <select
              className="form-input"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              required
            >
              <option value="">Selecione uma categoria</option>
              <option value="petshop">Pet Shop</option>
              <option value="veterinaria">Clínica Veterinária</option>
              <option value="salao">Salão de Beleza</option>
              <option value="academia">Academia</option>
              <option value="restaurante">Restaurante</option>
              <option value="oficina">Oficina Mecânica</option>
              <option value="outros">Outros</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Endereço *</label>
            <input
              type="text"
              className="form-input"
              placeholder="Rua, número, bairro, cidade"
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Telefone *</label>
            <input
              type="tel"
              className="form-input"
              placeholder="(00) 00000-0000"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Descrição (opcional)</label>
            <textarea
              className="form-textarea"
              placeholder="Descreva seu estabelecimento..."
              rows={4}
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-criar">
              Criar Estabelecimento
            </button>

            <button 
              type="button" 
              className="btn-cancelar"
              onClick={() => navigate("/proprietario/menu")}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </>
  );
}