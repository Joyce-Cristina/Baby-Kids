
let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

function adicionarCarrinho(id){

const produto = produtos.find(p => p.id === id);

carrinho.push(produto);

localStorage.setItem("carrinho", JSON.stringify(carrinho));

alert("Produto adicionado ao carrinho 🛒");

}