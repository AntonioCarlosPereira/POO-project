import { Link } from "react-router-dom";
import "./Cadastro.css";

export default function Cadastro() {
  return (
    <div className="cadastro-container">
      <div className="cadastro-card">
        <h2>Cadastro</h2>

        <label>Usuário:</label>
        <input type="text" />

        <label>Senha:</label>
        <input type="password" />

        <label>Email:</label>
        <input type="email" />

        <label>Tipo da Conta:</label>
        <div className="radio-group">
          <label><input type="radio" name="tipo" /> Cliente</label>
          <label><input type="radio" name="tipo" /> Prestador de Serviço</label>
          <label><input type="radio" name="tipo" /> Proprietário</label>
        </div>

        <button className="submit-btn">Finalizar Cadastro</button>

        <Link to="/" className="voltar-link">Voltar</Link>
      </div>
    </div>
  );
}
