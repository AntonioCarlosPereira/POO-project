import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import Navbar from '../../Components/AppNavbar';
import ServiceCard from "../../Components/ServiceCard";
import "./agendar.css";

interface availableSchedules {
  scheduleId: number;
  date: string;       
  hour: string;       
  
  serviceId: number;
  serviceName: string;
  price: number;
  duration: string; 
  
  placeId: number;
  placeName: string; 
  workerName: string; 
  
  category: string; 
  locationAddress: string;
}

const CATEGORIES: string[] = ["todas"]; 


export default function ClientAgendar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(9999);
  const [placeNameFilter, setPlaceNameFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("todas");
  
  const [filteredSlots, setFilteredSlots] = useState<availableSchedules[]>([]);
  const [isLoading, setIsLoading] = useState(false);


  const fetchSchedules = useCallback(async (filters: any) => {
    setIsLoading(true);
    
    //chama o back aqui 

    await new Promise(resolve => setTimeout(resolve, 500)); 
    setFilteredSlots([]);
    setIsLoading(false);

  }, []);

  useEffect(() => {
    fetchSchedules({
        searchTerm: "",
        dateFilter: "",
        minPrice: 0,
        maxPrice: 9999,
        placeNameFilter: "",
        categoryFilter: "todas",
    });
  }, [fetchSchedules]);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); 
    
    const filters = {
        searchTerm,
        dateFilter,
        minPrice,
        maxPrice,
        placeNameFilter,
        categoryFilter,
    };
    
    fetchSchedules(filters);
  };


  return (
    <>
      <Navbar/>
      <div className="client-agendar-container p-4">
        <h2 className="fw-bold mb-4 text-center">encontrar agendas disponíveis</h2>

        <form onSubmit={handleSubmit}>
          
          <div className="search-bar mb-4 card p-3 shadow-lg">
            <div className="input-group input-group-lg">
              <input
                type="text"
                className="form-control border-start-0"
                placeholder="buscar por serviço, prestador ou local..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="btn btn-primary" type="submit">
                <i className="bi bi-search"></i> Buscar
              </button>
            </div>
          </div>

          <div className="row">
              
              <div className="col-md-3">
                  <div className="filters-section card p-3 shadow-sm mb-4">                    
                      <h5 className="mb-3">Filtros Avançados</h5>
                      
                      <div className="mb-3">
                          <label className="form-label small fw-semibold">categoria</label>
                          <select
                              className="form-select"
                              value={categoryFilter}
                              onChange={(e) => setCategoryFilter(e.target.value)}
                          >
                              {CATEGORIES.map(cat => (
                                  <option key={cat} value={cat}>{cat}</option>
                              ))}
                          </select>
                      </div>

                      <div className="mb-3">
                          <label className="form-label small fw-semibold d-flex align-items-center">data</label>
                          <input
                              type="date"
                              className="form-control"
                              value={dateFilter}
                              onChange={(e) => setDateFilter(e.target.value)}
                          />
                      </div>

                      <div className="mb-3">
                          <label className="form-label small fw-semibold d-flex align-items-center">local</label>
                          <input
                              type="text"
                              className="form-control"
                              placeholder="ex: pet shop central"
                              value={placeNameFilter}
                              onChange={(e) => setPlaceNameFilter(e.target.value)}
                          />
                      </div>
                      
                      <div className="mb-3">
                          <label className="form-label small fw-semibold d-flex align-items-center">preço</label>
                          <div className="input-group">
                              <span className="input-group-text">r$</span>
                              <input
                                  type="number"
                                  className="form-control"
                                  placeholder="mín"
                                  value={minPrice}
                                  onChange={(e) => setMinPrice(Number(e.target.value))}
                                  min="0"
                              />
                              <span className="input-group-text">até</span>
                              <input
                                  type="number"
                                  className="form-control"
                                  placeholder="máx"
                                  value={maxPrice}
                                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                                  min="0"
                              />
                          </div>
                      </div>

                      <button className="btn btn-warning w-100 mt-2" type="submit" disabled={isLoading}>
                          {isLoading ? 'Buscando...' : 'Aplicar Filtros'}
                      </button>
                      
                  </div>
              </div>

              <div className="col-md-9">
                  <div className="results-section">
                      <h3 className="mb-3">
                          {filteredSlots.length} agendas encontradas
                      </h3>
                      
                      {isLoading ? (
                           <div className="alert alert-warning text-center">
                            Carregando agendas...
                          </div>
                      ) : filteredSlots.length === 0 ? (
                          <div className="alert alert-info text-center">
                              nenhuma agenda encontrada.
                          </div>
                      ) : (
                          filteredSlots.map(slot => (
                              <ServiceCard key={slot.scheduleId} slot={slot} />
                          ))
                      )}
                  </div>
              </div>
              
          </div>
        
        </form>
      </div>
    </>
  );
}