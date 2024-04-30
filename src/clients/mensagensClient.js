function listarMensagens() {
    fetch("http://localhost:3000/mensagens")
    .then((response) => response.json())
    .then(function (data) {
        let divForum = document.getElementById("forum")

        data.forEach((mensagem) => {
            console.log(mensagem)

            let divMsg = document.createElement('div')
            divMsg.className = 'grid grid-cols-4 p-5 mb-0.5 bg-white shadow-md'

            divMsg.innerHTML = `
                <div class="flex flex-col col-span-2 gap-y-1">
                    <h3 class="font-semibold">${mensagem.titulo}</h3>
                    <h4 class="font-thin">Por ${mensagem.nome_autor}, ${mensagem.data_postagem.split("-").reverse().join("/")}</h4>
                </div>
                <div class="flex flex-col items-end justify-center">
                    <h4>${mensagem.respostas} ${mensagem.respostas == 1 ? 'resposta' : 'respostas'}</h4>
                    <h4>${mensagem.visualizacoes} visualizações</h4>
                </div>
                <div class="flex flex-row items-center ml-14 gap-x-3">
                    <div class="rounded-full w-12 h-12 content-center justify-center bg-blue-500">
                        <h2 class="font-semibold text-center text-2xl text-white">F</h2>
                    </div>
                    <div>
                        <h4 class="font-semibold">${mensagem.username_autor}</h4>
                        <h4 class="font-thin text-sm">22/04/2024</h4>
                    </div>
                </div>
            `

            divForum.appendChild(divMsg)
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