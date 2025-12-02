import { Routes, Route } from "react-router-dom"; // Removemos o "BrowserRouter as Router"

/* Auth pages */
import Welcome from "./pages/Auth/Welcome";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";

/* Client pages */
import ClienteMenu from "./pages/Cliente/Clientemenu";
import ClientAgendar from "./pages/Cliente/agendar";
import ClientSearchResults from "./pages/Cliente/Resultados";
import ClientHistoric from "./pages/Cliente/Historico";

import Perfil from "./pages/Perfil/Perfil";

import PrestadorMenu from "./pages/Prestador/PrestadorMenu";
import CadastrarServico from "./pages/Prestador/CadastrarServico";
import Gerenciar from "./pages/Prestador/Gerenciar";
import HistoricoPrestador from "./pages/Prestador/HistoricoPrestador";

/* Global components */
import Navbar from "./Components/Navbar";

export default function App() {
  return (
    // REMOVIDO: <Router>
    // O BrowserRouter deve estar APENAS no index.tsx/main.tsx
    <Routes>

      {/* AUTH */}
      <Route path="/" element={<Welcome />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* CLIENTE */}
      {/* ⚠️ NOTA IMPORTANTE SOBRE A NAVBAR: 
        No código que eu te enviei anteriormente, ClientSearchResults JÁ INCLUÍA a Navbar.
        Se você está incluindo a Navbar aqui novamente, ela será renderizada DUAS vezes 
        nessa rota. Recomendo remover a Navbar daqui e garantir que ela esteja apenas
        dentro do componente de página ou em um layout wrapper.
      */}
      <Route
        path="/client/menu"
        element={
          <>
            <ClienteMenu />
          </>
        }
      />

      <Route
        path="/client/agendar"
        element={
          <>
            <ClientAgendar />
          </>
        }
      />

      <Route
        path="/client/results"
        element={
          // Removi a Navbar daqui para evitar duplicação, 
          // já que ClientSearchResults (Resultados) a inclui.
          <ClientSearchResults />
        }
      />

      <Route
        path="/client/historico"
        element={
         <>
          <ClientHistoric />
          </>
        }
      />

      <Route
        path="/perfil"
        element={
          <>
            <Perfil />
          </>
        }
      />

      <Route
        path="/prestador/menu"
        element={
          <>
            <Navbar />
            <PrestadorMenu />
          </>
        }
      />

      <Route
        path="/prestador/cadastrar"
        element={
          <>
            <Navbar />
            <CadastrarServico />
          </>
        }
      />

      <Route
        path="/prestador/gerenciar"
        element={
          <>
            <Navbar />
            <Gerenciar />
          </>
        }
      />

      <Route
        path="/prestador/historico"
        element={
          <>
            <HistoricoPrestador />
          </>
        }
      />




      {/* Caso digite rota inválida */}
      <Route path="*" element={<h2 className="text-center mt-5">404 - Página não encontrada</h2>} />
    </Routes>
    // REMOVIDO: </Router>
  );
}