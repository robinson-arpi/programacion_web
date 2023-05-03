// Obtener elementos del DOM
const menuButton = document.getElementById('menu-button');
const headerNavegacion = document.querySelector('.header_navegacion');
const headerUsuario = document.querySelector('.header_usuario');
const sub_menu= document.querySelector('.menu_usuario');

// Variable para controlar el estado del menú
let menuVisible = false;

// Función para mostrar u ocultar las secciones
function toggleMenu() {
  if (menuVisible) {
    // Si el menú está visible, ocultar las secciones
    headerNavegacion.style.display = 'none';
    headerUsuario.style.display = 'none';
    sub_menu.style.display = "none";
    menuVisible = false;
  } else {
    // Si el menú está oculto, mostrar las secciones
    headerNavegacion.style.display = 'block';
    headerUsuario.style.display = 'block';
    menuVisible = true;
  }
}

// Agregar evento click al botón hamburguesa
menuButton.addEventListener('click', toggleMenu);
