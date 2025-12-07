import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import { json } from "stream/consumers";

export default function Register() {
  const navigate = useNavigate();

  const [name, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setSenha] = useState("");
  const [tipo, setTipo] = useState("cliente");
  const RegisterData = {email, password, name};

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/register", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(RegisterData)
      })
      const data = await res.json()
      if(data.success){
        navigate("/login");
      }
    }
    catch(err){
      console.error("Erro ao fazer cadastro.")
    }

    
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
            value={name}
            onChange={(e) => setNome(e.target.value)}
            required
          />

          <label className="register-label">E-mail</label>
          <input
            type="email"
            className="register-input"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            required
          />

          <label className="register-label">Senha</label>
          <input
            type="password"
            className="register-input"
            value={password}
            onChange={(e) => setSenha(e.target.value)}
            required
          />

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