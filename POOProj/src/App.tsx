import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Cadastro from "./pages/cadastro";
import HomeCliente from "./pages/HomeCliente";
import ServicePublicPage  from "./pages/ServicePublicPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/home-cliente" element={<HomeCliente />} />
      <Route path="/service-public-page" element={<ServicePublicPage />} />
    </Routes>
  );
}

export default App;
