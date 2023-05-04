//Control de opciones 
const botonBuscar = document.querySelector(".boton_busqueda");

botonBuscar.addEventListener("click", function(event) {
  // Verifica si los campos required están llenos
  var inputs = document.querySelectorAll('.entrada_busqueda');
  event.preventDefault(); // Evita el envío del formulario por defecto
  window.location.href = '../HTML/servicios.html';
  
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

      // Modificar contenido para "item_usuario"
      var enlaceUsuario = itemUsuario.querySelector("a");
      enlaceUsuario.href = "HTML/inicio.html";
      enlaceUsuario.innerHTML = '<i class="fas fa-sign-in-alt"></i>Iniciar_sesión';

      // Modificar contenido para "item_notificacion"
      var enlaceNotificacion = itemNotificacion.querySelector("a");
      enlaceNotificacion.href = "HTML/registro.html";
      enlaceNotificacion.innerHTML = '<i class="fas fa-user-plus"></i>Registrarse';
      sub_menu_usuario.style.display = "none";
      menu_opciones_usuario.style.display = "none";
    }
  });


/*
Creaciónde categorias populares
Recibe como parametro el nombre del icono
*/  
function crearListItem(nombreIcono, descripcion) {
  // Crear un elemento <li>
  var listItem = document.createElement("li");

  // Crear un elemento <div> con la clase "categoria"
  var divCategoria = document.createElement("div");
  divCategoria.className = "categoria";

  // Crear un elemento <i> con la clase recibida como parámetro
  var icono = document.createElement("i");
  icono.className = nombreIcono;

  // Crear un elemento <span> con el texto "Computación"
  var span = document.createElement("span");
  span.textContent = descripcion;

  // Agregar el elemento <i> al elemento <div>
  divCategoria.appendChild(icono);

  // Agregar el elemento <span> al elemento <div>
  divCategoria.appendChild(span);

  // Agregar el elemento <div> al elemento <li>
  listItem.appendChild(divCategoria);

  // Retornar el elemento <li> generado
  return listItem;
}


var listItem = crearListItem("fas fa-book-reader", "Literatura");
var contenedor = document.getElementById('contenedor_categorias');

if (contenedor) {
  contenedor.appendChild(listItem);
} else {
  console.error("El elemento contenedor no fue encontrado.");
}


const username = document.querySelector('.item_usuario');
username.addEventListener('mouseleave', function() {
  setTimeout(function() {
    username.classList.remove('sub_menu');
  }, 50); // Retardo de 500ms antes de ocultar el submenú
});