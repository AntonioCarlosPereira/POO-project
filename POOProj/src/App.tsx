import { Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import Welcome from "./pages/Auth/Welcome";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";


import Perfil from "./pages/Perfil/Perfil";

import ClientAgendar from "./pages/Cliente/agendar";
import ClientHistoric from "./pages/Cliente/Historico";


import PrestadorMenu from "./pages/Prestador/PrestadorMenu";
import CadastrarServico from "./pages/Prestador/CadastrarServico";
import Gerenciar from "./pages/Prestador/Gerenciar";
import HistoricoPrestador from "./pages/Prestador/HistoricoPrestador";

import ProprietarioMenu from "./pages/Proprietario/ProprietarioMenu"
import GerenciarProprietario from "./pages/Proprietario/GerenciarProprietario"
import EstabelecimentoMenu from "./pages/Proprietario/EstabelecimentoMenu"
import CadastrarServicoProprietario from "./pages/Proprietario/CadastrarServicoProprietario"

export default function App() {
  return (
    <Routes>

      <Route path="/" element={<Welcome />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/client/agendar"
        element={
          <>
            <ClientAgendar />
          </>
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
            <PrestadorMenu />
          </>
        }
      />

      <Route
        path="/prestador/cadastrar"
        element={
          <>
            <CadastrarServico />
          </>
        }
      />

      <Route
        path="/prestador/gerenciar"
        element={
          <>
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

      {/* ROTAS DO PROPRIETÁRIO CORRIGIDAS */}

      <Route
        path="/proprietario" 
        element={
          <>
            <ProprietarioMenu />
          </>
        }
      />

      {/* Rota para o Menu Específico de um Estabelecimento (ex: /proprietario/estabelecimento/1) */}
      <Route
        path="/proprietario/estabelecimento/:id"
        element={
          <>
            <EstabelecimentoMenu />
          </>
        }
      />

      {/* Rota para Gerenciar Serviços de um Estabelecimento (ex: /proprietario/estabelecimento/1/gerenciar) */}
      <Route
        path="/proprietario/estabelecimento/:id/gerenciar"
        element={
          <>
            <GerenciarProprietario />
          </>
        }
      />

      {/* Rota para Cadastrar Serviço em um Estabelecimento (ex: /proprietario/estabelecimento/1/cadastrar) */}
      <Route
        path="/proprietario/estabelecimento/:id/cadastrar"
        element={
          <>
            <CadastrarServicoProprietario />
          </>
        }
      />

      <Route path="*" element={<h2 className="text-center mt-5">404 - Página não encontrada</h2>} />
    </Routes>
  );
}