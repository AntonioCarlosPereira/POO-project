import React, { useState } from "react";
import "./CadastrarServico.css";

interface ServicoForm {
  servico: string;
  preco: string;
  local: string;
  horario: string;
}

export default function CadastrarServico() {
  const [form, setForm] = useState<ServicoForm>({
    servico: "",
    preco: "",
    local: "",
    horario: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    alert("Serviço cadastrado com sucesso!");
    console.log("Dados enviados:", form);
  };

  return (
    <div className="cadastrar-servico">
      <h2>Cadastrar Serviço</h2>

      <input
        type="text"
        name="servico"
        placeholder="Nome do serviço"
        value={form.servico}
        onChange={handleChange}
      />

      <input
        type="text"
        name="preco"
        placeholder="Preço"
        value={form.preco}
        onChange={handleChange}
      />

      <input
        type="text"
        name="local"
        placeholder="Local"
        value={form.local}
        onChange={handleChange}
      />

      <input
        type="text"
        name="horario"
        placeholder="Horário"
        value={form.horario}
        onChange={handleChange}
      />

      <button onClick={handleSubmit}>Salvar</button>
    </div>
  );
}
