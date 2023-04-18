// desmarca inputs
let menuBurguerFilter = document.getElementById('menu-burguer');
let animacaoAtiva = "showMenu";


const menuBurguer = () =>{
  if( menuBurguerFilter.style.display === "flex"){
    menuBurguerFilter.style.animationName = "closeMenu";
    setTimeout(() => {
      menuBurguerFilter.style.display = 'none';
  
    }, 450);
          
  }
  else{
    menuBurguerFilter.style.display = 'flex';
    menuBurguerFilter.style.animationName = "showMenu";         

  }

 
}



  
