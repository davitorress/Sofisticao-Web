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
const totalPrice = document.getElementById("total-price");
let number_qtd = 1;
qtdProducts.innerHTML = number_qtd;
let total = 0;
totalPrice.innerHTML =  number_qtd * product.preco;



more_btn.addEventListener("click", () => {
  number_qtd++;
  qtdProducts.innerHTML = number_qtd;
  totalPrice.innerHTML = number_qtd * product.preco;
});
less_btn.addEventListener("click", () => {
  if (number_qtd === 1) {
    return;
  } else {

    number_qtd--;

  }
  qtdProducts.innerHTML = number_qtd;
  totalPrice.innerHTML = number_qtd * product.preco;

});

const content_section = document.querySelector(".buy-product__container");
const content_cart = content_section.querySelector(".buy-product__imgDesc");
content_cart.querySelector("img").src = product.imagem;
content_cart.querySelector(".title-product").innerText = product.nome;
content_cart.querySelector(".tamanho").innerText = product.porte;
content_cart.querySelector(".price-num__cart").innerHTML = "R$" +  product.preco;
content_cart.querySelector(".price-discount__cart").innerHTML =
  "R$" + product.preco_desc;
