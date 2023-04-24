const allProducts = await fetch("http://localhost:8000/product", {
	mode: "cors",
})
	.then((res) => res.json())
	.then((data) => [...data[0]]);

const sortedProducts = allProducts.sort((a, b) => +b.quantidade - +a.quantidade);

const bestSellers = document.querySelector("#best-sellers .products-list");

for (let i = 0; i < 6; i++) {
	const cloneItem = document.querySelector("#best-sellers .product-item.skeleton-item").cloneNode(true);

	cloneItem.querySelector("img").src = sortedProducts[i].imagem;
	cloneItem.querySelector("img").alt = sortedProducts[i].nome;
	cloneItem.querySelector(".description-item p").innerText = sortedProducts[i].nome;
	cloneItem.querySelector(".price-num").innerText = `R$${sortedProducts[i].preco}`;
	cloneItem.querySelector(".price-discount").innerText = `R$${sortedProducts[i].preco_desc}`;
	cloneItem.querySelector("button").onclick = () => {
		window.location.href = "produto.html?id=" + sortedProducts[i]._id.$oid;
	};
	cloneItem.querySelector("img").onclick = () => {
		window.location.href = "produto.html?id=" + sortedProducts[i]._id.$oid;
	};

	cloneItem.classList.remove("skeleton-item");
	bestSellers.appendChild(cloneItem);
}
