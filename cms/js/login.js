const formLogin = document.querySelector("form#login");
const emailInput = formLogin.querySelector("#email");
const passInput = formLogin.querySelector("#senha");

const allUsers = await fetch("http://localhost:8000/user", {
	mode: "cors",
	headers: {
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
	},
})
	.then((res) => res.json())
	.then((data) => [...data[0]]);

formLogin.onsubmit = (ev) => {
	ev.preventDefault();

	allUsers.forEach(({ email, senha }) => {
		if (email === emailInput.value && senha === passInput.value) {
			const href = window.location.href;
			window.location.href = href + "home.html";
		}
	});
};
