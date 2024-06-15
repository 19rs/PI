let pagina = 1;
let totalPaginas = null;





function cadastrarDesaparecido() {
  let perfilUsuario = sessionStorage.getItem("userProfile");

  if (!perfilUsuario || parseInt(perfilUsuario) !== 1) {
    alert("Proibido");
    return;
  } else {
    window.location.href = "../screens/cadastrarDesaparecido.html";
  }
}

function listarDesaparecidos() {
  fetch(`http://localhost:3000/pessoas/?pagina=${pagina}`)
    .then((response) => response.json())
    .then(function (data) {
      criarCardsPessoas(data.pessoas);
      totalPaginas = data.totalPaginas;
      mostrarTotalPaginas();
    })
    .catch((error) => console.error("Erro:", error));
}

function mostrarTotalPaginas() {
  let paginacao = document.getElementById("paginacao");
  paginacao.className = paginacao.className.replace("hidden", "");

  let spanPagina = document.getElementById("spanPagina");
  spanPagina.innerHTML = pagina + " de " + totalPaginas;

  let botaoPaginaAnterior = document.getElementById("botaoPaginaAnterior");
  let botaoProximaPagina = document.getElementById("botaoProximaPagina");

  if (totalPaginas == 1) {
    botaoPaginaAnterior.setAttribute("disabled", "true");
    botaoPaginaAnterior.className = "text-gray-300";

    botaoProximaPagina.setAttribute("disabled", "true");
    botaoProximaPagina.className = "text-gray-300";
  } else if (pagina != totalPaginas) {
    botaoProximaPagina.removeAttribute("disabled");
    botaoProximaPagina.className =
      "text-black hover:underline hover:underline-offset-4";
  }
}

