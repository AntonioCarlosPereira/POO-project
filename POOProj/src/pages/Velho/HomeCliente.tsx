import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import "./HomeCliente.css";

export default function HomeCliente() {
  return (
    <>
      {/* Navbar */}
      <Navbar bg="light" expand="lg" className="shadow-sm">
        <Container>
          <Navbar.Brand as={Link} to="/">
            Sistema
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">

              <Nav.Link as={Link} to="/cliente">Cliente</Nav.Link>
              <Nav.Link as={Link} to="/prestador">Prestador</Nav.Link>
              <Nav.Link as={Link} to="/proprietario">Proprietário</Nav.Link>
              <Nav.Link as={Link} to="/perfil">Perfil</Nav.Link>

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Conteúdo principal */}
      <div className="home-container">
        <div className="button-group">
          <Link to="/perfil" className="menu-button">Perfil</Link>
          <button className="menu-button">Agendar</button>
          <button className="menu-button">Histórico</button>
        </div>
      </div>
    </>
  );
}
