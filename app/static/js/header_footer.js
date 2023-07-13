/*----------------------------------------
Boton hamburguesa
----------------------------------------*/
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


const sub_menu_usuario= document.querySelector('.sub_menu');
const menu_opciones_usuario= document.querySelector('.nav_menu_usuario');

const username = document.querySelector('.item_usuario');
username.addEventListener('mouseleave', function() {
  setTimeout(function() {
    username.classList.remove('sub_menu');
  }, 50); // Retardo de 500ms antes de ocultar el submenú
});

// Llamar a la función al cargar la página y cada vez que se redimensiona la ventana
window.addEventListener("load", realizarTareaSiPantallaPequena);
window.addEventListener("resize", realizarTareaSiPantallaPequena);
// Agregar evento click al botón hamburguesa
menuButton.addEventListener('click', realizarTareaSiPantallaPequena);


const salirElemento = document.getElementById('salir');
salirElemento.addEventListener('click', function() {
  localStorage.removeItem("sesion_iniciada");
});

/*----------------------------------------
Búsqueda
----------------------------------------*/

$(document).on('click', '#btn-busqueda', function() {
  const searchTerm = $('#busqueda').val().trim(); // Obtener el contenido del campo de búsqueda
  
  if (searchTerm === "") {    
    // Evitar enviar la solicitud si no hay texto de búsqueda
    return;
  } else {
    // Modificar el atributo href del enlace
    const url = `/servicios/busqueda?busqueda=${encodeURIComponent(searchTerm)}`; // Construir la URL con el término de búsqueda

    // Realizar una solicitud GET al backend utilizando fetch
    fetch(url)
      .then(response => response.text()) // Obtener el cuerpo de la respuesta como texto
      .then(data => {
        // Reemplazar el contenido de la página con el HTML recibido
        document.documentElement.innerHTML = data;
      })
      .catch(error => console.error(error));
  }
});