function avancarPagina() {
  pagina++;

  if (pagina == totalPaginas) {
    let botaoProximaPagina = document.getElementById("botaoProximaPagina");
    botaoProximaPagina.setAttribute("disabled", "true");
    botaoProximaPagina.className = "text-gray-300";
  }

  let botaoPaginaAnterior = document.getElementById("botaoPaginaAnterior");
  botaoPaginaAnterior.removeAttribute("disabled");
  botaoPaginaAnterior.className =
    "text-black hover:underline hover:underline-offset-4";

  mostrarTotalPaginas();

  filtrarDesaparecidos();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function voltarPagina() {
  pagina--;

  if (pagina == 1) {
    let botaoPaginaAnterior = document.getElementById("botaoPaginaAnterior");
    botaoPaginaAnterior.setAttribute("disabled", "true");
    botaoPaginaAnterior.className = "text-gray-300";
  }

  let botaoProximaPagina = document.getElementById("botaoProximaPagina");
  botaoProximaPagina.removeAttribute("disabled");
  botaoProximaPagina.className =
    "text-black hover:underline hover:underline-offset-4";

  mostrarTotalPaginas();

  filtrarDesaparecidos();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function criarCardsPessoas(data) {
  let listaDesparecidos = document.getElementById("listaDesparecidos");
  console.log(listaDesparecidos);
  listaDesparecidos.innerHTML = "";

  data.forEach((pessoa) => {
    let div = document.createElement("div");
    // div.className = "shadow border border-gray-300 rounded cursor-pointer";
    div.className =
      "shadow-md rounded cursor-pointer border border-gray-100 relative  ";

    let perfilUsuario = sessionStorage.getItem("userProfile");
    let mostrarBotoes = parseInt(perfilUsuario) === 1;

    div.addEventListener("mouseover", function () {
      mostrarBotoes
        ? (div.querySelector("#teste").style.display = "block")
        : div.addEventListener("click", function () {
            renderItem(pessoa.id);
          });
    });

    div.addEventListener("mouseleave", function () {
      div.querySelector("#teste").style.display = "none";
    });

    // div.addEventListener("click", function () {
    //   renderItem(pessoa.id);
    // });

    listaDesparecidos.appendChild(div);

    div.innerHTML += `
                    <div id="teste" class="hidden  absolute top-5 left-1/2 transform -translate-x-1/2 -translate-y-1/2   }">
                    <span class="inline-flex -space-x-px overflow-hidden rounded-md border bg-white shadow-sm">
                    <button onclick="alterar(${pessoa.id})"
                  
                    class="inline-block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:relative"
                    >
                    Editar
                    </button>
                  
                    <button  onclick="renderItem(${pessoa.id})"
               
                    class="inline-block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:relative"
                    >
                    Ver
                    </button>
                  
                    <button onclick="deleteDesaparecido(${pessoa.id})"
                   
                    class="inline-block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:relative"
                    >
                    Deletar
                    </button>
                    </span>

                    </div>

      <div class='md:size-72'>
          <img class='h-full w-full rounded-tl-sm rounded-tr-sm'  src=${
            pessoa.foto ? pessoa.foto : "img/pessoas/SemFoto.png"
          } alt="foto desaparecido">
      </div>
      <div class="w-full ">
          <h1 class='px-2 text-center font-bold text-lg border-gray-300 bg-gray-200 py-3 truncate'>${
            pessoa.nome !== "null" ? pessoa.nome : "Nao Definido"
          }</h1>
          <h2 class='px-3 py-3 border-b'>Nascimento: <b>${
            pessoa.data_nascimento !== "null"
              ? pessoa.data_nascimento
              : "Nao Definido"
          }</b></h2>
          
          <h2 class='px-3 py-3'>Local: <b>${
            pessoa.local_desaparecimento !== "null"
              ? pessoa.local_desaparecimento
              : "Nao Definido"
          }</b></h2>
      </div>
      `;
  });
}

async function getPessoaById(id) {
  try {
    const response = await fetch(`http://localhost:3000/pessoa/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Erro ao buscar pessoa");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao buscar pessoa:", error);
    throw error;
  }
}

async function renderItem(id) {
  const modal = document.getElementById("modal");
  const overlay = document.getElementById("overlay");
  let perfilUsuario = sessionStorage.getItem("userProfile");
  let mostrarBotoes = parseInt(perfilUsuario) === 1;

  const pessoa = await getPessoaById(id);

  const anoAtual = new Date().getFullYear();

  const anoNascimento = pessoa.data_nascimento
    ? pessoa.data_nascimento.substring(0, 4)
    : 0;

  let idade = anoAtual - anoNascimento;

  modal.classList.add("bg-zinc-100","rounded-lg");

  modal.innerHTML = ` `;

  modal.innerHTML = `
    <div class=' grid grid-cols-2 w-[80vw] h-[80vh] '>
          
          <div class='flex items-center justify-center relative bg-zinc-100' >
          <img src="${pessoa.foto}" class='size-[600px] object-contain'  />

              <div class='absolute bottom-8 right-10 cursor-pointer' onclick='compartilharPDF(${pessoa.id})'>
              <img src='../screens/img/whatsapp.png' class='size-12'  />
              </div>
          </div>

      

      <div class=' border-l-2 border-zinc-300 flex flex-col items-center justify-center bg-zinc-100'>
          <div class='flex justify-end w-full pr-20 mb-2' >
            <svg class='cursor-pointer' id='svg' width="35px" height="35px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000" stroke-width="0.00024000000000000003"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10.0303 8.96967C9.73741 8.67678 9.26253 8.67678 8.96964 8.96967C8.67675 9.26256 8.67675 9.73744 8.96964 10.0303L10.9393 12L8.96966 13.9697C8.67677 14.2626 8.67677 14.7374 8.96966 15.0303C9.26255 15.3232 9.73743 15.3232 10.0303 15.0303L12 13.0607L13.9696 15.0303C14.2625 15.3232 14.7374 15.3232 15.0303 15.0303C15.3232 14.7374 15.3232 14.2625 15.0303 13.9697L13.0606 12L15.0303 10.0303C15.3232 9.73746 15.3232 9.26258 15.0303 8.96969C14.7374 8.6768 14.2625 8.6768 13.9696 8.96969L12 10.9394L10.0303 8.96967Z" fill="#ae0a0a"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M12.0574 1.25H11.9426C9.63424 1.24999 7.82519 1.24998 6.41371 1.43975C4.96897 1.63399 3.82895 2.03933 2.93414 2.93414C2.03933 3.82895 1.63399 4.96897 1.43975 6.41371C1.24998 7.82519 1.24999 9.63422 1.25 11.9426V12.0574C1.24999 14.3658 1.24998 16.1748 1.43975 17.5863C1.63399 19.031 2.03933 20.1711 2.93414 21.0659C3.82895 21.9607 4.96897 22.366 6.41371 22.5603C7.82519 22.75 9.63423 22.75 11.9426 22.75H12.0574C14.3658 22.75 16.1748 22.75 17.5863 22.5603C19.031 22.366 20.1711 21.9607 21.0659 21.0659C21.9607 20.1711 22.366 19.031 22.5603 17.5863C22.75 16.1748 22.75 14.3658 22.75 12.0574V11.9426C22.75 9.63423 22.75 7.82519 22.5603 6.41371C22.366 4.96897 21.9607 3.82895 21.0659 2.93414C20.1711 2.03933 19.031 1.63399 17.5863 1.43975C16.1748 1.24998 14.3658 1.24999 12.0574 1.25ZM3.9948 3.9948C4.56445 3.42514 5.33517 3.09825 6.61358 2.92637C7.91356 2.75159 9.62177 2.75 12 2.75C14.3782 2.75 16.0864 2.75159 17.3864 2.92637C18.6648 3.09825 19.4355 3.42514 20.0052 3.9948C20.5749 4.56445 20.9018 5.33517 21.0736 6.61358C21.2484 7.91356 21.25 9.62177 21.25 12C21.25 14.3782 21.2484 16.0864 21.0736 17.3864C20.9018 18.6648 20.5749 19.4355 20.0052 20.0052C19.4355 20.5749 18.6648 20.9018 17.3864 21.0736C16.0864 21.2484 14.3782 21.25 12 21.25C9.62177 21.25 7.91356 21.2484 6.61358 21.0736C5.33517 20.9018 4.56445 20.5749 3.9948 20.0052C3.42514 19.4355 3.09825 18.6648 2.92637 17.3864C2.75159 16.0864 2.75 14.3782 2.75 12C2.75 9.62177 2.75159 7.91356 2.92637 6.61358C3.09825 5.33517 3.42514 4.56445 3.9948 3.9948Z" fill="#ae0a0a"></path> </g></svg>

          </div>

              <div class='grid grid-cols-2 items-start  p-3'>
                   
                  <div class=' flex items-center justify-center w-[15vw] '> 
                      <dl class="-my-3 divide-y  divide-zinc-500 text-md w-5/6   ">
                      
                          <div class="grid grid-cols-1 gap-1 p-3 ">
                          <dt class="font-bold text-gray-900">Nome</dt>
                          <dd class="font-semibold text-gray-700 capitalize sm:col-span-2">${
                            pessoa.nome !== null && pessoa.nome !== "null" ? pessoa.nome : "Nao Informado."

                          }</dd>
                          </div>

                          <div class="grid grid-cols-1 gap-1 p-3 ">
                          <dt class="font-bold text-gray-900">Gênero</dt>
                          <dd class="font-semibold text-gray-700 capitalize sm:col-span-2">${
                            pessoa.genero !== null && pessoa.genero !== "null" ? pessoa.genero : "Nao Informado."

                          }</dd>
                          </div>

                          <div class="grid grid-cols-1 gap-1 p-3 ">
                          <dt class="font-bold text-gray-900">Idade</dt>
                          <dd class="font-semibold text-gray-700 capitalize sm:col-span-2">${
                          !isNaN(idade) ? idade : "Nao Informado."
                          }</dd>
                          </div>

                          <div class="grid grid-cols-1 gap-1 p-3 ">
                          <dt class="font-bold text-gray-900">Residente</dt>
                          <dd class="font-semibold text-gray-700 capitalize sm:col-span-2">${
                             pessoa.residente !== null && pessoa.residente !== "null" ? pessoa.residente : "Nao Informado."
                          }</dd>
                          </div>

                          <div class="grid grid-cols-1 gap-1 p-3 ">
                          <dt class="font-bold text-gray-900">Data Nascimento</dt>
                          <dd class="font-semibold text-gray-700 capitalize sm:col-span-2"> ${
                          pessoa.data_nascimento !== null && pessoa.data_nascimento !== "null" ? pessoa.data_nascimento : "Nao Informado."
                          }</dd>
                          </div>


                          <div class="grid grid-cols-1 gap-1 p-3 ">
                          <dt class="font-bold text-gray-900">Contato</dt>
                          <dd class="font-semibold text-gray-700 capitalize sm:col-span-2">${
                            pessoa.contato !== null && pessoa.contato !== "null" ? pessoa.contato : "Nao Informado."
                          }</dd>
                          </div>


                          <div class="grid grid-cols-1 gap-1 p-3 ">
                          <dt class="font-bold text-gray-900">Olhos</dt>
                          <dd class="font-semibold text-gray-700 capitalize sm:col-span-2"> ${
                          pessoa.olhos !== null && pessoa.olhos !== "null" ? pessoa.olhos : "Nao Informado."
                          }</dd>
                          </div>

                          <div class="grid grid-cols-1 gap-1 p-3 ">
                          <dt class="font-bold text-gray-900">Altura</dt>
                          <dd class="font-semibold text-gray-700 capitalize sm:col-span-2">${
                          pessoa.altura !== null && pessoa.altura !== "null" ? pessoa.altura : "Nao Informado."
                          }</dd>
                          </div>
                      </dl>
                  </div>
                  
                  <div class=' flex items-center justify-center w-[15vw] '> 
                       <dl class="-my-3 divide-y  divide-zinc-500 text-md w-5/6">
                             
                              <div class="grid grid-cols-1 gap-1 p-3 ">
                              <dt class="font-bold text-gray-900">Peso</dt>
                              <dd class="font-semibold text-gray-700 capitalize sm:col-span-2"> ${
                               pessoa.peso !== null && pessoa.peso !== "null" ? pessoa.peso : "Nao Informado."
                              }</dd>
                              </div>

                              <div class="grid grid-cols-1 gap-1 p-3 ">
                              <dt class="font-bold text-gray-900">Cabelo</dt>
                              <dd class="font-semibold text-gray-700 capitalize sm:col-span-2"> ${
                               pessoa.cabelo !== null && pessoa.cabelo !== "null" ? pessoa.cabelo : "Nao Informado."
                              }</dd>
                              </div>

                              <div class="grid grid-cols-1 gap-1 p-3 ">
                              <dt class="font-bold text-gray-900">Características</dt>
                              <dd class="font-semibold text-gray-700 capitalize sm:col-span-2">  ${
                              pessoa.caracte !== null && pessoa.caracte !== "null" ? pessoa.caracte : "Nao Informado."
                              }</dd>
                              </div>

                      
                              <div class="grid grid-cols-1 gap-1 p-3 ">
                              <dt class="font-bold text-gray-900">Vestimentas</dt>
                              <dd class="font-semibold text-gray-700 capitalize sm:col-span-2"> ${
                                pessoa.vestimentas !== null && pessoa.vestimentas !== "null" ? pessoa.vestimentas : "Nao Informado."
                              }</dd>
                              </div>

                              <div class="grid grid-cols-1 gap-1 p-3 ">
                              <dt class="font-bold text-gray-900">Local do Desaparecimento</dt>
                              <dd class="font-semibold text-gray-700 capitalize sm:col-span-2">${
                              pessoa.local_desaparecimento !== null && pessoa.local_desaparecimento !== "null" ? pessoa.local_desaparecimento : "Nao Informado."
                              }</dd>
                              </div>


                              <div class="grid grid-cols-1 gap-1 p-3 ">
                              <dt class="font-bold text-gray-900">Data do Desaparecimento</dt>
                              <dd class="font-semibold text-gray-700 capitalize sm:col-span-2">${
                             pessoa.data_desaparecimento !== null && pessoa.data_desaparecimento !== "null" ? pessoa.data_desaparecimento : "Nao Informado."
                              }</dd>
                              </div>

                              <div class="grid grid-cols-1 gap-1 p-3 ">
                              <dt class="font-bold text-gray-900">Detalhes</dt>
                              <dd class="font-semibold text-gray-700 capitalize sm:col-span-2 h-10">
                              ${
                              pessoa.detalhes_desaparecimento !== null && pessoa.detalhes_desaparecimento !== "null" ? pessoa.detalhes_desaparecimento : "Nao Informado."
                              }
                              </dd>
                              </div>
                          </dl>
            </div>
                  
                  
                  
                  
             </div>      
                  
                  
                  
                  
                  
                  
                
                    
      </div> 
                    
                    

    </div>

   `;

  modal.style.display = "flex";
  overlay.style.display = "block";

  overlay.onclick = function () {
    modal.style.display = "none";
    overlay.style.display = "none";
  };

  document.getElementById("svg").addEventListener("click", function () {
    modal.style.display = "none";
    overlay.style.display = "none";
  });
}

async function gerarPDF(id) {
  const pessoa = await getPessoaById(id);
  const div = document.createElement("div");

  const anoNascimento = pessoa.data_nascimento
    ? pessoa.data_nascimento.substring(0, 4)
    : 0;
  const anoAtual = new Date().getFullYear();

  let idade = anoAtual - anoNascimento;

  div.innerHTML += `
  <div class='flex w-full h-full'>
      <div class='flex flex-col w-full'>
          <div class='flex justify-center' style='width: 100%; max-width: 500px; margin: 0 auto;'>
              <img src='${pessoa.foto}' style='width: 100%; height: auto; object-cover: cover;'/>
          </div>
          <div class='flex flex-col' style='margin-top:3rem;'>
              <span class='font-semibold first-letter:capitalize p-1'>
                  <strong class='font-bold tracking-wider'>Nome: </strong> ${pessoa.nome}
              </span>
              <span class='font-semibold first-letter:capitalize p-1'>
                  <strong class='font-bold tracking-wider'>Contato: </strong> ${pessoa.contato}
              </span>
              <span class='font-semibold first-letter:capitalize p-1'>
                  <strong class='font-bold tracking-wider'>Gênero: </strong> ${pessoa.genero}
              </span>
              <span class='font-semibold first-letter:capitalize p-1'>
                  <strong class='font-bold tracking-wider'>Data Nascimento: </strong> ${pessoa.data_nascimento}
              </span>
              <span class='font-semibold first-letter:capitalize p-1'>
                  <strong class='font-bold tracking-wider'>Idade: </strong>${idade}
              </span>
              <span class='font-semibold first-letter:capitalize p-1'>
                  <strong class='font-bold tracking-wider'>Residente: </strong> ${pessoa.residente}
              </span>
          </div>
          <div class='flex flex-col'>
              <span class='font-semibold first-letter:capitalize p-1'>
                  <strong class='font-bold tracking-wider'>Olhos: </strong>  ${pessoa.olhos}
              </span>
              <span class='font-semibold first-letter:capitalize p-1'>
                  <strong class='font-bold tracking-wider'>Altura: </strong>  ${pessoa.altura}
              </span>
              <span class='font-semibold first-letter:capitalize p-1'>
                  <strong class='font-bold tracking-wider'>Peso: </strong>  ${pessoa.peso}
              </span>
              <span class='font-semibold first-letter:capitalize p-1'>
                  <strong class='font-bold tracking-wider'>Cabelo: </strong>  ${pessoa.cabelo}
              </span>
              <span class='font-semibold first-letter:capitalize p-1'>
                  <strong class='font-bold tracking-wider'>Características: </strong>  ${pessoa.caracte}
              </span>
          </div>
          <div class='flex flex-col'>
              <span class='font-semibold first-letter:capitalize p-1'>
                  <strong class='font-bold tracking-wider'>Detalhes do Desaparecimento: </strong>  ${pessoa.detalhes_desaparecimento}
              </span>
              <span class='font-semibold first-letter:capitalize p-1'>
                  <strong class='font-bold tracking-wider'>Vestimentas: </strong>  ${pessoa.vestimentas}
              </span>
              <span class='font-semibold first-letter:capitalize p-1'>
                  <strong class='font-bold tracking-wider'>Local do Desaparecimento: </strong>  ${pessoa.local_desaparecimento}
              </span>
              <span class='font-semibold first-letter:capitalize p-1'>
                  <strong class='font-bold tracking-wider'>Data do Desaparecimento: </strong>  ${pessoa.data_desaparecimento}
              </span>
          </div>
      </div>
  </div>
`;

const options = {
  margin: 10,
  filename: `${pessoa.nome}.pdf`,
  image: { type: "jpeg", quality: 1 },
  html2canvas: { scale: 2 },
  jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
};

const pdfBlob = await html2pdf().from(div).set(options).outputPdf("blob");

return pdfBlob;

}

async function compartilharPDF(id) {
  const pessoa = await getPessoaById(id);
  const pdfBlob = await gerarPDF(id);

  const pdfUrl = URL.createObjectURL(pdfBlob);
  let mensagem = encodeURIComponent(pdfUrl);

  mensagem = mensagem.replace(/%3A/g, ":");
  mensagem = mensagem.replace(/%2F/g, "/");

  let timerInterval;
  Swal.fire({
    title: "Redirecionando",
    timer: 2000,
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading();
      const timer = Swal.getPopup().querySelector("b");
      timerInterval = setInterval(() => {
        timer.textContent = `${Swal.getTimerLeft()}`;
      }, 100);
    },
    willClose: () => {
      clearInterval(timerInterval);
    },
  }).then((result) => {
    /* Read more about handling dismissals below */
    if (result.dismiss === Swal.DismissReason.timer) {
      console.log("I was closed by the timer");
      const linkWhatsApp = `https://api.whatsapp.com/send?text=${
        pessoa.nome + " " + mensagem
      }`;
      window.open(linkWhatsApp);
    }
  });
}

async function alterar(id) {
  const modal = document.getElementById("modal");
  const overlay = document.getElementById("overlay");

  modal.style.display = "block";
  overlay.style.display = "block";

  const pessoa = await getPessoaById(id);

  modal.innerHTML = "";

  modal.innerHTML = `
    <div class='w-[70vw] rounded '>


    <form id="form" class='w-full flex flex-col  gap-5 p-5 bg-[#F8F8F8] ' onsubmit="event.preventDefault();  updateDesaparecido(${id})">
        <div class="flex flex-col text-gray-900">
            <div class='w-full flex gap-1 flex-col mt-2 '>
                <div class='flex justify-between'>
                  <h2 class="text-2xl md:text-3xl pl-2 border-l-4 text-justify font-sans font-bold border-zinc-700">Atualização de Informações</h2>
                  <svg class='cursor-pointer' id='svg' width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000" stroke-width="0.00024000000000000003"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10.0303 8.96967C9.73741 8.67678 9.26253 8.67678 8.96964 8.96967C8.67675 9.26256 8.67675 9.73744 8.96964 10.0303L10.9393 12L8.96966 13.9697C8.67677 14.2626 8.67677 14.7374 8.96966 15.0303C9.26255 15.3232 9.73743 15.3232 10.0303 15.0303L12 13.0607L13.9696 15.0303C14.2625 15.3232 14.7374 15.3232 15.0303 15.0303C15.3232 14.7374 15.3232 14.2625 15.0303 13.9697L13.0606 12L15.0303 10.0303C15.3232 9.73746 15.3232 9.26258 15.0303 8.96969C14.7374 8.6768 14.2625 8.6768 13.9696 8.96969L12 10.9394L10.0303 8.96967Z" fill="#ae0a0a"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M12.0574 1.25H11.9426C9.63424 1.24999 7.82519 1.24998 6.41371 1.43975C4.96897 1.63399 3.82895 2.03933 2.93414 2.93414C2.03933 3.82895 1.63399 4.96897 1.43975 6.41371C1.24998 7.82519 1.24999 9.63422 1.25 11.9426V12.0574C1.24999 14.3658 1.24998 16.1748 1.43975 17.5863C1.63399 19.031 2.03933 20.1711 2.93414 21.0659C3.82895 21.9607 4.96897 22.366 6.41371 22.5603C7.82519 22.75 9.63423 22.75 11.9426 22.75H12.0574C14.3658 22.75 16.1748 22.75 17.5863 22.5603C19.031 22.366 20.1711 21.9607 21.0659 21.0659C21.9607 20.1711 22.366 19.031 22.5603 17.5863C22.75 16.1748 22.75 14.3658 22.75 12.0574V11.9426C22.75 9.63423 22.75 7.82519 22.5603 6.41371C22.366 4.96897 21.9607 3.82895 21.0659 2.93414C20.1711 2.03933 19.031 1.63399 17.5863 1.43975C16.1748 1.24998 14.3658 1.24999 12.0574 1.25ZM3.9948 3.9948C4.56445 3.42514 5.33517 3.09825 6.61358 2.92637C7.91356 2.75159 9.62177 2.75 12 2.75C14.3782 2.75 16.0864 2.75159 17.3864 2.92637C18.6648 3.09825 19.4355 3.42514 20.0052 3.9948C20.5749 4.56445 20.9018 5.33517 21.0736 6.61358C21.2484 7.91356 21.25 9.62177 21.25 12C21.25 14.3782 21.2484 16.0864 21.0736 17.3864C20.9018 18.6648 20.5749 19.4355 20.0052 20.0052C19.4355 20.5749 18.6648 20.9018 17.3864 21.0736C16.0864 21.2484 14.3782 21.25 12 21.25C9.62177 21.25 7.91356 21.2484 6.61358 21.0736C5.33517 20.9018 4.56445 20.5749 3.9948 20.0052C3.42514 19.4355 3.09825 18.6648 2.92637 17.3864C2.75159 16.0864 2.75 14.3782 2.75 12C2.75 9.62177 2.75159 7.91356 2.92637 6.61358C3.09825 5.33517 3.42514 4.56445 3.9948 3.9948Z" fill="#ae0a0a"></path> </g></svg>
                </div>
           
            <p class="pb-5 pl-2 text-base text-gray-700 font-semibold">Aqui você pode atualizar informações das pessoas. Mantenha seus dados atualizados para garantir a precisão e facilitar a busca.</p>

         </div>
   
            <div class='grid grid-cols-2 gap-x-5'>
            <div class='flex flex-col gap-3'>
           <div>
          <label for="nome" class="font-semibold relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
          <input type="text" id="nomeAlterar" placeholder="Nome" class=" text-gray-700 peer h-9 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"/>
          <span class="font-bold absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-900 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">Nome</span>
          </label>
        </div>

         <div>
          <label for="nome" class="font-semibold relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
          <input type="text" id="generoAlterar" placeholder="generoAlterar" class="text-gray-900 peer h-9 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"/>
          <span class="font-bold absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-900 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">Genero</span>
          </label>
        </div>

         <div>
          <label for="nome" class="font-semibold relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
          <input type="text" id="olhosAlterar" placeholder="olhosAlterar" class="text-gray-900 peer h-9 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"/>
          <span class="font-bold absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-900 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">Olhos</span>
          </label>
        </div>

         <div>
          <label for="nome" class="font-semibold relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
          <input type="text" id="pesoAlterar" placeholder="pesoAlterar" class="text-gray-900 peer h-9 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"/>
          <span class="font-bold absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-900 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">Peso</span>
          </label>
         </div>

         <div>
          <label for="nome" class="font-semibold relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
          <input type="text" id="cabeloAlterar" placeholder="cabeloAlterar" class="text-gray-900 peer h-9 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"/>
          <span class="font-bold absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-900 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">Cabelo</span>
          </label>
         </div>

         <div>
          <label for="nome" class="font-semibold relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
          <input type="text" id="caracteAlterar" placeholder="caracteAlterar" class="text-gray-900 peer h-9 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"/>
          <span class="font-bold absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-900 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">Características</span>
          </label>
         </div>

          <div>
          <label for="nome" class="font-semibold relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
          <input type="date" id="dataNascAlterar" placeholder="dataNascAlterar" class=" text-gray-700 peer h-9 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"/>
          <span class="font-bold absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-900 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">Data Nascimento</span>
          </label>
        </div>
         
          </div>

       

            <div class='flex flex-col gap-3'>
           <div>
          <label for="nome" class="font-semibold relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
          <input type="text" id="vestimentasAlterar" placeholder="vestimentasAlterar" class="text-gray-900 peer h-9 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"/>
          <span class="font-bold absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-900 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">Vestimentas</span>
          </label>
         </div>

         <div>
          <label for="nome" class="font-semibold relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
          <input type="text" id="residenteAlterar" placeholder="residenteAlterar" class="text-gray-900 peer h-9 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"/>
          <span class="font-bold absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-900 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">Residente</span>
          </label>
         </div>

          <div>
            <label for="nome" class="font-semibold relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
            <input type="date" id="dtDesaAlterar" placeholder="dtDesaAlterar" class="text-gray-900 peer h-9 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"/>
            <span class="font-bold absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-900 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">Data Desaparecimento</span>
            </label>
          </div>

          <div>
            <label for="nome" class="font-semibold relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
            <input type="text" id="localDesaAlterar" placeholder="localDesaAlterar" class="text-gray-900 peer h-9 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"/>
            <span class="font-bold absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-900 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">Cidade Desaparecimento</span>
            </label>
          </div>

          <div>
            <label for="nome" class="font-semibold relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
            <input type="text" id="detalhesAlterar" placeholder="detalhesAlterar" class="text-gray-900 peer h-9 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"/>
            <span class="font-bold absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-900 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">Detalhes</span>
            </label>
          </div>

          <div>
            <label for="nome" class="font-semibold relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
            <input type="text" id="contatoAlterar" placeholder="contatoAlterar" class="text-gray-900 peer h-9 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"/>
            <span class="font-bold absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-900 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">Contato</span>
            </label>
          </div>

           <div>
          <label for="nome" class="font-semibold relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
          <input type="text" id="alturaAlterar" placeholder="alturaAlterar" class=" text-gray-700 peer h-9 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"/>
          <span class="font-bold absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-900 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">Altura</span>
          </label>
        </div>
         </div>
            
            </div>
    
     

       

            <input type="submit" value="Alterar"  class=" mt-3 cursor-pointer block rounded bg-[#252525] px-8 py-3 text-lg font-semibold text-white transition hover:scale-[1.0100] hover:shadow-lg focus:outline-none">

    
    </form>

    </div>

  
  `;

  document.getElementById("nomeAlterar").value =
    pessoa.nome !== "null" ? pessoa.nome : "Nao Definido";
  document.getElementById("generoAlterar").value =
    pessoa.genero !== "null" ? pessoa.genero : "Nao Definido";
  document.getElementById("olhosAlterar").value =
    pessoa.olhos !== "null" ? pessoa.olhos : "Nao Definido";
  document.getElementById("pesoAlterar").value =
    pessoa.peso !== "null" ? pessoa.peso : "Nao Definido";
  document.getElementById("cabeloAlterar").value =
    pessoa.cabelo !== "null" ? pessoa.cabelo : "Nao Definido";
  document.getElementById("caracteAlterar").value =
    pessoa.caracte !== "null" ? pessoa.caracte : "Nao Definido";
  document.getElementById("vestimentasAlterar").value =
    pessoa.vestimentas !== "null" ? pessoa.vestimentas : "Nao Definido";
  document.getElementById("residenteAlterar").value =
    pessoa.residente !== "null" ? pessoa.residente : "Nao Definido";
  document.getElementById("dtDesaAlterar").value =
    pessoa.data_desaparecimento !== "null"
      ? pessoa.data_desaparecimento
      : "Nao Definido";
  document.getElementById("localDesaAlterar").value =
    pessoa.local_desaparecimento !== "null"
      ? pessoa.local_desaparecimento
      : "Nao Definido";
  document.getElementById("detalhesAlterar").value =
    pessoa.detalhes_desaparecimento !== "null"
      ? pessoa.detalhes_desaparecimento
      : "Nao Definido";
  document.getElementById("contatoAlterar").value =
    pessoa.contato !== "null" ? pessoa.contato : "Nao Definido";
  document.getElementById("dataNascAlterar").value =
    pessoa.data_nascimento !== "null" ? pessoa.data_nascimento : "Nao Definido";
  document.getElementById("alturaAlterar").value =
    pessoa.altura !== "null" ? pessoa.altura : "Nao Definido";

  overlay.onclick = function () {
    modal.style.display = "none";
    overlay.style.display = "none";
  };

  document.getElementById("svg").addEventListener("click", function () {
    modal.style.display = "none";
    overlay.style.display = "none";
  });
}

function saveSession(key, item) {
  sessionStorage.setItem(key, item);
}

function back(div, page) {
  div.classList.add("hidden");
  if (page === "detalhes") {
    div.classList.remove("hidden");
    maisopcoes();
  } else if (page === "caracte") {
    div.classList.remove("hidden");
    inicio();
  }
}

function setValue(key) {
  document.getElementById(key).value = sessionStorage.getItem(key);
}

function removeSession(key) {
  sessionStorage.removeItem(key);
}

function bordasVermelhas(campo) {
  inicio();
  const bordas = document.getElementById(`label${campo}`);
  if (bordas) {
    bordas.classList.add("border-2", "border-red-500");
  }
}

function validar() {
  const camposRequired = [
    "nome",
    "contato",
    "cpf",
    "genero",
    "data_nascimento",
    "residente",
  ];

  for (let i = 0; i < camposRequired.length; i++) {
    const campo = camposRequired[i];
    const value = sessionStorage.getItem(campo);

    if (!value) {
   
      Toastify({
        text: `O Campo ${campo} é obrigatório !!!`,
        duration: 2200,
        newWindow: true,
        gravity: "top", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`
        style: {
          background: "#f8f8f8",
          color: "black",
          'font-weight':"500",

        },
        onClick: function () {}, // Callback after click
      }).showToast();
      bordasVermelhas(campo);
      return true
    }
  }
  return false
}

