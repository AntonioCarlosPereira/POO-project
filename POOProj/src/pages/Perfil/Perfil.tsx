import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/AppNavbar";
import "./Perfil.css";
import {jwtDecode} from "jwt-decode";

interface UserData {
  email: string;
  id: number,
  usuario: string;
  tipo: string;
}

export default function Perfil() {
  const navigate = useNavigate();
  
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  
  // Dados editáveis
  const [novoUsuario, setNovoUsuario] = useState("");
  const [novoEmail, setNovoEmail] = useState("");
  const [senhaConfirmacao, setSenhaConfirmacao] = useState("");

  useEffect(() => {
    // Busca dados do localStorage
    const token = localStorage.getItem("token");
    if (token) {
      const decode:any = jwtDecode(token);
      console.log(`Aqui:${decode.name}, ${decode.email}`)
      const tokenData: UserData = {
        email: decode.email,
        usuario: decode.name,
        id: decode.id,
        tipo: ""

      }
      setUserData(tokenData)

    } else {
      // Se não houver usuário logado, redireciona para login
      navigate("/login");
    }
  }, [navigate]);

  const handleEditarClick = () => {
    setIsEditing(true);
  };

  const handleCancelar = () => {
    // Restaura valores originais
    if (userData) {
      setNovoUsuario(userData.usuario);
      setNovoEmail(userData.email);
    }
    setSenhaConfirmacao("");
    setIsEditing(false);
  };

  const handleSalvar = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!senhaConfirmacao) {
      alert("Por favor, digite sua senha para confirmar as alterações.");
      return;
    }

    try{
      const newData = {novoUsuario, novoEmail, senhaConfirmacao, userData}
      console.log(newData)
      const res = await fetch("/editPerfil",{
        method: "PATCH",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(newData)
      })
      const data = await res.json()
      if(data.success){
        localStorage.clear()
        setSenhaConfirmacao("");
        setIsEditing(false);
        alert("Perfil atualizado com sucesso! Logue novamente.");
        navigate("/login")

      }
    }
    catch(err){
      console.log(`Erro ${err}`)
    }


  };

  const handleSairDaConta = () => {
    const confirma = window.confirm("Deseja realmente sair da conta?");
    if (confirma) {
      localStorage.removeItem("user");
      navigate("/login");
    }
  };

  if (!userData) {
    return (
      <div>
        <Navbar />
        <div className="perfil-container">
          <p>Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="perfil-container">
        <div className="perfil-box">
          <h1 className="perfil-title">Perfil</h1>

          {!isEditing ? (
            // ===== MODO VISUALIZAÇÃO =====
            <>
              <div className="perfil-info">
                <div className="perfil-field">
                  <label className="perfil-label">Usuário</label>
                  <div className="perfil-value">{userData.usuario}</div>
                </div>

                <div className="perfil-field">
                  <label className="perfil-label">E-mail</label>
                  <div className="perfil-value">{userData.email}</div>
                </div>
              </div>

              <div className="perfil-actions">
                <button 
                  className="btn-editar" 
                  onClick={handleEditarClick}
                >
                  Editar perfil
                </button>

                <button 
                  className="btn-sair" 
                  onClick={handleSairDaConta}
                >
                  Sair da conta
                </button>
              </div>
            </>
          ) : (
            // ===== MODO EDIÇÃO =====
            <form onSubmit={handleSalvar}>
              <div className="perfil-info">
                <div className="perfil-field">
                  <label className="perfil-label">Usuário</label>
                  <input
                    type="text"
                    className="perfil-input"
                    value={novoUsuario}
                    onChange={(e) => setNovoUsuario(e.target.value)}
                    required
                  />
                </div>

                <div className="perfil-field">
                  <label className="perfil-label">E-mail</label>
                  <input
                    type="email"
                    className="perfil-input"
                    value={novoEmail}
                    onChange={(e) => setNovoEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="senha-confirmacao">
                <p className="senha-info">
                  Para confirmar as alterações, digite sua senha atual:
                </p>
                <div className="perfil-field">
                  <label className="perfil-label">Senha</label>
                  <input
                    type="password"
                    className="perfil-input"
                    value={senhaConfirmacao}
                    onChange={(e) => setSenhaConfirmacao(e.target.value)}
                    placeholder="Digite sua senha"
                    required
                  />
                </div>
              </div>

              <div className="perfil-actions">
                <button type="submit" className="btn-salvar">
                  Salvar alterações
                </button>

                <button 
                  type="button"
                  className="btn-cancelar" 
                  onClick={handleCancelar}
                >
                  Cancelar
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
