// desmarca inputs
let menuBurguerFilter = document.getElementById('menu-burguer');
let burguerClose = document.getElementById('burguer-close');


const menuBurguer = () =>{

  if( menuBurguerFilter.style.display === "flex"){
    menuBurguerFilter.style.display = 'none';
  }
  else{
    menuBurguerFilter.style.display = 'flex';
  }
}
burguerClose.addEventListener("click", function() {
    menuBurguerFilter.classList.toggle("closeMenu");
    console.log("teste");
});

  
