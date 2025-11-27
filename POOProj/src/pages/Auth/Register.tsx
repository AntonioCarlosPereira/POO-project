import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./register.css";

export default function Register() {
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [tipo, setTipo] = useState("cliente");

  const handleRegister = (e) => {
    e.preventDefault();

    // Aqui futuramente vai a lógica do backend
    console.log({
      nome,
      email,
      senha,
      tipo,
    });

    navigate("/login");
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h1 className="register-title">Criar Conta</h1>

        <form onSubmit={handleRegister} className="register-form">

          <label className="register-label">Nome</label>
          <input
            type="text"
            className="register-input"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />

          <label className="register-label">E-mail</label>
          <input
            type="email"
            className="register-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label className="register-label">Senha</label>
          <input
            type="password"
            className="register-input"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />

          <label className="register-label">Tipo de Conta</label>
          <select
            className="register-input"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
          >
            <option value="cliente">Cliente</option>
            <option value="prestador">Prestador de Serviço</option>
            <option value="proprietario">Proprietário</option>
          </select>

          <button type="submit" className="btn-laranja register-btn">
            Registrar
          </button>
        </form>

        <p className="register-footer">
          Já tem uma conta?
          <span className="register-link" onClick={() => navigate("/login")}>
            Entrar
          </span>
        </p>
      </div>
    </div>
  );
}
