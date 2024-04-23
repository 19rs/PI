function listarMensagens() {
    fetch("http://localhost:3000/mensagens")
    .then((response) => response.json())
    .then(function (data) {
        let divForum = document.getElementById("divForum")

        data.forEach((mensagem) => {
            console.log(mensagem)
            let div = document.createElement('div')
            div.className = 'bg-gray-200 p-4 shadow border border-gray-300'

            let titulo = document.createElement('h1')
            titulo.innerText = mensagem.titulo

            div.appendChild(titulo)

            divForum.appendChild(div)
        })
    })
    .catch((error) => console.error("Erro:", error));
}



//nao precisa, fazer o visualizar mensagem
/*
function atualizarNumeroViewsDaMensagem(id) {
    fetch(`http://localhost:3000/mensagem/views/${id}`)
    .then((response) => response.json())
    .then(function (data) {
        let divForum = document.getElementById("divForum")

        data.forEach((mensagem) => {
            console.log(mensagem)
            let div = document.createElement('div')
            div.className = 'bg-gray-200 p-4 shadow border border-gray-300'

            let titulo = document.createElement('h1')
            titulo.innerText = mensagem.titulo

            div.appendChild(titulo)

            divForum.appendChild(div)
        })
    })
    .catch((error) => console.error("Erro:", error))
}
*/