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
            <Navbar />
            <ClienteMenu />
          </>
        }
      />

      <Route
        path="/client/agendar"
        element={
          <>
            <Navbar />
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
       <Navbar />
       <ClientHistoric />
     </>
       }
      />  


      {/* Caso digite rota inválida */}
      <Route path="*" element={<h2 className="text-center mt-5">404 - Página não encontrada</h2>} />
    </Routes>
    // REMOVIDO: </Router>
  );
}