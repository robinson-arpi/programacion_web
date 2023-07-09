// para el botón cancelar y regresar a inicio
function cancelar(event) {
    window.location.href = "/servicios";
}
function agendarServicio(event) {
    window.location.href = "/agendar";
}
function cambiarColor() {
    var svgElement = document.getElementById("corazon");
    var textoElement = document.getElementById("texto");
    var valorTexto = textoElement.innerHTML;
    document.getElementById("texto_valor").value = valorTexto;
    var botonElement = document.querySelector(".fav");

    svgElement.classList.toggle("cambiado");
    botonElement.classList.toggle("cambiado");
    
    if (svgElement.classList.contains("cambiado")) {
      textoElement.textContent = "Quitar de favoritos";
    } else {
      textoElement.textContent = "Agregar a favoritos";
    }
    
  }