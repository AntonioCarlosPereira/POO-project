import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar";
import "./Perfil.css";

interface UserData {
  email: string;
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
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserData(user);
      setNovoUsuario(user.usuario || "");
      setNovoEmail(user.email || "");
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

  const handleSalvar = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!senhaConfirmacao) {
      alert("Por favor, digite sua senha para confirmar as alterações.");
      return;
    }

    // Aqui você fará a validação com o backend
    // Por enquanto, apenas simula a atualização
    console.log("Novos dados:", {
      usuario: novoUsuario,
      email: novoEmail,
      senha: senhaConfirmacao
    });

    // Atualiza o localStorage (substituir por chamada ao backend)
    const updatedUser = {
      ...userData,
      usuario: novoUsuario,
      email: novoEmail
    };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUserData(updatedUser);

    // Limpa senha e sai do modo edição
    setSenhaConfirmacao("");
    setIsEditing(false);
    alert("Perfil atualizado com sucesso!");
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