function inicio() {

  const div = document.getElementById("main2");
  div.innerHTML = `
  <form id="form" class="w-full md:w-3/4 lg:w-1/2 bg-zinc-50 p-8 rounded-lg shadow-md shadow-zinc-400" onsubmit="event.preventDefault(); addDesaparecidos();">
    <div class="flex flex-col"
        <div class='w-full flex gap-1 flex-col '>
          
            <h2 class="text-2xl md:text-3xl pl-2 border-l-4 text-justify font-sans font-bold border-zinc-700">Informações Pessoais</h2>
            <p class="py-5 text-sm text-gray-600">Por favor, preencha os campos abaixo com suas informações pessoais. Essas informações são necessárias para nos ajudar a
             identificá-lo(a). Seus dados serão mantidos confidenciais e não serão compartilhados com terceiros.<strong class='text-red-600/85'> Dados Obrigatórios.</strong> </p>
            
          
       
        </div>
      
        <div>
        <label for="nome" id='labelnome' class="relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
          <input onchange="saveSession(this.id, this.value)" type="text" id="nome"  placeholder="Nome" class="peer h-9 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"/>
          <span class="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">Nome</span>
        </label>
      </div>

      <div class="pt-4">
      <label for="contato" id='labelcontato' class="relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
        <input onchange="saveSession(this.id, this.value)" type="text" id="contato" placeholder="Contato" class="peer h-9 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"/>
        <span class="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">Contato</span>
      </label>
    </div>

      <div class="pt-4">
        <label for="cpf" id='labelcpf' class="relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
          <input onchange="saveSession(this.id, this.value)" type="text" id="cpf" placeholder="CPF" class="peer h-9 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"/>
          <span class="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">CPF</span>
        </label>
      </div>

      <div class="pt-4">
        <label for="genero" id='labelgenero' class="relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
          <input onchange="saveSession(this.id, this.value)" type="text" id="genero" placeholder="Gênero" class="peer h-9 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"/>
          <span class="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">Gênero</span>
        </label>
      </div>

      <div class="pt-4">
        <label for="dataNascimento" id='labeldata_nascimento' class="relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
          <input onchange="saveSession(this.id, this.value)" type="date" id="data_nascimento" placeholder="Data de Nascimento" class="peer h-9 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"/>
          <span class="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">Data de Nascimento</span>
        </label>
      </div>

      <div class="pt-4">
      <label for="residenteEm" id='labelresidente' class="relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
        <input onchange="saveSession(this.id, this.value)" type="text" id="residente" placeholder="Residente Em" class="peer h-9 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"/>
        <span class="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">Residente Em</span>
      </label>
    </div>

      <input onclick="maisopcoes()" type="submit" value="Avançar" id="btn" class="w-full mt-5 cursor-pointer block rounded bg-[#252525] px-8 py-3 text-sm font-medium text-white transition hover:scale-[1.05] hover:shadow-xl focus:outline-none">
    </div>
  </form>
  `;

  const keys = [
    "nome",
    "contato",
    "cpf",
    "genero",
    "data_nascimento",
    "residente",
  ];

  keys.forEach((key) => {
    setValue(key);
  });
}

