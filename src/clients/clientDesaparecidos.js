function addDesaparecidos() {

    const nome = document.getElementById("nome").value;
    const idade = document.getElementById("idade").value;
    const genero = document.getElementById("genero").value;
    const olhos = document.getElementById("olhos").value;
    const altura = document.getElementById("altura").value;
    const peso = document.getElementById("peso").value;
    const cabelo = document.getElementById("cabelo").value;
     const residenteEm = document.getElementById("residente").value;
    
   
    const foto = document.getElementById("foto").value;
    const ultimaVezVisto = document.getElementById("ultima").value;
     const vestimentas = document.getElementById("vestimentas").value;
    const dataDesaparecimento = document.getElementById("data").value;
    const caracteristicasFisicas = document.getElementById("caracte").value;
    const contato = document.getElementById("contato").value;
    const detalhesDesaparecimento = document.getElementById("detalhes-desaparecimento").value;


   
    
    fetch('http://localhost:3000/desaparecidos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nome_completo: nome,
            idade: idade,
            genero: genero,
            olhos: olhos,
            altura: altura,
            peso: peso,
            cabelo: cabelo,
            residente_em: residenteEm,
            foto: foto,
            ultima_vez_visto: ultimaVezVisto,
            vestimentas: vestimentas,
            data_desaparecimento: dataDesaparecimento,
            caracteristicas_fisicas: caracteristicasFisicas,
            contato: contato,
            detalhes_desaparecimento: detalhesDesaparecimento
        })
    }) .then(() => {
        displaySuccessMessage()
    })
    .catch(error => alert("Erro:" + error))
}

function deleteDesaparecido(id) {
    const conv = parseInt(id)
    fetch(`http://localhost:3000/desaparecidos/${conv}`, {
        method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
       alert('OK')
    })
    .catch(error => alert("Erro:", error));
}


function updateDesaparecido(id) {
    const conv = parseInt(id)
    
    const nome_completo = document.getElementById('nomeAlterar').value
    const idade = document.getElementById('idadeAlterar').value
    const genero = document.getElementById('generoAlterar').value
    const olhos = document.getElementById('olhosAlterar').value
    const altura = document.getElementById('alturaAlterar').value
    const peso = document.getElementById('pesoAlterar').value
    const cabelo = document.getElementById('cabeloAlterar').value
    const residente_em = document.getElementById('residenteAlterar').value
    const foto = document.getElementById('fotoAlterar').value
    const ultima_vez_visto = document.getElementById('ultimaAlterar').value
    const vestimentas = document.getElementById('vestimentasAlterar').value
    const data_desaparecimento = document.getElementById('dataAlterar').value

    const caracteristicas_fisicas = document.getElementById('caracteAlterar').value
    const contato = document.getElementById('contatoAlterar').value
    const detalhes_desaparecimento = document.getElementById('detalhes-desaparecimentoAlterar').value



    fetch(`http://localhost:3000/desaparecidos/${conv}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nome_completo,
            idade,
            genero,
            olhos,
            altura,
            peso,
            cabelo,
            residente_em,
            foto,
            ultima_vez_visto,
            vestimentas,
            data_desaparecimento,
            caracteristicas_fisicas,
            contato,
            detalhes_desaparecimento
        }),
    })
        .then(response => response.json())
        .then(data => {
           alert('ok')
        })
        .catch(error => alert("Erro:", error));
}

