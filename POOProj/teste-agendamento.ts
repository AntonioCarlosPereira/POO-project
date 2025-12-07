async function criarAgendamento() {
    console.log("Tentando criar agendamento...");

    try {
        const resposta = await fetch('http://localhost:4040/appointments', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                clientUserId: 1,  // ID do usuário que quer o serviço
                workerUserId: 1,  // ID do usuário que vai trabalhar (pode ser o mesmo para teste)
                serviceId: 1,     // ID do serviço que criamos antes
                placeId: 1,       // ID do estabelecimento (precisa existir no banco)
                date: "2023-12-25",
                hour: "14:00"
            })
        });

        const dados = await resposta.json();
        
        console.log("--- Resposta ---");
        console.log("Status:", resposta.status);
        console.log(dados);

    } catch (erro) {
        console.error("Erro ao conectar:", erro);
    }
}

criarAgendamento();