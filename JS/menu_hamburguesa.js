// Obtener elementos del DOM
const menuButton = document.getElementById('menu-button');
const headerNavegacion = document.querySelector('.header_navegacion');
const headerUsuario = document.querySelector('.header_usuario');
const sub_menu= document.querySelector('.menu_usuario');

// Variable para controlar el estado del menú
let menuVisible = false;



function realizarTareaSiPantallaPequena() {
  if (window.matchMedia("(max-width: 764px)").matches) {
    if (menuVisible) {
      // Si el menú está visible, ocultar las secciones
      headerNavegacion.style.display = 'none';
      headerUsuario.style.display = 'none';
      sub_menu.style.display = "none";
      menuVisible = false;
    } else {
      // Si el menú está oculto, mostrar las secciones
      headerNavegacion.style.display = 'flex';
      headerUsuario.style.display = 'flex';
      sub_menu.style.display = 'flex';
      menuVisible = true;
    }
  }else{
    headerNavegacion.style.display = 'flex';
    headerUsuario.style.display = 'flex';
    sub_menu.style.display = 'none';
  }
}

// Llamar a la función al cargar la página y cada vez que se redimensiona la ventana
window.addEventListener("load", realizarTareaSiPantallaPequena);
window.addEventListener("resize", realizarTareaSiPantallaPequena);
// Agregar evento click al botón hamburguesa
menuButton.addEventListener('click', realizarTareaSiPantallaPequena);
