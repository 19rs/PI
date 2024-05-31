let contadoresClickResposta = {};

function reply(id) {
  const divremove = document.getElementById(`div-remove-${id}`);
  divremove.classList.add("hidden");
  const divSelected = document.getElementById(`div-resposta-${id}`);
  const div = document.createElement("div");
  div.classList.add("flex", "p-5", "flex-col", "w-full");

  div.innerHTML = `
        <label for="conteudo" class="mt-2 relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
            <textarea id="conteudo" class="w-full resize-none border-none align-top focus:ring-0 sm:text-sm text-black" rows="4" placeholder="Informe Sua Mensagem..." required></textarea>
        </label>
        <input type="hidden" id="data" value="${
          new Date().toISOString().split("T")[0]
        }">
        <div class="flex items-center justify-end gap-2 bg-white p-3">
            <svg  class=' cursor-pointer' onclick="fechartextArea(event, ${id})" width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                    <path d="M10.0303 8.96965C9.73741 8.67676 9.26253 8.67676 8.96964 8.96965C8.67675 9.26255 8.67675 9.73742 8.96964 10.0303L10.9393 12L8.96966 13.9697C8.67677 14.2625 8.67677 14.7374 8.96966 15.0303C9.26255 15.3232 9.73743 15.3232 10.0303 15.0303L12 13.0607L13.9696 15.0303C14.2625 15.3232 14.7374 15.3232 15.0303 15.0303C15.3232 14.7374 15.3232 14.2625 15.0303 13.9696L13.0606 12L15.0303 10.0303C15.3232 9.73744 15.3232 9.26257 15.0303 8.96968C14.7374 8.67678 14.2625 8.67678 13.9696 8.96968L12 10.9393L10.0303 8.96965Z" fill="#ea1010"></path>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12Z" fill="#ea1010"></path>
                </g>
            </svg>
            <button type="button" class="rounded bg-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-gray-600" onclick="document.getElementById('conteudo').value = ''">
                Limpar
            </button>
            <button onclick="clickInserirResposta_Resposta(${id})" type="submit" class="rounded bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-700">
                Comentar
            </button>
        </div>
    `;

  divSelected.appendChild(div);
}

function fechartextArea(event, id) {
  const div = event.currentTarget.parentNode.parentNode;
  const divremove = document.getElementById(`div-remove-${id}`);
  divremove.classList.remove("hidden");
  div.remove();
  event.stopPropagation();
}

function clickInserirResposta_Resposta(resposta_id) {
  const formData = new FormData();
  const texto = document.getElementById("conteudo").value;
  const data = new Date().toISOString().split("T")[0];

  formData.append("resposta_id", resposta_id);
  formData.append("conteudo", texto);
  formData.append("data", data);

  fetch("http://localhost:3000/resposta_resposta", {
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

function mostrarRespostasDasRespostas(item, pai) {
  pai.innerHTML += `
           
    <div class='border-t-2 flex flex-col  w-full '>
        <div class='flex gap-2 w-full min-h-20 items-start p-3'>
          
           <div class='flex '>
           <svg width="35px" height="35px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M16 12L8 12" stroke="#191919" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M13 15L15.913 12.087V12.087C15.961 12.039 15.961 11.961 15.913 11.913V11.913L13 9" stroke="#191919" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
            </div>
            
                <div class='flex w-[92%]'>
                <p class=' leading-7 text-base  font-normal text-justify first-letter:capitalize '>${item.conteudo}</p>
                </div>
        </div>
    </div>
  
`;
}

function listarRespostasDasRespostas(resposta_id) {
  fetch(`http://localhost:3000/resposta_resposta/${resposta_id}`)
    .then((response) => {
      if (response.status === 404) {
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
      }

      if (!response.ok) {
        throw new Error("Erro na requisição");
      }
      return response.json();
    })
    .then((data) => {
      const pai = document.getElementById(`div-resposta-${resposta_id}`);

      data.forEach((item) => {
        mostrarRespostasDasRespostas(item, pai);
      });
    })

    .catch((error) => console.error("Erro ao obter respostas:", error));
}

function chamalistarRespostasDasRespostas(id) {
  if (!contadoresClickResposta.hasOwnProperty(id)) {
    contadoresClickResposta[id] = 0;
  }

  if (contadoresClickResposta[id] === 0) {
    listarRespostasDasRespostas(id);
  }

  contadoresClickResposta[id] = 1;
}