function maisopcoes() {
  const container = document.getElementById("form");

  const ok = document.createElement("div");
  ok.classList.add("flex", "flex-col");

  ok.innerHTML = `
  

        <div class='flex flex-col  w-full'>
            <div class=' flex justify-between'>
            <h2 class="text-2xl md:text-3xl pl-2  border-l-4 text-justify font-sans font-bold border-zinc-700">Características Físicas</h2>
            <svg class='cursor-pointer ' onclick='back(this.parentNode.parentNode.parentNode, "caracte")' width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M3 12C3 4.5885 4.5885 3 12 3C19.4115 3 21 4.5885 21 12C21 19.4115 19.4115 21 12 21C4.5885 21 3 19.4115 3 12Z" stroke="#191919" stroke-width="1.9440000000000002"></path> <path d="M8 12L16 12" stroke="#191919" stroke-width="1.9440000000000002" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M11 9L8.08704 11.913V11.913C8.03897 11.961 8.03897 12.039 8.08704 12.087V12.087L11 15" stroke="#191919" stroke-width="1.9440000000000002" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
            </div>
        <p class="py-5 text-sm text-gray-600">Por favor, descreva abaixo as características físicas relevantes que possam ajudar na identificação da 
        pessoa desaparecida. 
        Quanto mais informações precisas você fornecer, melhor será a nossa capacidade de auxiliar nas buscas. <strong class='text-zinc-900'> Dados Opcionais.</strong></p>
       
       
        </div>


    

    <div>
      <label for="olhos" class="relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
        <input onchange="saveSession(this.id, this.value)" type="text" type="text" id="olhos" placeholder="Cor dos olhos" class="peer h-9 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"/>
        <span class="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">Olhos</span>
      </label>
    </div>

    <div class="pt-4">
      <label for="altura" class="relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
        <input onchange="saveSession(this.id, this.value)" type="text" type="text" id="altura" placeholder="Altura" class="peer h-9 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"/>
        <span class="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">Altura</span>
      </label>
    </div>

    <div class="pt-4">
      <label for="peso" class="relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
        <input onchange="saveSession(this.id, this.value)" type="text" type="text" id="peso" placeholder="Peso" class="peer h-9 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"/>
        <span class="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">Peso</span>
      </label>
    </div>

    <div class='pt-4'>
      <label for="cabelo" class="relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
        <input onchange="saveSession(this.id, this.value)" type="text" type="text" id="cabelo" placeholder="Cabelo" class="peer h-9 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"/>
        <span class="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">Cabelo</span>
      </label>
    </div>
    
    <div class="pt-4">
      <label for="caracte" class="relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
        <input onchange="saveSession(this.id, this.value)" type="text" type="text" id="caracte" placeholder="Características" class="peer h-9 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"/>
        <span class="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">Características</span>
      </label>
    </div>

    <div class="pt-4">
    <input type="hidden"/>
    </div>

    <input onclick="maisopcoes2()" value="Avançar" class="text-center w-full mt-5 cursor-pointer block rounded bg-[#252525] px-8 py-3 text-sm font-medium text-white transition hover:scale-[1.05] hover:shadow-xl focus:outline-none">
  `;

  container.innerHTML = "";
  container.appendChild(ok);

  const ids = ["olhos", "caracte", "cabelo", "peso", "altura"];

  ids.forEach((key) => {
    setValue(key);
  });
}

