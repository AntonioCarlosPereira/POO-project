import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Cadastro from "./pages/cadastro";
import HomeCliente from "./pages/HomeCliente";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/home-cliente" element={<HomeCliente />} />
    </Routes>
  );
}

export default App;
