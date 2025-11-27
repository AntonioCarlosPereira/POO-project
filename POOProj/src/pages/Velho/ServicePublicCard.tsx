import type { Service } from "../types";
import "./ServicePublicCard.css";

export default function ServiceCard({ img, title, date, place, price, status }: Service) {
  return (
    <div className="service-card">
      <img src={img} className="service-img" />
      <div className="service-info">
        <div className="top-row">
          <h3>{title}</h3>
          <span className={`status ${status}`}>{status}</span>
        </div>
        <div className="bottom-row">
          <div className="left-info">
            <span>{date}</span>
            <span>{place}</span>
          </div>
          <div className="right-info">
            <span className="price">{price}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
