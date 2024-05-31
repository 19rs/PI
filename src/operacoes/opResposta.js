let contaClickResposta = 0;
let contaClickCriarResposta = 0;
let contaClickChamarListarRespostas = 0;

function insertResposta(id) {
  const formData = new FormData();
  const data = new Date().toISOString().split("T")[0];
  const texto = document.getElementById("OrderNotes").value;

  if (texto.length === 0) {
    Toastify({
      text: "Campo Obrigatório !!!",
      duration: 1500,
      newWindow: true,
      gravity: "top", // `top` or `bottom`
      position: "center", // `left`, `center` or `right`
      style: {
        background: "#fff",
        color: "black",
      },
      onClick: function () {}, // Callback after click
    }).showToast();
    return;
  }

  formData.append("mensagem_id", id);
  formData.append("data", data);
  formData.append("conteudo", texto);

  fetch("http://localhost:3000/resposta", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())

    .then((data) => {
      alert(data.message);
    })
    .catch((error) => {
      console.error("Erro ao criar resposta:", error);
    });
}

function criarResposta(id) {
  const divSelected = document.querySelector(`#box-texto-${id}`);
  const div = document.createElement("div");

  div.innerHTML += `
        
        <div class='resposta flex w-full mt-5'>
        <label for="OrderNotes" class="sr-only">Order notes</label>

            <div
            class="w-full overflow-hidden rounded-lg border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
            >
            <textarea
            id="OrderNotes"
            class="w-full resize-none border-none align-top focus:ring-0 outline-none sm:text-sm" 
            rows="3"
            placeholder="Informe Sua Resposta..."
            
            ></textarea>

        <div class="flex items-center justify-end gap-2 bg-white p-3">
        <svg class='cursor-pointer' onclick="fecharResposta(event)"  width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10.0303 8.96965C9.73741 8.67676 9.26253 8.67676 8.96964 8.96965C8.67675 9.26255 8.67675 9.73742 8.96964 10.0303L10.9393 12L8.96966 13.9697C8.67677 14.2625 8.67677 14.7374 8.96966 15.0303C9.26255 15.3232 9.73743 15.3232 10.0303 15.0303L12 13.0607L13.9696 15.0303C14.2625 15.3232 14.7374 15.3232 15.0303 15.0303C15.3232 14.7374 15.3232 14.2625 15.0303 13.9696L13.0606 12L15.0303 10.0303C15.3232 9.73744 15.3232 9.26257 15.0303 8.96968C14.7374 8.67678 14.2625 8.67678 13.9696 8.96968L12 10.9393L10.0303 8.96965Z" fill="#ea1010"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12Z" fill="#ea1010"></path> </g></svg>
       
        <button
                type="button"
                class="rounded bg-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-gray-600"
                onclick="document.getElementById('OrderNotes').value = ''"
            >
                Limpar
            </button>

            <button
                type="button"
                class="rounded bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-700"
                onclick='insertResposta(${id})'
            >
                Publicar
            </button>
          
            </div>
    </div>
</div>`;

  divSelected.appendChild(div);
}

function fecharResposta(event) {
  const div = event.currentTarget.parentNode.parentNode.parentNode;
  div.remove();
  event.stopPropagation();
  contaClickCriarResposta = 0;
}

function fecharComentario(event) {
  const div = event.currentTarget.parentNode.parentNode;
  div.remove();
  event.stopPropagation();
  contaClickChamarListarRespostas = 0;
  contadoresClickResposta = {};
}

