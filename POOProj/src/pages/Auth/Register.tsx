import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const RegisterData = { email, password, name };

    try {
      const res = await fetch("http://localhost:3001/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(RegisterData)
      });
      
      const data = await res.json();

      if (res.ok) {
        navigate("/login");
      } else {
        console.error("Erro no registro:", data.error || data.message);
        alert(data.error || "Erro ao tentar registrar.");
      }
    } catch(err) {
      console.error("Erro ao conectar ou processar o registro.", err);
      alert("Não foi possível conectar ao servidor.");
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
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)} 
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
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} 
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