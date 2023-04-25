const product = await fetch(
    "http://localhost:8000/product/" + window.location.search.split("=")[1],
    {
      mode: "cors",
    }
  )
    .then((res) => res.json())  
    .then((data) => data);

    const content_section = document.querySelector(".buy-product__container");
    const content_cart = content_section.querySelector(".buy-product__imgDesc");
    content_cart.querySelector("img").src = product.imagem;
content_cart.querySelector(".title-product").innerText = product.nome;
content_cart.querySelector(".tamanho").innerText = product.porte;


  