function deletarResposta(id) {
  fetch(`http://localhost:3000/resposta/${id}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => {
      alert(data.message);
    })
    .catch((error) => console.log("Erro:" + error));
}

function chamarListarRespostas(id) {
  contaClickChamarListarRespostas++;
  if (contaClickChamarListarRespostas === 1) {
    listarRespostas(id);
  }
}

function chamacriarResposta(id) {
  contaClickCriarResposta++;
  if (contaClickCriarResposta === 1) {
    criarResposta(id);
  }
}

function listarRespostas(mensagem_id) {
  const div = document.createElement("div");
  div.classList.add(
    "flex",
    "flex-col",
    "w-full",
    "pt-2",
    "pb-4",
    "border-2",
    "mt-5",
    "items-center"
  );
  div.innerHTML = `
    <div class='flex items-end justify-end w-[93%]'>
    <svg class='cursor-pointer' onclick="fecharComentario(event)"  width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10.0303 8.96965C9.73741 8.67676 9.26253 8.67676 8.96964 8.96965C8.67675 9.26255 8.67675 9.73742 8.96964 10.0303L10.9393 12L8.96966 13.9697C8.67677 14.2625 8.67677 14.7374 8.96966 15.0303C9.26255 15.3232 9.73743 15.3232 10.0303 15.0303L12 13.0607L13.9696 15.0303C14.2625 15.3232 14.7374 15.3232 15.0303 15.0303C15.3232 14.7374 15.3232 14.2625 15.0303 13.9696L13.0606 12L15.0303 10.0303C15.3232 9.73744 15.3232 9.26257 15.0303 8.96968C14.7374 8.67678 14.2625 8.67678 13.9696 8.96968L12 10.9393L10.0303 8.96965Z" fill="#ea1010"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12Z" fill="#ea1010"></path> </g></svg>
    </div>
    `;

  listarRespostasPorMensagem(mensagem_id, div);
}

function listarRespostasPorMensagem(mensagem_id, paiDetodos) {
  if (contaClickComentarios > 1) {
    contaClickComentarios = 0;
    return;
  }

  const pai = document.getElementById(`box-texto-${mensagem_id}`);

  fetch(`http://localhost:3000/resposta/${mensagem_id}`)
    .then((response) => {
      if (response.status === 404) {
        return response.json();
      }
      return response.json();
    })
    .then((data) => {
      if (data.message) {
        Toastify({
          text: "Sem Respostas !!!",
          duration: 1500,
          newWindow: true,
          gravity: "top", // `top` or `bottom`
          position: "center", // `left`, `center` or `right`
          style: {
            background: "red",
          },
          onClick: function () {}, // Callback after click
        }).showToast();
      } else {
        mostrarRespostas(data, paiDetodos, pai);
      }
    })
    .catch((error) => {
      console.error("Erro ao obter respostas:", error);
    })
    .finally(() => {
      contaClickComentarios = 0;
    });
}

function mostrarRespostas(data, paiDetodos, pai) {
  data.forEach((item) => {
    const respostaHTML = `
            <div id=div-resposta-${item.id} class='border-2 w-[93%] flex flex-col items-center rounded justify-center h-auto overflow-hidden my-3'>
                <div class='flex items-center gap-3  w-full h-full '>
               
                                <div class=' flex justify-between w-full min-h-16 '>
                                    <div class='flex p-3 gap-2 items-start justify-center w-[95%]' >
                                            <div>
                                            <svg class='cursor-pointer' onclick=' chamalistarRespostasDasRespostas(${item.id})'width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" transform="matrix(1, 0, 0, -1, 0, 0)" stroke="#191919" stroke-width="0.9359999999999999"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M14.55 15.59C14.4 15.5939 14.2524 15.5527 14.126 15.4719C13.9997 15.391 13.9005 15.2741 13.8413 15.1363C13.7821 14.9985 13.7656 14.8461 13.7939 14.6988C13.8221 14.5515 13.8939 14.416 14 14.31L17.92 10.42L14 6.52995C13.8595 6.38933 13.7807 6.1987 13.7807 5.99995C13.7807 5.8012 13.8595 5.61058 14 5.46995C14.1406 5.3295 14.3312 5.25061 14.53 5.25061C14.7287 5.25061 14.9194 5.3295 15.06 5.46995L19.52 9.88995C19.6604 10.0306 19.7393 10.2212 19.7393 10.42C19.7393 10.6187 19.6604 10.8093 19.52 10.95L15.06 15.37C14.9945 15.4395 14.9155 15.4949 14.8277 15.5327C14.74 15.5705 14.6455 15.59 14.55 15.59Z" fill="#191919"></path> <path d="M5 18.7499C4.80189 18.7473 4.61263 18.6675 4.47253 18.5274C4.33244 18.3873 4.25259 18.198 4.25 17.9999V10.4199C4.25259 10.2218 4.33244 10.0326 4.47253 9.89246C4.61263 9.75236 4.80189 9.67251 5 9.66992H19C19.1989 9.66992 19.3897 9.74894 19.5303 9.88959C19.671 10.0302 19.75 10.221 19.75 10.4199C19.75 10.6188 19.671 10.8096 19.5303 10.9503C19.3897 11.0909 19.1989 11.1699 19 11.1699H5.75V17.9999C5.74741 18.198 5.66756 18.3873 5.52747 18.5274C5.38737 18.6675 5.19811 18.7473 5 18.7499Z" fill="#191919"></path> </g></svg>
                                            </div>
                                       
                                                <div class='w-full'>
                                                <p class='text-pretty leading-7 text-base  font-normal text-justify first-letter:capitalize'>${item.conteudo}</p>
                                                </div>
                                    </div>
                                       
                                      
                                       
                                            <div id=div-remove-${item.id} class='border-l-2'>
                                                <div class='flex flex-col  justify-center gap-1 items-center h-full w-full'>
                                                    <div class="p-2">
                                                    <svg class='cursor-pointer ' onclick='reply(${item.id})' width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 4H6C4.89543 4 4 4.89543 4 6V18C4 19.1046 4.89543 20 6 20H18C19.1046 20 20 19.1046 20 18V12M9 15V12.5L17.75 3.75C18.4404 3.05964 19.5596 3.05964 20.25 3.75V3.75C20.9404 4.44036 20.9404 5.55964 20.25 6.25L15.5 11L11.5 15H9Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>

                                                    </div>
                                                   
                                                    <span class='border-b-2 w-full'></span>

                                                        <div class='p-2'>
                                                        <svg onclick='deletarResposta(${item.id})' class='cursor-pointer' width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M10 12V17" stroke="#df3434" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M14 12V17" stroke="#df3434" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M4 7H20" stroke="#df3434" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10" stroke="#df3434" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#df3434" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                                        </svg> 
                                                        </div>
                                                   
                                                  
                                                
                                                </div>
                                                

                                            </div>
                                </div>
                  
                </div>
            </div>
        `;

    paiDetodos.innerHTML += respostaHTML;
  });

  pai.appendChild(paiDetodos);
}