function maisopcoes2() {
  const container = document.getElementById("form");

  const ok = document.createElement("div");
  ok.classList.add("flex", "flex-col");

  ok.innerHTML = `

      <div class='flex flex-col  w-full'>
            <div class='flex justify-between'>
            <h2 class="text-2xl md:text-3xl pl-2  border-l-4 text-justify font-sans font-bold border-zinc-700">Detalhes</h2>
            <svg class='cursor-pointer ' onclick='back(this.parentNode.parentNode.parentNode, "detalhes")' width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M3 12C3 4.5885 4.5885 3 12 3C19.4115 3 21 4.5885 21 12C21 19.4115 19.4115 21 12 21C4.5885 21 3 19.4115 3 12Z" stroke="#191919" stroke-width="1.9440000000000002"></path> <path d="M8 12L16 12" stroke="#191919" stroke-width="1.9440000000000002" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M11 9L8.08704 11.913V11.913C8.03897 11.961 8.03897 12.039 8.08704 12.087V12.087L11 15" stroke="#191919" stroke-width="1.9440000000000002" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>  
            </div>
      <p class="py-5 text-sm text-gray-600">Por favor, forneça todos os detalhes relevantes sobre o desaparecimento da pessoa. 
      Isso pode incluir informações como local e cidade do desaparecimento.<strong class='text-zinc-900'> Dados Opcionais.</strong></p>
      </div>

    
    <div >
      <label for="detalhes-desaparecimento" class="relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
        <input  onchange="saveSession(this.id, this.value)" type="text" id="detalhes_desaparecimento" placeholder="Detalhes Desaparecimento" class="peer h-9 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"/>
        <span class="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">Detalhes Desaparecimento</span>
      </label>
    </div>

    <div class="pt-4">
      <label for="vestimentas" class="relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
        <input  onchange="saveSession(this.id, this.value)" type="text" id="vestimentas" placeholder="Vestimentas" class="peer h-9 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"/>
        <span class="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">Vestimentas</span>
      </label>
    </div>

    <div class="pt-4">
      <label for="localDesaparecimento" class="relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
        <input  onchange="saveSession(this.id, this.value)" type="text" id="local_desaparecimento" placeholder="Local Desaparecimento" class="peer h-9 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"/>
        <span class="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">Local Desaparecimento</span>
      </label>
    </div>

  

    <div class="pt-4">
      <label for="dataDesaparecimento" class="relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
        <input  onchange="saveSession(this.id, this.value)" type="date" id="data_desaparecimento" placeholder="Data Desaparecimento" class="peer h-9 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"/>
        <span class="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">Data Desaparecimento</span>
      </label>
    </div>

    <div class="pt-4">
      <label for="fotoDesaparecido" class="relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
        <input type="file" id="fotoDesaparecido" class="peer h-9 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"/>
      </label>
    </div>

    <div class="pt-4">
        <input type="hidden"/>
    </div>

    <input type="submit" value="Cadastrar" id="btn" class="w-full mt-5 cursor-pointer block rounded bg-[#252525] px-8 py-3 text-sm font-medium text-white transition hover:scale-[1.05] hover:shadow-xl focus:outline-none">
  `;

  container.innerHTML = "";
  container.appendChild(ok);

  const ids = [
    "data_desaparecimento",
    "local_desaparecimento",
    "vestimentas",
    "detalhes_desaparecimento",
  ];

  ids.forEach((key) => {
    setValue(key);
  });
}

