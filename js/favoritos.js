function carregarFavoritos(){
  const container = document.getElementById("lista-favoritos");
  const vazioEl   = document.getElementById("favoritos-vazio");
  const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

  container.innerHTML = "";

  if(favoritos.length === 0){
    vazioEl.classList.remove("hidden");
    vazioEl.classList.add("flex");
    return;
  }

  vazioEl.classList.add("hidden");
  vazioEl.classList.remove("flex");

  favoritos.forEach((produto, i) => {
    const div = document.createElement("div");
    div.className = "card-anim bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col";
    div.style.animationDelay = (i * 0.06) + "s";
    div.style.opacity = "0";
    div.innerHTML = `
      <div class="relative">
        <img src="${produto.imagem}" alt="${produto.nome}" class="w-full h-48 object-cover bg-gray-100">
        <button onclick="removerFavorito(${produto.id})"
          class="absolute top-3 right-3 w-8 h-8 bg-white rounded-full shadow flex items-center justify-center hover:bg-red-50 transition"
          title="Remover dos favoritos">
          <svg class="h-5 w-5 text-red-400 hover:text-red-600 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6 4 4 6.5 4 8.04 4 9.54 4.81 10.35 6.09 11.16 4.81 12.66 4 14.2 4 16.7 4 18.7 6 18.7 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </button>
      </div>
      <div class="p-4 flex flex-col flex-1">
        <p class="font-semibold text-gray-800 mb-1">${produto.nome}</p>
        <p class="text-gray-500 text-sm mb-4">R$ ${produto.preco.toFixed(2)}</p>
        <button onclick="adicionarCarrinho(${produto.id})"
          class="mt-auto w-full bg-gray-900 text-white text-sm font-semibold py-2.5 rounded-xl hover:bg-gray-700 transition">
          Adicionar ao carrinho
        </button>
      </div>`;
    container.appendChild(div);
  });
}

function removerFavorito(id){
  let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
  favoritos = favoritos.filter(p => p.id !== id);
  localStorage.setItem("favoritos", JSON.stringify(favoritos));
  carregarFavoritos();
}

carregarFavoritos();