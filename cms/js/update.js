const form = document.querySelector("form");

const img = form.querySelector("img");
const nameInput = form.querySelector("#nome");
const priceInput = form.querySelector("#preco");
const priceDescInput = form.querySelector("#preco_desc");
const colorsInput = form.querySelectorAll("#cores input");
const porteInput = form.querySelectorAll("#porte input");
const quantInput = form.querySelector("#quantidade");
const categInput = form.querySelector("#categoria");
const imgInput = form.querySelector("#img");
const imageInput = form.querySelector("#image");

imageInput.onchange = () => {
	let files = imageInput.files;

	if (files.length > 0) {
		let imgFile = files[0];
		let fileReader = new FileReader(imgFile);

		fileReader.onload = (file) => {
			const imgBase64 = file.target.result;
			imgInput.value = imgBase64;
		};
		fileReader.readAsDataURL(imgFile);
	}
};

const product = await fetch("http://localhost:8000/product/" + window.location.search.split("=")[1], {
	mode: "cors",
	headers: {
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
	},
})
	.then((res) => res.json())
	.then((data) => data);
console.log(product);

img.src = product.imagem;
nameInput.value = product.nome;
priceInput.value = +product.preco;
priceDescInput.value = +product.preco_desc;
quantInput.value = +product.quantidade;
categInput.value = product.categoria;
colorsInput.forEach((input) => {
	for (let i = 0; i < product.cores.length; i++) {
		if (input.id === product.cores[i]) input.checked = true;
	}
});
porteInput.forEach((input) => {
	for (let i = 0; i < product.porte.length; i++) {
		if (input.value === product.porte[i]) input.checked = true;
	}
});

form.onsubmit = (ev) => {
	ev.preventDefault();

	const porte = [...porteInput].filter((input) => {
		if (input.checked) return input;
	});
	const cores = [...colorsInput].filter((input) => {
		if (input.checked) return input;
	});

	const dataFetch = {
		nome: nameInput.value,
		preco: priceInput.value,
		preco_desc: priceDescInput.value,
		porte: porte.map((input) => input.value),
		quantidade: quantInput.value,
		categoria: categInput.value,
		cores: cores.map((input) => input.value),
		imagem: imgInput.value,
	};

	fetch("http://localhost:8000/product/" + window.location.search.split("=")[1], {
		method: "PUT",
		mode: "cors",
		body: JSON.stringify(dataFetch),
	});

	form.reset();
};
