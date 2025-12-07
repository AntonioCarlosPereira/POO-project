import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Welcome.css";
import { verify } from "crypto";

export default function Welcome() {
  const navigate = useNavigate();
  useEffect(()=>{
  
      const token = localStorage.getItem("token")
      if(token){
        (async()=>{
          
          try{
            const res = await fetch("/tokenVerification", {
              method: "POST",
              headers: {"Content-Type": "application/json",
                "Authorization": `Bearer: ${token}`
              }
            })
            const data = await res.json()
            if(data.success){
              navigate("/client/menu")
            }
          }
          catch(err){
            console.log(err)
          }
        })();
        
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
