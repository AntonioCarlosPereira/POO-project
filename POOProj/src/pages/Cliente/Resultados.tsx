import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar";
import ServiceCard from "../../Components/ServiceCard";
import "./Resultados.css";

export default function Resultados() {
  const [services, setServices] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Simulação de API
  useEffect(() => {
    const load = async () => {
      const newItems = Array.from({ length: 5 }).map((_, i) => ({
        id: page + "-" + i,
        servico: "Serviço Exemplo",
        horario: "14:00",
        local: "Rua X",
        preco: "R$ 40",
      }));

      setServices((prev) => [...prev, ...newItems]);

      if (page === 5) setHasMore(false);
    };

    load();
  }, [page]);

  // Infinite Scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!hasMore) return;

      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 100
      ) {
        setPage((p) => p + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore]);

  return (
    <>
      <Navbar />

      <div className="container pt-4 results-container">
        <h2 className="results-title">Resultados da Busca</h2>

        <div className="filters-summary">
          <small>
            Buscando: <b>Serviço</b> — 2025-01-01 — Local X
          </small>
        </div>

        <div className="results-list">
          {services.map((s) => (
            <ServiceCard
              key={s.id}
              servico={s.servico}
              horario={s.horario}
              local={s.local}
              preco={s.preco}
              extra={s.extra}
            />
          ))}
        </div>

        {/* IMPORTANTE: esta linha estava quebrando quando tinha <div> a mais */}
        {!hasMore && (
          <p className="end-message">Não há mais serviços disponíveis.</p>
        )}
      </div>
    </>
  );
}
