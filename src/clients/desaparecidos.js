function cadastrarDesaparecido() {
    let perfilUsuario = sessionStorage.getItem('userProfile')

    if(!perfilUsuario || parseInt(perfilUsuario) !== 1) {
        alert('Probido')
        return
    } else {
        criarDialogCadastroDesaparecido()
    }
}


function criarDialogCadastroDesaparecido() {
    let dialogCadastroDesaparecido = document.createElement('dialog')
    dialogCadastroDesaparecido.className = 'w-1/2 mt-24 bg-gray-50 rounded-lg shadow-lg border border-bg-gray-100'
    dialogCadastroDesaparecido.id = 'dialogCadastroDesaparecido'

    let closeButton = document.createElement('button')
    closeButton.className = 'absolute top-3 right-5 border border-gray-200 px-2 pb-0.5 rounded'
    closeButton.innerText = 'x'
    closeButton.addEventListener('click', () => dialogCadastroDesaparecido.close())
    dialogCadastroDesaparecido.appendChild(closeButton)

    let form = document.createElement('form')
    form.className = "grid gap-5 bg-gray-50 pt-10 pb-16 px-5 px-32"
    form.innerHTML = `
        <h1 class="font-bold text-xl text-center my-5">CADASTRAR PESSOA DESAPARECIDA</h1>
        <div class="grid w-full">
            <label for="nome">Nome Completo:</label>
            <input type="text" name="nome" id="nome" class="border px-2 py-3">
        </div>
        <div class="grid">
            <label for="dataNascimento">Data Nascimento:</label>
            <input type="date" name="dataNascimento" id="dataNascimento" class="border px-2 py-3">
        </div>
        <div class="h-4">
            <span class="text-red-500 hidden text-center" id="spanErro"></span>
        </div>
        <button type="submit" class="px-10 border p-4 mt-4 bg-green-500 text-white font-bold text-lg rounded hover:bg-green-400">Cadastrar</button>
    `

    form.addEventListener('submit', function (event){
        event.preventDefault()
        logar()
    })

    dialogCadastroDesaparecido.appendChild(form)

    document.body.appendChild(dialogCadastroDesaparecido)
    dialogCadastroDesaparecido.showModal()
}

function listarDesaparecidos() {
    fetch('http://localhost:3000/pessoas')
    .then(response => response.json())
    .then(function(data) {
        console.log(data)

        //para testar
        let listaDesparecidos = document.getElementById('listaDesparecidos')
        listaDesparecidos.className = 'container grid grid-cols-4 gap-x-5 gap-y-16'

        data.forEach(pessoa => {
            listaDesparecidos.innerHTML += `
            <div class='shadow'>
                <img class='border border-gray-400 rounded-tl rounded-tr' src=${pessoa.foto} alt="foto desaparecido">
                <div class='border border-gray-400 border-t-0 rounded-bl rounded-br'>
                    <h1 class='text-center font-bold text-lg bg-gray-200 py-3'>${pessoa.nome}</h1>
                    <h2 class='px-3 py-3 border-b'>Nascimento: ${pessoa.data_nascimento.split('-').reverse().join('/')}</h2>
                    <h2 class='px-3 py-3 border-b'>Desaparecimento: <b>${pessoa.data_desaparecimento.split('-').reverse().join('/')}</b></h2>
                    <h2 class='px-3 py-3'>Local: <b>${pessoa.local_desaparecimento}</b></h2>
                </div>
            </div>
            `
        })
        
    })
    .catch(error => console.error("Erro:", error))
}