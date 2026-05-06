// ===== LISTA DE PRODUTOS =====

const produtos = [
{
id: 1,
nome: "Capivara Camiseta",
preco: 30.99,
imagem: "img/logo.jpeg"
},

{
id: 2,
nome: "Capivara Hoodie",
preco: 59.90,
imagem: "img/logo.jpeg"
},

{
id: 3,
nome: "Capivara Baby Look",
preco: 35.50,
imagem: "img/logo.jpeg"
},

{
id: 4,
nome: "Capivara Moletom",
preco: 79.90,
imagem: "img/logo.jpeg"
},

{
id: 5,
nome: "Capivara Infantil",
preco: 28.90,
imagem: "img/logo.jpeg"
},

{
id: 6,
nome: "Capivara Street",
preco: 42.90,
imagem: "img/logo.jpeg"
},

{
id: 7,
nome: "Capivara Premium",
preco: 89.90,
imagem: "img/logo.jpeg"
},

{
id: 8,
nome: "Capivara Oversized",
preco: 64.90,
imagem: "img/logo.jpeg"
}
];


// ===== FAVORITOS =====

let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
function favoritar(id){

const produto = produtos.find(p => p.id === id);
const jaExiste = favoritos.find(p => p.id === id);
const btn = document.getElementById("fav-btn-" + id);

if(!jaExiste){
  favoritos.push(produto);
  localStorage.setItem("favoritos", JSON.stringify(favoritos));
  atualizarFavoritos();
  if(btn) btn.classList.replace("text-gray-500", "text-red-500");
  document.getElementById("modal-fav-nome").textContent = produto.nome;
  document.getElementById("modal-favorito").classList.remove("hidden");
}else {
  favoritos = favoritos.filter(p => p.id !== id);
  localStorage.setItem("favoritos", JSON.stringify(favoritos));
  atualizarFavoritos();
  if(btn) btn.classList.replace("text-red-500", "text-gray-500");
}

}
// ===== CONTADOR DE FAVORITOS =====

function atualizarFavoritos(){
  const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
  const contador  = document.getElementById("contador-favoritos");
  if(contador){
    contador.innerText     = favoritos.length;
    contador.style.display = favoritos.length > 0 ? "flex" : "none";
  }
}
function atualizarCarrinho(){
  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  const contador = document.getElementById("contador-carrinho");
  if(contador){
    contador.innerText = carrinho.length;
    contador.style.display = carrinho.length > 0 ? "flex" : "none";
  }
}
// ===== FUNÇÃO PARA MOSTRAR PRODUTOS =====

function carregarProdutos(){

const container = document.getElementById("lista-produtos");

if(!container) return;

container.innerHTML = "";

produtos.forEach(produto => {

const produtoHTML = `
<div class="w-full md:w-1/3 xl:w-1/4 p-6 flex flex-col">

<a href="#">
<img class="hover:grow hover:shadow-lg" src="${produto.imagem}">
</a>

<p class="pt-3">${produto.nome}</p>

<div class="flex items-center justify-between mt-2">

<p class="text-gray-900">
R$ ${produto.preco.toFixed(2)}
</p>

<div class="flex gap-3">

<!-- FAVORITOS -->
<svg id="fav-btn-${produto.id}" onclick="favoritar(${produto.id})"
class="h-6 w-6 cursor-pointer transition ${favoritos.some(f => f.id === produto.id) ? 'text-red-500' : 'text-gray-500 hover:text-red-500'}"
xmlns="http://www.w3.org/2000/svg"
viewBox="0 0 24 24"
fill="currentColor">

<path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
2 6 4 4 6.5 4
8.04 4 9.54 4.81 10.35 6.09
11.16 4.81 12.66 4 14.2 4
16.7 4 18.7 6 18.7 8.5
18.7 12.28 15.3 15.36 10.15 20.04
L12 21.35z"/>

</svg>

<!-- CARRINHO -->
<svg onclick="adicionarCarrinho(${produto.id})"
class="h-6 w-6 text-gray-500 hover:text-black cursor-pointer transition"
xmlns="http://www.w3.org/2000/svg"
viewBox="0 0 24 24"
fill="currentColor">

<path d="M7 4H5L4 6h2l3.6 7.59-1.35 2.45A2 2 0 0 0 10 19h9v-2h-8.42
a.25.25 0 0 1-.22-.37L11.1 14h6.45
a2 2 0 0 0 1.79-1.11L21 7H6"/>

<circle cx="10.5" cy="20.5" r="1.5"/>
<circle cx="17.5" cy="20.5" r="1.5"/>

</svg>

</div>

</div>

</div>
`;

container.innerHTML += produtoHTML;

});

}
function abrirFavoritos(){

const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

if(favoritos.length === 0){

alert("Nenhum produto nos favoritos ❤️");

return;

}

let lista = "❤️ Seus favoritos:\n\n";

favoritos.forEach(p => {

lista += `${p.nome} - R$ ${p.preco}\n`;

});

alert(lista);

}
let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
function adicionarCarrinho(id){
  const produto = produtos.find(p => p.id === id);
  carrinho.push(produto);
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  document.getElementById("modal-cart-nome").textContent = produto.nome;
  document.getElementById("modal-carrinho").classList.remove("hidden");
  atualizarCarrinho(); // <- adicione essa linha

}
function fecharModalFavorito(){
  document.getElementById("modal-favorito").classList.add("hidden");
}
function fecharModalCarrinho(){
  document.getElementById("modal-carrinho").classList.add("hidden");
}
// ===== INICIAR LOJA =====
document.addEventListener("DOMContentLoaded", () => {
  carregarProdutos();
  atualizarFavoritos();
  atualizarCarrinho(); // <- adicione essa linha
});