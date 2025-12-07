async function testar() {
    const resposta = await fetch('http://localhost:3001/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email: "teste@email.com",
            name: "Caio Tester",
            password: "minhasenhabemsecreta"
        })
    });

    const dados = await resposta.json();
    console.log("Resultado:", dados);
}
testar();