import ServiceCard from "./ServicePublicCard"
import type { Service } from "../types"
import "./ServicePublicPage.css"

export default function ServicePublicPage() {
  const services: Service[] = [
    {
      id: "1",
      img: "",
      title: "Limpeza Residencial",
      date: "27/11/2025 - 14:00",
      place: "Floradas de São José - SJC",
      price: "R$ 150,00",
      status: "Disponível"
    },
    {
      id: "2",
      img: "/",
      title: "Passeio com Cachorro",
      date: "28/11/2025 - 09:30",
      place: "PetLove - Jardim São Dimas - SJC",
      price: "R$ 40,00",
      status: "Em Progresso"
    },
    {
      id: "3",
      img: "",
      title: "Conserto de Encanamento",
      date: "29/11/2025 - 16:00",
      place: "Alvitek - Jardim das Indústrias - SJC",
      price: "R$ 200,00",
      status: "Pendente"
    },
    {
      id: "4",
      img: "",
      title: "Cozinhar Marmitas",
      date: "30/11/2025 - 11:00",
      place: "Demoiselle Pizzaria - Jardim Satélite - SJC",
      price: "R$ 120,00",
      status: "Finalizado"
    }
  ]

  return (
    <div className="page">
      <div className="sidebar">
        <div>C</div>
        <div>S</div>
        <div>P</div>
        <div>P</div>
      </div>

      <div className="content">
        <button className="big-btn">Cadastrar um Serviço</button>
        <button className="big-btn">Gerenciar</button>

        <div className="section-title">Notificações</div>

        <div className="list">
          {services.map(s => (
            <ServiceCard key={s.id} {...s} />
          ))}
        </div>
      </div>
    </div>
  )
}
