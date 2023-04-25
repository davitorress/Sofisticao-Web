const product = await fetch(
  "http://localhost:8000/product/" + window.location.search.split("=")[1],
  {
    mode: "cors",
  }
)
  .then((res) => res.json())
  .then((data) => data);

// more
// qtd-btn
// less
const more_btn = document.getElementById("more");
const less_btn = document.getElementById("less");
const qtdProducts = document.getElementById("qtd-btn");
let number_qtd = 1;
qtdProducts.innerHTML = number_qtd;

let temporario = product.preco * number_qtd;

more_btn.addEventListener("click", () => {
  number_qtd++;
  qtdProducts.innerHTML = number_qtd;
});
less_btn.addEventListener("click", () => {
  if (number_qtd === 1) {
    return;
  } else {
    number_qtd--;
  }
  qtdProducts.innerHTML = number_qtd;
});

const content_section = document.querySelector(".buy-product__container");
const content_cart = content_section.querySelector(".buy-product__imgDesc");
content_cart.querySelector("img").src = product.imagem;
content_cart.querySelector(".title-product").innerText = product.nome;
content_cart.querySelector(".tamanho").innerText = product.porte;
content_cart.querySelector(".price-num__cart").innerHTML = "R$" + temporario;
content_cart.querySelector(".price-discount__cart").innerText =
  "R$" + product.preco_desc;
