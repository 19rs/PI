function addUsuario() {
    const nome = document.getElementById('nome').value
    const cpf = document.getElementById('cpf').value
    const username = document.getElementById('username').value
    const senha = document.getElementById('senha').value

    fetch('http://localhost:3000/usuarios', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nome,
            cpf,
            username,
            senha
        }),
    })
        .then(response => response.json())
    displaySuccessMessage()

        .catch(error => alert("Erro:", error))
}

function deleteUsuario(id) {
    const conv = parseInt(id)
    fetch(`http://localhost:3000/usuarios/${conv}`, {
        method: 'DELETE',
    })
        .then(response => response.json())
        .then(data => {
            alert('OK')
        })
        .catch(error => alert("Erro:", error));
}

function updateUsuario(id) {
    const conv = parseInt(id)
    const nome = document.getElementById('nomeAlterar').value
    const cpf = document.getElementById('cpfAlterar').value
    const username = document.getElementById('usernameAlterar').value
    const senha = document.getElementById('senhaAlterar').value

    fetch(`http://localhost:3000/usuarios/${conv}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nome,
            cpf,
            username,
            senha
        }),
    })
        .then(response => response.json())
        .then(data => {
           alert('OK')
        })
        .catch(error => alert("Erro:", error));
}


