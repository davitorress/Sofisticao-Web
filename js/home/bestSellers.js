const allProducts = await fetch("http://localhost:8000/product", {
	mode: "cors",
	headers: {
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
	},
})
	.then((res) => res.json())
	.then((data) => [...data[0]]);
const sortedProducts = allProducts.sort((a, b) => +b.quantidade - +a.quantidade);
console.log(sortedProducts);

const bestSellers = document.querySelector("#best-sellers .products-list");

for (let i = 0; i < 6; i++) {
	const cloneItem = document.querySelector("#best-sellers .product-item.skeleton-item").cloneNode(true);

	cloneItem.querySelector("img").src = sortedProducts[i].imagem[0];
	cloneItem.querySelector("img").alt = sortedProducts[i].nome;
	cloneItem.querySelector(".description-item p").innerText = sortedProducts[i].nome;
	cloneItem.querySelector(".price-num").innerText = `R$${sortedProducts[i].preco}`;
	cloneItem.querySelector(".price-discount").innerText = `R$${sortedProducts[i].preco_desc}`;
	cloneItem.querySelector("button").onclick = () => {
		const href = window.location.href;
		window.location.href = href + "pages/produto.html?id=" + i;
	};

	cloneItem.classList.remove("skeleton-item");
	bestSellers.appendChild(cloneItem);
}