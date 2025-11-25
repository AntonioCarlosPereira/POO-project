import { Link } from "react-router-dom";
import "./Home.css"; // opcional, só se estiver usando CSS separado

export default function Home() {
  return (
    <div className="home-container">
      <h1 className="title">Bem Vindo</h1>
      <Link to="/login" className="login-button">Login</Link>
    </div>
  );
}
