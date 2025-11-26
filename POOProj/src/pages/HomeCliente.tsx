import { Link } from "react-router-dom";
import "./HomeCliente.css"; // Vamos criar o CSS para esta tela

export default function HomeCliente() {
  return (
    <div className="home-container">
      {/* Barra lateral para as iniciais (C, S, P) - Como na imagem */}
      <div className="sidebar">
        <span className="sidebar-initial active">C</span>
        <span className="sidebar-initial">S</span>
        <span className="sidebar-initial">P</span>
        <span className="sidebar-initial">P</span>
      </div>

      {/* Conteúdo principal com os botões */}
      <div className="main-content">
        <div className="button-group">
          {/* Botão "Perfil" - Link para a página de perfil */}
          <Link to="/perfil" className="menu-button">
            Perfil
          </Link>

          {/* Botão "Agendar" - Ação futura */}
          <button className="menu-button">
            Agendar
          </button>

          {/* Botão "Histórico" - Ação futura */}
          <button className="menu-button">
            Histórico
          </button>
        </div>
      </div>
    </div>
  );
}