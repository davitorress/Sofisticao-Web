const allProducts = await fetch("http://localhost:8000/product", {
	mode: "cors",
	headers: {
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
	},
})
	.then((res) => res.json())
	.then((data) => [...data[0]]);

const tableBody = document.querySelector("tbody");
allProducts.forEach((product) => {
	const tr = document.createElement("tr");
	tr.innerHTML = `<td><img src="${product.imagem}" alt="imagem"></td><td>${product.nome}</td><td>${product.preco}</td><td>${product.preco_desc}</td><td>${product.cores}</td><td>${product.porte}</td><td>${product.quantidade}</td><td>${product.categoria}</td><td><button data-id="${product._id.$oid}" class="atualizar btn btn-primary">Atualizar</button></td><td><button data-id="${product._id.$oid}" class="excluir btn btn-danger">Excluir</button></td>`;

	tableBody.appendChild(tr);
});

const deleteButtons = [...document.querySelectorAll("button.excluir")];
deleteButtons.forEach((button) => {
	button.addEventListener("click", () => {
		fetch(`http://localhost:8000/product/${button.attributes.getNamedItem("data-id").nodeValue}`, {
			method: "DELETE",
			mode: "cors",
		});

		window.location.reload();
	});
});

const updateButtons = [...document.querySelectorAll("button.atualizar")];
updateButtons.forEach((button) => {
	button.addEventListener("click", () => {
		window.location.href = "./atualizar.html?id=" + button.attributes.getNamedItem("data-id").nodeValue;
	});
});
