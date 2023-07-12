
function mostrarTexto(elemento) {
    var textoElement = elemento.previousElementSibling; // Obtén el elemento <p> anterior al enlace
    var tamanio = document.getElementById('card');
    var verMasElement = elemento;
  
    if (textoElement.style.webkitLineClamp === '5') {
      textoElement.style.webkitLineClamp = 'initial';
      verMasElement.textContent = 'Ver menos';
    } else {
      tamanio.style.marginBottom = '5px';
      textoElement.style.webkitLineClamp = '5';
      verMasElement.textContent = 'Ver más';
    }
  }
  
