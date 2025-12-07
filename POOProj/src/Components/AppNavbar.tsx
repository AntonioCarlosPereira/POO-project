import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

export default function AppNavbar() {
    const navigate = useNavigate();
    
    const isLoggedIn = true; 

    const handleLogout = () => {
        const confirma = window.confirm("Deseja realmente sair da conta?");
        if (confirma) {
            localStorage.removeItem("user");
            navigate("/"); 
        }
    };

    return (
        <Navbar expand="lg" bg="dark" data-bs-theme="dark" className="px-3">
                <Navbar.Brand as={Link} to="/">Serviços +</Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                <Navbar.Collapse id="basic-navbar-nav">
                    
                    <Nav className="me-auto">
                        
                        <NavDropdown title="Agendamentos" id="agendamentos-nav-dropdown">
                            <NavDropdown.Item as={Link} to="/client/agendar">
                                Agendar serviço
                            </NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/client/historico">
                                Meus agendamentos
                            </NavDropdown.Item>
                        </NavDropdown>

                        <NavDropdown title="Serviços" id="servicos-nav-dropdown">
                            <NavDropdown.Item as={Link} to="/prestador/cadastrar">
                                Cadastrar serviço
                            </NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/prestador/gerenciar">
                                Gerenciar notificações
                            </NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/prestador/historico">
                                Histórico
                            </NavDropdown.Item>
                        </NavDropdown>

                        <Nav.Link as={Link} to="/proprietario">Estabelecimentos</Nav.Link>
                        
                    </Nav>

                    <Nav className="d-flex align-items-center">
                        {isLoggedIn ? ( 
                            <NavDropdown 
                                title="Perfil" 
                                id="perfil-nav-dropdown"
                                align="end"
                            >
                                <NavDropdown.Item as={Link} to="/perfil">
                                    Ver perfil
                                </NavDropdown.Item>

                                <NavDropdown.Item onClick={handleLogout}>
                                    Sair da conta
                                </NavDropdown.Item>
                            </NavDropdown>
                        ) : (
                            <Nav.Link as={Link} to="/login">Entrar</Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
        </Navbar>
    );
}