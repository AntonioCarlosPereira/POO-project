export type Service = {
  id: string;
  img: string;
  title: string;
  date: string;
  place: string;
  price: string;
  status: "Finalizado" | "Em Progresso" | "Pendente" | "Cancelado" | "Disponível";
};