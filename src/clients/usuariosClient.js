function listarUsuarios() {
  verificarPermissao()

  fetch("http://localhost:3000/usuarios")
    .then((response) => response.json())
    .then(function (data) {

      let listaUsuarios = document.getElementById("listaUsuarios")

      let tabela = document.createElement('table')
      tabela.className = 'w-full border-collapse border border-slate-300 shadow-md'
      tabela.innerHTML = `
        <thead>
          <tr class="bg-gray-100">
            <th class="border border-slate-300 p-2">ID</th>
            <th class="border border-slate-300">Nome</th>
            <th class="border border-slate-300">Nome de Usuário</th>
            <th class="border border-slate-300">E-mail</th>
            <th class="border border-slate-300">Perfil</th>
            <th class="border border-slate-300">Ações</th>
          </tr>
        </thead>
      `

      let tbody = document.createElement('tbody')
      tabela.appendChild(tbody)
      
      data.forEach(usuario => {
        let tr = document.createElement('tr')
        tr.className = "border"
        tr.innerHTML = `
          <td class="border py-1 px-3">${usuario.id}</td>
          <td class="border py-1 px-3">${usuario.nome}</td>
          <td class="border py-1 px-3">${usuario.username}</td>
          <td class="border py-1 px-3">${usuario.email}</td>
          <td class="border py-1 px-3 text-center ${usuario.perfil === 1 ? 'font-bold text-blue-500' : null}">${usuario.perfil === 1 ? 'Admin' : 'Usuário'}</td>
        `
        let tdAcoes = document.createElement('td')
        tdAcoes.className = "py-1 px-3 flex justify-center gap-10"

        tr.appendChild(tdAcoes)

        let btnEdit = document.createElement('button')
        btnEdit.className="hover:text-blue-700"
        btnEdit.innerText = "Editar" 
        btnEdit.setAttribute('type', "button")
        btnEdit.addEventListener('click', function () {
          criarDialogEdicao(usuario)
        })
        tdAcoes.appendChild(btnEdit)

        let btnDelete = document.createElement('button')
        btnDelete.className="hover:text-red-700"
        btnDelete.innerText = "Deletar" 
        btnDelete.setAttribute('type', "button")
        btnDelete.addEventListener('click', function () {
          deletarUsuario(usuario)
        })
        tdAcoes.appendChild(btnDelete)

        tbody.appendChild(tr)
      })

      listaUsuarios.appendChild(tabela)
    })
}

function addUsuario() {
  const nome = document.getElementById('nome').value;
  const email = document.getElementById('email').value;
  const username = document.getElementById('username').value;
  const senha = document.getElementById('senha').value;


  const formData = new FormData();

  formData.append("nome", nome);
  formData.append("email", email);
  formData.append("username", username);
  formData.append("perfil" , 2)
  formData.append("senha", senha);
  
  
  fetch("http://localhost:3000/usuario", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      alert('OK')
      console.log("Cadastro realizado com sucesso!");

      document.getElementById('alert').style.display = 'block'
    })
    .catch((error) => console.log("Erro:" + error));
}




function deletarUsuario(usuario) {
  let confirmacao = `Confirma a exclusão desse Usuário?\n\nID: ${usuario.id}\nNome: ${usuario.nome}\nUsername: ${usuario.username}\nEmail: ${usuario.email}`

  if(confirm(confirmacao) === true) {
    fetch(`http://localhost:3000/usuario/${usuario.id}`, {
      method: "DELETE",
    })
    .then((response) => response.json())
    .then(() => {
      alert('Usuário deletado com sucesso!')
    })
    .catch((error) => console.log("Erro:" + error));
  }
}


function criarDialogEdicao(usuario) {

  let dialogEdicao = document.createElement('dialog')
    dialogEdicao.className = 'w-full sm:w-1/2 mt-24 bg-gray-50 rounded-lg shadow-lg border border-gray-300'
    dialogEdicao.id = 'dialogEdicao'

    let closeButton = document.createElement('button')
    closeButton.className = 'absolute top-3 right-5 border border-gray-200 px-2 pb-0.5 rounded'
    closeButton.innerText = 'x'
    closeButton.addEventListener('click', () => dialogEdicao.close())
    dialogEdicao.appendChild(closeButton)

    let form = document.createElement('form')
    form.className = "grid gap-3 bg-gray-50 pt-10 pb-12 px-5 sm:px-20"
    form.innerHTML = `
      <h1 class="font-bold text-xl text-center my-5">EDITAR USUÁRIO</h1>
      <label for="nome">NOME: </label>
      <input type="text" required id="nome" class="border px-2 py-3" value=${usuario.nome}>
      <label for="email">EMAIL: </label>
      <input type="text" required id="email" class="border px-2 py-3" value=${usuario.email}>
      <label for="username">USERNAME: </label>
      <input type="text" required id="username" class="border px-2 py-3" value=${usuario.username}>
      <button type="submit" class="px-10 border p-4 mt-4 bg-gray-300 font-bold text-lg rounded hover:bg-green-400">Salvar Alterações</button>
    `

    form.addEventListener('submit', function (event){
        event.preventDefault()
        atualizarUsuario(usuario.id)
    })

    dialogEdicao.appendChild(form)

    document.body.appendChild(dialogEdicao)
    dialogEdicao.showModal()
}

function atualizarUsuario(id) {
  const nome = document.getElementById("nome").value
  const username = document.getElementById("username").value
  const email = document.getElementById("email").value

  fetch(`http://localhost:3000/usuario/${id}`, {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      nome: nome,
      username: username,
      email: email
    })
  })
  .then(response => response.json())
  .then((data) => {
    alert(data.message)
  })
  .catch(error => console.error("Erro:", error))
}

