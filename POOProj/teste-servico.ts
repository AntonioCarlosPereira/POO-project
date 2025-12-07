async function criarServico() {
    console.log("Tentando cadastrar serviço...");

    try {
        // Atenção: A porta é 4040, igual ao seu index.ts
        const resposta = await fetch('http://localhost:4040/services', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: "Consultoria Técnica",
                description: "Análise de infraestrutura",
                price: 150.00,
                duration: "1h 30min"
            })
        });

        const dados = await resposta.json();
        
        console.log("--- Resposta do Servidor ---");
        console.log("Status:", resposta.status); 
        console.log(dados);

    } catch (erro) {
        console.error("Erro ao conectar. O servidor está rodando em outro terminal?", erro);
    }
}

criarServico();