function addDesaparecidos() {
  if (validar()) return;

  const campos = [
    "nome",
    "contato",
    "cpf",
    "genero",
    "data_nascimento",
    "residente",
    "olhos",
    "altura",
    "peso",
    "cabelo",
    "caracte",
    "data_desaparecimento",
    "vestimentas",
    "local_desaparecimento",
    "detalhes_desaparecimento",
  ];
  
  const formData = new FormData();

  campos.forEach((camp) => {
    const value = sessionStorage.getItem(camp);
    formData.append(camp, value ? value : null);
  });

  const inputFoto = document.getElementById("fotoDesaparecido");
  let foto = null;

  if (inputFoto.files[0]) {
    foto = inputFoto.files[0];
  }

  formData.append("foto", foto);

  fetch("http://localhost:3000/pessoas", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      alert(data.message);

      campos.forEach((campo) => {
        removeSession(campo);
      });
    })
    .catch((error) => console.log("Erro:" + error));
}


function deleteDesaparecido(id) {
  const conv = parseInt(id);

  Swal.fire({
    title: "Voce tem certeza?",
    text: "Voce nao pode reverter isso",
    icon: "warning",
    showCancelButton: true,
    cancelButtonText: "Nao, cancelar",
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sim, tenho certeza",
  }).then((result) => {
    if (result.isConfirmed) {
      fetch(`http://localhost:3000/pessoa/${conv}`, {
        method: "DELETE",
      })
        .then((data) => {
          Swal.fire({
            title: "Deletado!",
            text: "Deletado com Sucesso.",
            icon: "success",
          });
        })
        .catch((error) => {
          console.error("Erro ao excluir pessoa:", error);
          Swal.fire({
            title: "Erro",
            text: "Erro ao deletar.",
            icon: "error",
          });
        });
    }
  });
}

