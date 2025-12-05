async function testarLogin() {
    console.log("Tentando logar...");
    
    try {
        const resposta = await fetch('http://localhost:3001/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: "teste@email.com",
                password: "minhasenhabemsecreta"
            })
        });

        const dados = await resposta.json();
        
        console.log(`Status da resposta: ${resposta.status}`);
        console.log("Corpo da resposta:", dados);

    } catch (erro) {
        console.error("Erro ao conectar com o servidor:", erro);
    }
}

testarLogin();