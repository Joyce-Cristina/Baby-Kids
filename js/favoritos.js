function carregarFavoritos(){

const container = document.getElementById("lista-favoritos");

let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

container.innerHTML = "";

if(favoritos.length === 0){

container.innerHTML = "<p>Nenhum produto favoritado ❤️</p>";

return;

}

favoritos.forEach(produto => {

container.innerHTML += `

<div class="bg-white p-4 shadow rounded">

<img src="${produto.imagem}" class="mb-3">

<h2 class="text-lg">${produto.nome}</h2>

<p class="text-gray-700 mb-3">
R$ ${produto.preco}
</p>

<button onclick="removerFavorito(${produto.id})"
class="bg-red-500 text-white px-3 py-1 rounded">

Remover

</button>

</div>

`;

});

}

function removerFavorito(id){

let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

favoritos = favoritos.filter(p => p.id !== id);

localStorage.setItem("favoritos", JSON.stringify(favoritos));

carregarFavoritos();

}

carregarFavoritos();