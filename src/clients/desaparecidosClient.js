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
  let perfilUsuario = sessionStorage.getItem("userProfile");
  let mostrarBotoes = parseInt(perfilUsuario) === 1;

  modal.innerHTML = ` `;

  modal.innerHTML = `
     <div class='bg-[#191919] p-5 rounded-lg w-full items-center justify-center flex flex-col '>
     <img src='${pessoa.foto}' class='w-80 h-auto rounded-md' id='tamDetalhes'>
        <h4 class='text-2xl font-bold p-4'>${pessoa.nome}</h4>
      
       
        <h6>CPF: ${pessoa.cpf}</h6>
        <h6>ALTURA: ${pessoa.altura_estimada}</h6>
        <h6>CABELO: ${pessoa.cabelo}</h6>
        <h6>CARACTERISTICAS: ${pessoa.caracteristicas_fisicas}</h6>
        <h6>CONTATO: ${pessoa.contato}</h6>
        <h6>NASCIMENTO: ${pessoa.data_nascimento}</h6>
        <h6>DESAPARECIMENTO: ${pessoa.data_desaparecimento}</h6>
        <h6>DETALHES: ${pessoa.detalhes_desaparecimento}</h6>
        <h6>GENERO: ${pessoa.genero}</h6>
        <h6>OLHOS: ${pessoa.olhos}</h6>
        <h6>PESO: ${pessoa.peso_estimado}</h6>
        <h6>RESIDENTE: ${pessoa.residente_em}</h6>
        <div class='p-5 rounded-lg' ${mostrarBotoes ? "" : "hidden"} >
        <button id='btn' ">Alterar</button>

          <button onclick='deleteDesaparecido(${pessoa.id})'>Excluir</button>
          </div>
      
        </div>
     
          
   `;

  document.getElementById(`btn`).onclick = function () {
    alterar(pessoa);
  };
  modal.style.display = "flex";
  overlay.style.display = "block";

  overlay.onclick = function () {
    modal.style.display = "none";
    overlay.style.display = "none";
  };
}

function alterar(pessoa) {
  const modal = document.getElementById("modal");
  const overlay = document.getElementById("overlay");

  modal.innerHTML = "";

  modal.innerHTML = `
  <div class='bg-[#191919] p-5 rounded-lg  justify-center flex flex-col  '>
    
  <label for="nomeAlterar">NOME COMPLETO: </label>
  <input type="text" required id="nomeAlterar" class='text-black'>

  <label for="cpfAlterar">CPF: </label>
  <input type="text" id="cpfAlterar" class='text-black'>

  

  <label for="generoAlterar">GÊNERO: </label>
  <input type="text" id="generoAlterar" class='text-black'>

  <label for="olhosAlterar">OLHOS: </label>
  <input type="text" id="olhosAlterar" class='text-black'>

  <label for="altEstAlterar">ALTURA ESTIMADA: </label>
  <input type="text" id="altEstAlterar" class='text-black'>

  <label for="pesoAlterar">PESO ESTIMADO: </label>
  <input type="text" id="pesoAlterar" class='text-black'> 

  <label for="cabeloAlterar">CABELO: </label>
  <input type="text" id="cabeloAlterar" class='text-black'>

  <label for="CARACTERISTICAS">CARACTERISTICAS FISICAS: </label>
  <input type="text" id="caracteAlterar" class='text-black'>

  <label for="vestimentasAlterar">VESTIMENTAS: </label>
  <input type="text" id="vestimentasAlterar" class='text-black'>

  <label for="residenteAlterar">RESIDENTE EM: </label>
  <input type="text" id="residenteAlterar" class='text-black'>


  <label for="dtDesaAlterar">DATA DESAPARECIMENTO: </label>
  <input type="date" required id="dtDesaAlterar" class='text-black'>

  <label for="localDesaAlterar">LOCAL DESAPARECIMENTO: </label>
  <input type="text" id="localDesaAlterar" class='text-black'>

  <label for="detalhesAlterar">DETALHES DESAPARECIMENTO: </label>
  <textarea class="border p-2 text-black" name="" id="detalhesAlterar" cols="10" rows="2"></textarea>

  <label for="contatoAlterar">CONTATO: </label>
  <input type="text" id="contatoAlterar" class='text-black'>

    

    <button onclick='updateDesaparecido(${pessoa.id})'>ALterar</button>
      </div>
  `;
  document.getElementById("nomeAlterar").value = pessoa.nome;
  document.getElementById("cpfAlterar").value = pessoa.cpf;
  document.getElementById("generoAlterar").value = pessoa.genero;
  document.getElementById("olhosAlterar").value = pessoa.olhos;
  document.getElementById("altEstAlterar").value = pessoa.altura_estimada;
  document.getElementById("pesoAlterar").value = pessoa.peso_estimado;
  document.getElementById("cabeloAlterar").value = pessoa.cabelo;
  document.getElementById("caracteAlterar").value =
    pessoa.caracteristicas_fisicas;
  document.getElementById("vestimentasAlterar").value = pessoa.vestimentas;

  document.getElementById("residenteAlterar").value = pessoa.residente_em;
  document.getElementById("dtDesaAlterar").value = pessoa.data_desaparecimento;
  document.getElementById("localDesaAlterar").value =
    pessoa.local_desaparecimento;

  document.getElementById("detalhesAlterar").value =
    pessoa.detalhes_desaparecimento;
  document.getElementById("contatoAlterar").value = pessoa.contato;

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

  if (isNaN(conv)) {
    alert("ID inválido");
    return;
  }

  fetch(`http://localhost:3000/pessoa/${conv}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erro ao excluir pessoa");
      }
      return response.json();
    })
    .then((data) => {
      alert("Pessoa deletada com sucesso");
    })
    .catch((error) => {
      alert("Erro: " + error.message);
    });
}


function updateDesaparecido(id) {
  const conv = parseInt(id);
  

  const formData = new FormData();
  formData.append("id", conv);
  formData.append("nome", document.getElementById("nomeAlterar").value);
  formData.append("cpf", document.getElementById("cpfAlterar").value);
  formData.append("genero", document.getElementById("generoAlterar").value);
  formData.append("olhos", document.getElementById("olhosAlterar").value);
  formData.append("altura_estimada", document.getElementById("altEstAlterar").value);
  formData.append("peso_estimado", document.getElementById("pesoAlterar").value);
  formData.append("cabelo", document.getElementById("cabeloAlterar").value);
  formData.append("caracteristicas_fisicas", document.getElementById("caracteAlterar").value);
  formData.append("vestimentas", document.getElementById("vestimentasAlterar").value);
  formData.append("residente_em", document.getElementById("residenteAlterar").value);
  formData.append("data_desaparecimento", document.getElementById("dtDesaAlterar").value);
  formData.append("local_desaparecimento", document.getElementById("localDesaAlterar").value);
  formData.append("detalhes_desaparecimento", document.getElementById("detalhesAlterar").value);
  formData.append("contato", document.getElementById("contatoAlterar").value);


    fetch(`http://localhost:3000/pessoa/${conv}`, {
      method: "PUT",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
     
        alert(data.message);
        console.log("Alterado  com sucesso!");
      })
      .catch((error) => console.log("Erro:" + error));
}
