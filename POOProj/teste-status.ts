async function mudarStatus() {
    console.log("Prestador aceitando o serviço...");

    try {
        const resposta = await fetch('http://localhost:4040/updateAppointment', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                appointmentId: 1,  // ID do agendamento que criamos antes
                status: "aceito"   // Tentando mudar de 'solicitado' para 'aceito'
            })
        });

        const dados = await resposta.json();
        
        console.log("--- Resposta ---");
        console.log("Status HTTP:", resposta.status);
        console.log(dados);

    } catch (erro) {
        console.error("Erro:", erro);
    }
}

mudarStatus();