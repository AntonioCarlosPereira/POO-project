import Home from "./pages/Home";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <Home />   {/* fundo fixo */}
      <Outlet /> {/* aqui aparecem pop-ups como login */}
    </>
  );
}
