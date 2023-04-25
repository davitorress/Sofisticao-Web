const product = await fetch(
  "http://localhost:8000/product/" + window.location.search.split("=")[1],
  {
    mode: "cors",
  }
)
  .then((res) => res.json())
  .then((data) => data);

const section_product = document.querySelector(".section-produtos__container");

const mobile_text = section_product.querySelector(".mobile-text");
mobile_text.querySelector("h2").innerText = product.nome;
mobile_text.querySelector(".price-num").innerText = "R$" + product.preco;
mobile_text.querySelector(".price-discount").innerText =
  "R$" + product.preco_desc;

const figure_products = section_product.querySelector(".img-figures__content");
figure_products.querySelector("img").src = product.imagem;

const buy_product = section_product.querySelector(".buy-produtos__content");
buy_product.querySelector(".produtos-description").innerText = product.nome;
buy_product.querySelector(".price-num").innerText = "R$" + product.preco;
buy_product.querySelector(".price-discount").innerText =
  "R$" + product.preco_desc;

const option_color = section_product.querySelector(".input-color__content");
product.cores.forEach((color) => {
  const input = document.createElement("input");
  input.type = "radio";
  input.id = color;
  input.classList.add("input-color");
  option_color.appendChild(input);
});

const input_sizes = section_product.querySelector(".input-sizes__content");
product.porte.forEach((porte) => {
  const input = document.createElement("input");
  input.type = "checkbox";
  input.id = porte.toLowerCase();
  input.classList.add("input-size__checkbox");
  input_sizes.appendChild(input);
});

const idd = window.location.search.split("=")[1];
const button_add = document.querySelector(".add-produto");
button_add.addEventListener("click",() =>{
    window.location.href = "cart.html?id=" + idd;
});
