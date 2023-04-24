const allProducts = await fetch("http://localhost:8000/product", {
  mode: "cors",
})
  .then((res) => res.json())
  .then((data) => [...data[0]]);

const products_document = document.querySelector(".products-seller");

for (let i = 0; i < 12; i++) {
  const product_item = document
    .querySelector(".sell-itens.skeleton-item")
    .cloneNode(true);
  product_item.querySelector("img").src = allProducts[i].imagem;
  product_item.querySelector(".description-p").innerText = allProducts[i].nome;
  product_item.querySelector(".price-num").innerText =
    "R$" + allProducts[i].preco;
  product_item.querySelector(".price-discount").innerText =
    "R$" + allProducts[i].preco_desc;

  product_item.addEventListener("click", () => {
    window.location.href = "produto.html?id=" + allProducts[i]._id.$oid;
  });

  product_item.classList.remove("skeleton-item");
  products_document.appendChild(product_item);
}
