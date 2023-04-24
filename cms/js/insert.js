const form = document.querySelector("form");

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

	fetch("http://localhost:8000/product", {
		method: "POST",
		mode: "cors",
		body: JSON.stringify(dataFetch),
	});

	form.reset();
};
