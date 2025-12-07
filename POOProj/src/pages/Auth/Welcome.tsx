import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Welcome.css";

export default function Welcome() {
  const navigate = useNavigate();
  useEffect(()=>{
    if(localStorage.getItem("token")){
      navigate("/perfil")
    }
  })

  return (
    <div className="welcome-container">
      <div className="welcome-box">
        <h1 className="welcome-title">Bem-vindo!</h1>
        <p className="welcome-subtitle">
          Seu portal de serviços em um só lugar.
        </p>

        <div className="welcome-buttons">
          <button className="btn-laranja" onClick={() => navigate("/login")}>
            Login
          </button>

          <button className="btn-outline" onClick={() => navigate("/register")}>
            Criar Conta
          </button>
        </div>
      </div>
    </div>
  );
}
