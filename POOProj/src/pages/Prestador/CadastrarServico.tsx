import React, { useState, useEffect, useCallback } from "react";
import Navbar from '../../Components/AppNavbar'; 
import "./CadastrarServico.css"

interface ServicoForm {
  servico: string;
  preco: string;
  localId: number | null;
  duracaoHoras: number;
  duracaoMinutos: number;
}

interface PlaceSearchResult {
    id: number;
    name: string;
    address: string;
}

const MOCK_PLACES: PlaceSearchResult[] = [
    { id: 10, name: "Pet Shop Central", address: "Rua A, 123" },
    { id: 11, name: "Salão da Maria", address: "Avenida B, 456" },
    { id: 12, name: "Oficina do Zé", address: "Praça C, 789" },
];

export default function CadastrarServico() {
  const [form, setForm] = useState<ServicoForm>({
    servico: "",
    preco: "",
    localId: null,
    duracaoHoras: 0,
    duracaoMinutos: 30,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<PlaceSearchResult[]>([]);
  const [selectedPlaceName, setSelectedPlaceName] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const renderTimeOptions = (max: number, step: number) => {
    return Array.from({ length: max / step + 1 }, (_, i) => i * step);
  };
  
  const searchPlace = useCallback(async (term: string) => {
    if (term.length < 3) {
      setSearchResults([]);
      return;
    }
    
    // ⚠️ COLOQUE A CHAMADA DA API DE BUSCA DE ESTABELECIMENTOS AQUI
    
    // SIMULAÇÃO DE RESPOSTA DO BACKEND:
    await new Promise(resolve => setTimeout(resolve, 300));
    const lowerTerm = term.toLowerCase();
    const results = MOCK_PLACES.filter(place => 
      place.name.toLowerCase().includes(lowerTerm)
    );
    
    setSearchResults(results);
  }, []);

  useEffect(() => {
    if (searchTerm) {
        searchPlace(searchTerm);
    }
  }, [searchTerm, searchPlace]);


  const handlePlaceSelect = (place: PlaceSearchResult) => {
    setForm({ ...form, localId: place.id });
    setSelectedPlaceName(place.name);
    setSearchTerm("");
    setSearchResults([]);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === "duracaoHoras" || name === "duracaoMinutos") {
        setForm({ ...form, [name]: Number(value) });
    } else {
        setForm({ ...form, [name]: value });
    }
  };
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const term = e.target.value;
      setSearchTerm(term);
      
      if (term !== selectedPlaceName) {
          setForm({ ...form, localId: null });
          setSelectedPlaceName("");
      }
  };

  const isFormValid = !!form.localId && !isSubmitting;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); 
    if (!isFormValid) return;

    setIsSubmitting(true);
    
    const dataToSend = {
        ...form,
        duracao: `${form.duracaoHoras}h ${form.duracaoMinutos}m`,
    };
    
    // ⚠️ COLOQUE A CHAMADA DA API DE CADASTRO DE SERVIÇO AQUI
    console.log("DADOS ENVIADOS PARA CADASTRO:", dataToSend);

    setTimeout(() => {
        
        setShowSuccessPopup(true);

        setForm({
            servico: "",
            preco: "",
            localId: null,
            duracaoHoras: 0,
            duracaoMinutos: 30,
        });
        setSelectedPlaceName("");
        setSearchTerm("");
        setIsSubmitting(false);

        setTimeout(() => setShowSuccessPopup(false), 3000); 

    }, 1000); 
  };

  return (
    <>
      <Navbar />
      
      {showSuccessPopup && (
        <div className="custom-popup-success">
            Serviço cadastrado com sucesso!
        </div>
      )}

      <div className="client-agendar-container p-4">
        <h2 className="fw-bold mb-5 text-center">Cadastro de Novo Serviço</h2>

        <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6">
                <div className="card p-4 shadow-lg"> 
                    
                    <form onSubmit={handleSubmit}>
                        
                        <div className="mb-3">
                            <label htmlFor="servico" className="form-label fw-semibold">Nome do Serviço</label>
                            <input
                                type="text"
                                className="form-control"
                                id="servico"
                                name="servico"
                                placeholder="Ex: Banho e Tosa, Corte de Cabelo"
                                value={form.servico}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="preco" className="form-label fw-semibold">Preço (R$)</label>
                            <input
                                type="number"
                                className="form-control"
                                id="preco"
                                name="preco"
                                placeholder="0.00"
                                value={form.preco}
                                onChange={handleChange}
                                min="0"
                                step="0.01"
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="local-search" className="form-label fw-semibold">
                                Local (Estabelecimento) 
                            </label>
                            {/* LINHA REMOVIDA: {selectedPlaceName && (
                                <p className="small mb-1 text-primary">Local selecionado: <strong>{selectedPlaceName}</strong></p>
                            )} */}
                            <input
                                type="text"
                                className={`form-control ${form.localId && !searchTerm ? 'is-valid' : ''} ${searchTerm && !form.localId && searchResults.length === 0 ? 'is-invalid' : ''}`}
                                id="local-search"
                                placeholder={selectedPlaceName || "Digite para buscar e selecionar o local"}
                                value={searchTerm || selectedPlaceName}
                                onChange={handleSearchChange}
                                disabled={form.localId && !searchTerm}
                                required
                            />
                            
                            {searchResults.length > 0 && searchTerm.length >= 3 && (
                                <div className="list-group mt-2 shadow-sm" style={{ maxHeight: '150px', overflowY: 'auto' }}>
                                    {searchResults.map(place => (
                                        <button
                                            key={place.id}
                                            type="button"
                                            className="list-group-item list-group-item-action"
                                            onClick={() => handlePlaceSelect(place)}
                                        >
                                            <strong>{place.name}</strong> <span className="text-muted small">({place.address})</span>
                                        </button>
                                    ))}
                                </div>
                            )}
                             {searchTerm && searchResults.length === 0 && (
                                <div className="text-danger small mt-1">
                                    Nenhum estabelecimento encontrado.
                                </div>
                            )}
                        </div>

                        <div className="mb-4">
                            <label className="form-label fw-semibold">Duração do Serviço</label>
                            <div className="d-flex gap-3">
                                <select
                                    className="form-select"
                                    name="duracaoHoras"
                                    value={form.duracaoHoras}
                                    onChange={handleChange}
                                >
                                    {renderTimeOptions(8, 1).map(h => (
                                        <option key={h} value={h}>{h} h</option>
                                    ))}
                                </select>
                                
                                <select
                                    className="form-select"
                                    name="duracaoMinutos"
                                    value={form.duracaoMinutos}
                                    onChange={handleChange}
                                >
                                    {renderTimeOptions(45, 15).map(m => (
                                        <option key={m} value={m}>{m} min</option>
                                    ))}
                                </select>
                            </div>
                            {form.duracaoHoras === 0 && form.duracaoMinutos === 0 && (
                                <div className="text-danger small mt-1">A duração não pode ser zero.</div>
                            )}
                        </div>

                        <button 
                            type="submit" 
                            className="btn btn-primary w-100" 
                            disabled={!isFormValid || (form.duracaoHoras === 0 && form.duracaoMinutos === 0)}
                        >
                            {isSubmitting ? 'Cadastrando...' : 'Salvar Serviço'}
                        </button>
                        {!form.localId && (
                            <div className="text-danger small mt-2 text-center">É necessário selecionar um estabelecimento existente.</div>
                        )}
                    </form>
                    
                </div>
            </div>
        </div>
      </div>
    </>
  );
}