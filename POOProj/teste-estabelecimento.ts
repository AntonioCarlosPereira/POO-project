async function criarEstabelecimento() {
    console.log("Criando estabelecimento...");

    try {
        const resposta = await fetch('http://localhost:4040/places', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId: 1, // ID de um usuário existente (o dono)
                name: "Matriz Central",
                address: "Av. Paulista, 1000",
                cnpj: "12.345.678/0001-99"
            })
        });

        const dados = await resposta.json();
        console.log("--- Resposta ---");
        console.log("Status:", resposta.status);
        console.log(dados);

    } catch (erro) {
        console.error("Erro:", erro);
    }
}

criarEstabelecimento();