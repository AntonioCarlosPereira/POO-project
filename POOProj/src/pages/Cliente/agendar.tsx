import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Navbar from '../../Components/AppNavbar';
import ServiceCard from "../../Components/ServiceCard";
import "./agendar.css";
import { get } from "http";

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

//Exemplo de objeto

export default function ClientAgendar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [api_schedules, setApiSchedules] = useState<availableSchedules[]>([])
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(9999);
  const [placeNameFilter, setPlaceNameFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("todas");


  const handleSearch = async (e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    try{
      const searchData = {searchTerm, dateFilter, minPrice, maxPrice, placeNameFilter, categoryFilter}
      const res = await fetch("/buscarAgendas", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(searchData)
      })
      const data = await res.json()
      if(data.success){
        const foundSchedules = data.itens.map((itens:any)=>({
          scheduleId: itens.schedule.workerId,
          date: itens.schedule.data,
          hour: itens.hour,
          serviceId: itens.service.id,
          serviceName: itens.service.name,
          price: itens.service.number,
          duration: itens.service.duration, 
          
          placeId: itens.place.id,
          placeName: itens.place.name, 
          workerName: itens.worker.name, 
          
          category: itens.service.name, 
          locationAddress: itens.place.address
        }))
        setApiSchedules(foundSchedules)
      
      }else{
        alert("Erro Interno.")
      }
    }
    catch(err){
      console.log(err)
    }
  }
    const categories = useMemo(() => {
    const all = api_schedules.map(s => s.category);
    return ["todas", ...new Set(all.map(c => c.toLowerCase()))];
  }, [api_schedules]);
  const filteredSlots = useMemo(() => {
    let results = api_schedules;

    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      results = results.filter(s => 
        s.serviceName.toLowerCase().includes(lowerSearch) ||
        s.placeName.toLowerCase().includes(lowerSearch) ||
        s.workerName.toLowerCase().includes(lowerSearch)
      );
    }

    if (dateFilter) {
      results = results.filter(s => s.date === dateFilter);
    }
    
    if (placeNameFilter) {
        const lowerPlace = placeNameFilter.toLowerCase();
        results = results.filter(s => s.placeName.toLowerCase().includes(lowerPlace));
    }

    if (categoryFilter !== "todas") {
      results = results.filter(s => s.category.toLowerCase() === categoryFilter);
    }

    results = results.filter(s => s.price >= minPrice && s.price <= maxPrice);
    
    return results.sort((a, b) => {
        if (a.date < b.date) return -1;
        if (a.date > b.date) return 1;
        if (a.hour < b.hour) return -1;
        if (a.hour > b.hour) return 1;
        return 0;
    });
  }, [searchTerm, dateFilter, placeNameFilter, categoryFilter, minPrice, maxPrice, api_schedules]);

  return (
    <>
      <Navbar/>
      <div className="client-agendar-container p-4">
        <h2 className="fw-bold mb-4 text-center">encontrar agendas disponíveis</h2>

        <div className="search-bar mb-4 card p-3 shadow-lg">
          <div className="input-group input-group-lg">
            <form onSubmit={handleSearch}>
            <input
              type="text"
              className="form-control border-start-0"
              placeholder="buscar por serviço, prestador ou local..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit">Buscar</button>
            </form>
          </div>
        </div>

        <div className="row">
            
            <div className="col-md-3">
                <div className="filters-section card p-3 shadow-sm mb-4">                    
                    <div className="mb-3">
                        <label className="form-label small fw-semibold">categoria</label>
                        <select
                            className="form-select"
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                        >
                            {categories.map(cat => (
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
                </div>
            </div>


            <div className="col-md-9">
                <div className="results-section">
                    <h3 className="mb-3">
                        {filteredSlots.length} agendas encontradas
                    </h3>
                    
                    {filteredSlots.length === 0 ? (
                        <div className="alert alert-info text-center">
                            nenhuma agenda encontrada.
                        </div>
                    ) : (
                        api_schedules.map(slot => (
                            <ServiceCard key={slot.scheduleId} slot={slot} />
                        ))
                    )}
                </div>
            </div>
            
        </div>
        
      </div>
    </>
  );
}