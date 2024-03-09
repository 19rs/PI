function cadastrarDesaparecido() {
  let perfilUsuario = sessionStorage.getItem("userProfile");

  if (!perfilUsuario || parseInt(perfilUsuario) !== 1) {
    alert("Proibido");
    return;
  } else {
    // criarDialogCadastroDesaparecido()
    window.location.href = "../screens/cadastrarDesaparecido.html";
  }
}

/*
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
*/

function listarDesaparecidos() {
  fetch("http://localhost:3000/pessoas")
    .then((response) => response.json())
    .then(function (data) {
      //console.log(data)

      //para testar
      let listaDesparecidos = document.getElementById("listaDesparecidos");
      listaDesparecidos.className =
        "container px-10 flex flex-wrap gap-x-8 gap-y-8 justify-center mb-10";

      data.forEach((pessoa) => {
        // console.log(pessoa)
        // console.log(typeof(pessoa))
        let div = document.createElement("div");
        div.className = "shadow border border-gray-300 rounded";
        div.addEventListener("click", function () {
          renderItem(pessoa);
        });

        listaDesparecidos.appendChild(div);

        div.innerHTML += `
            <div class='h-64 w-64 flex justify-center'>
                <img class='max-h-64 max-w-64 rounded-tl-sm rounded-tr-sm'  src=${
                  pessoa.foto ? pessoa.foto : "img/pessoas/SemFoto.png"
                } alt="foto desaparecido">
            </div>
            <div>
                <h1 class='text-center font-bold text-lg border-t border-b border-gray-300 bg-gray-200 py-3'>${
                  pessoa.nome
                }</h1>
                <h2 class='px-3 py-3 border-b'>Nascimento: ${
                  pessoa.data_nascimento
                    ? pessoa.data_nascimento.split("-").reverse().join("/")
                    : ""
                }</h2>
                <h2 class='px-3 py-3 border-b'>Desaparecimento: <b>${pessoa.data_desaparecimento
                  .split("-")
                  .reverse()
                  .join("/")}</b></h2>
                <h2 class='px-3 py-3'>Local: <b>${
                  pessoa.local_desaparecimento
                }</b></h2>
            </div>
            `;
      });
    })
    .catch((error) => console.error("Erro:", error));
}

function renderItem(pessoa) {
  const modal = document.getElementById("modal");
  const overlay = document.getElementById("overlay");
  modal.innerHTML = ` `;

  modal.innerHTML = `
     <div class='bg-[#191919] p-5 rounded-lg w-full items-center justify-center flex flex-col '>
     <img src='${pessoa.foto}' class='w-80 h-auto rounded-md' id='tamDetalhes'>
        <h4 class='text-2xl font-bold p-4'>${pessoa.nome}</h4>
      
       
        <h6>CPF: ${pessoa.cpf}</h6>
        <h6>ALTURA: ${pessoa.altura}</h6>
        <h6>CABELO: ${pessoa.cabelo}</h6>
        <h6>CARACTERISTICAS: ${pessoa.caracteristicas_fisicas}</h6>
        <h6>CONTATO: ${pessoa.contato}</h6>
        <h6>NASCIMENTO: ${pessoa.data_nascimento}</h6>
        <h6>DESAPARECIMENTO: ${pessoa.data_desaparecimento}</h6>
        <h6>DETALHES: ${pessoa.detalhes_desaparecimento}</h6>
        <h6>GENERO: ${pessoa.genero}</h6>
        <h6>IDADE: ${pessoa.idade}</h6>
        <h6>OLHOS: ${pessoa.olhos}</h6>
        <h6>PESO: ${pessoa.peso_estimado}</h6>
        <h6>RESIDENTE: ${pessoa.residente_em}</h6>
        <h6>ULTIMA VEZ VISTO: ${pessoa.ultima_vez_visto}</h6>
      
        </div>
     
          
   `;
  modal.style.display = "flex";
  overlay.style.display = "block";

  overlay.onclick = function () {
    modal.style.display = "none";
    overlay.style.display = "none";
  };
}

function addDesaparecidos() {
  const nome = document.getElementById("nome").value;
  const data_nascimento = document.getElementById("dataNascimento").value;
  const genero = document.getElementById("genero").value;
  const olhos = document.getElementById("olhos").value;
  const altura_estimada = document.getElementById("altura").value;
  const peso_estimado = document.getElementById("peso").value;
  const cabelo = document.getElementById("cabelo").value;
  const residente_em = document.getElementById("residenteEm").value;

  const cpf = document.getElementById("cpf").value;
  const vestimentas = document.getElementById("vestimentas").value;
  const data_desaparecimento = document.getElementById(
    "dataDesaparecimento"
  ).value;
  const local_desaparecimento = document.getElementById(
    "localDesaparecimento"
  ).value;
  const caracteristicas_fisicas = document.getElementById("caracte").value;
  const contato = document.getElementById("contato").value;
  const detalhes_desaparecimento = document.getElementById(
    "detalhes-desaparecimento"
  ).value;

  const inputFoto = document.getElementById("fotoDesaparecido");
  let foto = "";

  if (inputFoto.files[0]) {
    foto = inputFoto.files[0];
  }

  const formData = new FormData();

  formData.append("nome", nome);
  formData.append("cpf", cpf);
  formData.append("data_nascimento", data_nascimento);
  formData.append("genero", genero);
  formData.append("olhos", olhos);
  formData.append("altura_estimada", altura_estimada);
  formData.append("peso_estimado", peso_estimado);
  formData.append("cabelo", cabelo);
  formData.append("caracteristicas_fisicas", caracteristicas_fisicas);
  formData.append("vestimentas", vestimentas);
  formData.append("residente_em", residente_em);
  formData.append("foto", foto);
  formData.append("data_desaparecimento", data_desaparecimento);
  formData.append("local_desaparecimento", local_desaparecimento);
  formData.append("detalhes_desaparecimento", detalhes_desaparecimento);
  formData.append("contato", contato);

  fetch("http://localhost:3000/pessoas", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      // displaySuccessMessage()
      alert(data.message);
      console.log("Cadastro realizado com sucesso!");
    })
    .catch((error) => console.log("Erro:" + error));
}

function deleteDesaparecido(id) {
  const conv = parseInt(id);
  fetch(`http://localhost:3000/desaparecidos/${conv}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => {
      alert("OK");
    })
    .catch((error) => alert("Erro:", error));
}

function updateDesaparecido(id) {
  const conv = parseInt(id);

  const nome_completo = document.getElementById("nomeAlterar").value;
  const idade = document.getElementById("idadeAlterar").value;
  const genero = document.getElementById("generoAlterar").value;
  const olhos = document.getElementById("olhosAlterar").value;
  const altura = document.getElementById("alturaAlterar").value;
  const peso = document.getElementById("pesoAlterar").value;
  const cabelo = document.getElementById("cabeloAlterar").value;
  const residente_em = document.getElementById("residenteAlterar").value;
  const foto = document.getElementById("fotoAlterar").value;
  const ultima_vez_visto = document.getElementById("ultimaAlterar").value;
  const vestimentas = document.getElementById("vestimentasAlterar").value;
  const data_desaparecimento = document.getElementById("dataAlterar").value;

  const caracteristicas_fisicas =
    document.getElementById("caracteAlterar").value;
  const contato = document.getElementById("contatoAlterar").value;
  const detalhes_desaparecimento = document.getElementById(
    "detalhes-desaparecimentoAlterar"
  ).value;

  fetch(`http://localhost:3000/desaparecidos/${conv}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
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
      detalhes_desaparecimento,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      alert("ok");
    })
    .catch((error) => alert("Erro:", error));
}
