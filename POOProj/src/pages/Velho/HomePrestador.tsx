import { Button, Card, Container, Row, Col } from "react-bootstrap";
import "./HomePrestador.css";

function HomePrestador() {
  const notificacoes = [
    { id: 1, horario: "14:00", local: "Centro", preco: "R$ 120", cliente: "João" },
    { id: 2, horario: "16:00", local: "Jardim", preco: "R$ 90", cliente: "Maria" },
    { id: 3, horario: "09:00", local: "Vila", preco: "R$ 150", cliente: "Pedro" }
  ];

  return (
    <div className="home-prestador">
      <Container>
        <div className="text-center mb-4">
          <Button className="botao-principal mb-2">Cadastrar um Serviço</Button>
          <br/>
          <Button className="botao-principal">Gerenciar</Button>
        </div>

        <h5 className="notificacoes-titulo">Notificações</h5>
        <div className="notificacoes-barra mb-3" />

        {notificacoes.map(n => (
          <Card key={n.id} className="mb-3 notificacao-card">
            <Row className="g-2 align-items-center">
              <Col xs={3} sm={2} className="d-flex justify-content-center">
                <div className="notificacao-imagem" />
              </Col>

              <Col xs={6} sm={8}>
                <p className="mb-1"><strong>Horário:</strong> {n.horario}</p>
                <p className="mb-1"><strong>Local:</strong> {n.local}</p>
                <p className="mb-1"><strong>Preço:</strong> {n.preco}</p>
                <p className="mb-0"><strong>Cliente:</strong> {n.cliente}</p>
              </Col>

              <Col xs={3} sm={2} className="d-flex flex-column align-items-end">
                <Button variant="success" size="sm" className="mb-2 btn-aceitar">Aceitar</Button>
                <Button variant="danger" size="sm" className="btn-negar">Negar</Button>
              </Col>
            </Row>
          </Card>
        ))}
      </Container>
    </div>
  );
}

export default HomePrestador;