function updateDesaparecido(id) {
  const conv = parseInt(id);

  const formData = new FormData();
  formData.append("id", conv);
  formData.append("nome", document.getElementById("nomeAlterar").value);
  formData.append("genero", document.getElementById("generoAlterar").value);
  formData.append("olhos", document.getElementById("olhosAlterar").value);
  formData.append("peso", document.getElementById("pesoAlterar").value);
  formData.append("cabelo", document.getElementById("cabeloAlterar").value);
  formData.append("caracte", document.getElementById("caracteAlterar").value);
  formData.append(
    "vestimentas",
    document.getElementById("vestimentasAlterar").value
  );
  formData.append(
    "residente",
    document.getElementById("residenteAlterar").value
  );
  formData.append(
    "data_desaparecimento",
    document.getElementById("dtDesaAlterar").value
  );
  formData.append(
    "local_desaparecimento",
    document.getElementById("localDesaAlterar").value
  );
  formData.append(
    "detalhes_desaparecimento",
    document.getElementById("detalhesAlterar").value
  );
  formData.append("contato", document.getElementById("contatoAlterar").value);
  formData.append(
    "data_nascimento",
    document.getElementById("dataNascAlterar").value
  );
  formData.append("altura", document.getElementById("alturaAlterar").value);

  Swal.fire({
    title: "Confirmar Alterações?",
    icon: "warning",
    showCancelButton: true,
    cancelButtonText: "Cancelar",
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Confirmar",
  }).then((result) => {
    if (result.isConfirmed) {
      fetch(`http://localhost:3000/pessoa/${conv}`, {
        method: "PUT",
        body: formData,
      })
        .then((data) => {
          Swal.fire({
            title: "Alterado!",
            text: "Alterado com Sucesso.",
            icon: "success",
          });
        })
        .catch((error) => {
          console.error("Erro ao excluir pessoa:", error);
          Swal.fire({
            title: "Erro",
            text: "Erro ao Alterar.",
            icon: "error",
          });
        });
    }
  });

  // fetch(`http://localhost:3000/pessoa/${conv}`, {
  //   method: "PUT",
  //   body: formData,
  // })
  //   .then((response) => response.json())
  //   .then((data) => {
  //     alert(data.message);
  //     console.log("Alterado  com sucesso!");
  //     window.location.reload()
  //   })
  //   .catch((error) => console.log("Erro:" + error));
}

function filtrarDesaparecidos() {
  let nome = document.getElementById("filtroNome").value;
  let localDesaparecimento = document.getElementById(
    "filtroLocalDesaparecimento"
  ).value;
  let genero = document.getElementById("filtroGenero").value;
  let idadeMin = document.getElementById("filtroIdadeMin").value;
  let idadeMax = document.getElementById("filtroIdadeMax").value;

  fetch(
    `http://localhost:3000/pessoas/filtrar?nome=${nome}&local_desaparecimento=${localDesaparecimento}&genero=${genero}&idadeMin=${idadeMin}&idadeMax=${idadeMax}&pagina=${pagina}`
  )
    .then((response) => response.json())
    .then((data) => {
      if (!data.pessoas.length) {
        let paginacao = document.getElementById("paginacao");
        paginacao.className = paginacao.className += " hidden";

        let listaDesparecidos = document.getElementById("listaDesparecidos");
        listaDesparecidos.innerHTML = "<h1>Sem resultados</h1>";
      } else {
        criarCardsPessoas(data.pessoas);
        totalPaginas = data.totalPaginas;
        mostrarTotalPaginas();
      }
    })
    .catch((error) => console.error("Erro:", error));
}
