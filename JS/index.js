/*-------------------------------------------------------
Control de opciones 
*/
document.addEventListener("DOMContentLoaded", function() {
    var referrer = document.referrer;

    // Verificar si la página de referencia es "inicio.html" o "registro.html"
    if (referrer.includes("inicio.html") || referrer.includes("registro.html")) {
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
    }
  });