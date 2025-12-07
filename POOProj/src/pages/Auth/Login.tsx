import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setSenha] = useState("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Aqui você vai substituir pela lógica do seu backend
    const loginData = {email, password: password}
    
    try{
      const res = await fetch("/login", {
      method: "POST",
      headers:{"Content-Type": "application/json"},
      body: JSON.stringify(loginData),
      })
      const data = await res.json()
      if(data.success){
        localStorage.setItem("token", data.token)
        localStorage.setItem("userId", data.userId)      
        navigate("/client/menu");
      }

    }
    catch(err){
      console.error("Erro ao fazer login.")
    }

    // Exemplo de redirecionamento:
    
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">Login</h1>

        <form onSubmit={handleLogin} className="login-form">

          <label className="login-label">E-mail</label>
          <input
            type="email"
            className="login-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label className="login-label">Senha</label>
          <input
            type="password"
            className="login-input"
            value={password}
            onChange={(e) => setSenha(e.target.value)}
            required
          />

          <button type="submit" className="btn-laranja login-btn">
            Entrar
          </button>
        </form>

        <p className="login-footer">
          Não tem uma conta?
          <span className="login-link" onClick={() => navigate("/register")}>
            Criar conta
          </span>
        </p>
      </div>
    </div>
  );
}
