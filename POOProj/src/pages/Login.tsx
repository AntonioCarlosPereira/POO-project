import { Link } from "react-router-dom";
import "./Login.css";

export default function Login() {
  return (
    <div className="overlay">
      <div className="popup">
        <h2 className="title">Login</h2>

        <label className="label">Usuário:</label>
        <input className="input" type="text" />

        <label className="label">Senha:</label>
        <input className="input" type="password" />

        <button className="login-btn">Login</button>

        <Link to="/cadastro" className="register-link">Cadastre-se</Link>

      </div>
    </div>
  );
}
