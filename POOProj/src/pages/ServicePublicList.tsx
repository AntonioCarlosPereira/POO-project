import type { Service } from "../types";
import ServiceCard from "./ServicePublicCard";
import "./ServicePublicList.css";

type Props = {
  services: Service[];
};

export default function ServicePublicList({ services }: Props) {
  return (
    <div className="service-list">
      {services.map(s => (
        <ServiceCard key={s.id} {...s} />
      ))}
    </div>
  );
}
