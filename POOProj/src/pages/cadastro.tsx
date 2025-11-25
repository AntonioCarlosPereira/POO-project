import "./cadastro.css";
import { Link } from "react-router-dom";

export default function Cadastro() {
  return (
    <div className="popup-overlay">
      <div className="popup-box">
        <h2>Cadastro</h2>

        <label>Usuario:</label>
        <input type="text" />

        <label>Senha:</label>
        <input type="password" />

        <label>Email:</label>
        <input type="email" />

        <label>Tipo da Conta:</label>
        <div className="radio-group">
          <label><input type="radio" name="tipo" /> Cliente</label>
          <label><input type="radio" name="tipo" /> Prestador de Serviço</label>
          <label><input type="radio" name="tipo" /> Proprietario</label>
        </div>

        <button className="submit-btn">Finalizar Cadastro</button>

        <Link to="/" className="close-link">Fechar</Link>
      </div>
    </div>
  );
}
