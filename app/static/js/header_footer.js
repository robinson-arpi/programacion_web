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

/*----------------------------------------
Demas estilos
----------------------------------------*/
//Control de opciones 
const botonBuscar = document.querySelector(".boton_busqueda");

botonBuscar.addEventListener("click", function(event) {
  // Verifica si los campos required están llenos
  var inputs = document.querySelectorAll('.entrada_busqueda');
  event.preventDefault(); // Evita el envío del formulario por defecto
  window.location.href = 'servicios.html';
  
});

let bandera = localStorage.getItem('sesion_iniciada') === 'true'
const sub_menu_usuario= document.querySelector('.sub_menu');
const menu_opciones_usuario= document.querySelector('.nav_menu_usuario');

document.addEventListener("DOMContentLoaded", function() {
    var referrer = document.referrer;

    // Verificar si la página de referencia es "inicio.html" o "registro.html"
    if (bandera) {
      // El contenido se mantiene igual
      // No se realizan modificaciones en item_usuario y item_notificacion
    } else {
      var headerUsuario = document.querySelector(".header_usuario");
      var itemUsuario = headerUsuario.querySelector(".item_usuario");
      var itemNotificacion = headerUsuario.querySelector(".item_notificacion");
      var itemFavoritos = headerUsuario.querySelector(".item_favoritos");

      // Modificar contenido para "item_usuario"
      var enlaceUsuario = itemUsuario.querySelector("a");
      enlaceUsuario.href = "inicio.html";
      enlaceUsuario.innerHTML = '<i class="fas fa-sign-in-alt"></i>Iniciar_sesión';

      // Modificar contenido para "item_notificacion"
      var enlaceNotificacion = itemNotificacion.querySelector("a");
      enlaceNotificacion.href = "registro.html";
      enlaceNotificacion.innerHTML = '<i class="fas fa-user-plus"></i>Registrarse';
      
      itemFavoritos.style.display = "none";
      sub_menu_usuario.style.display = "none";
      menu_opciones_usuario.style.display = "none";
    }
  });



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