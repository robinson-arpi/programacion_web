
// Para seleccionar de cuando quiere el historial
$(document).ready(function() {
    $('.list-group-link').click(function() {
        // Elimina la clase "active" de todos los enlaces de la lista
        $('.list-group-link').removeClass('active');

        // Agrega la clase "active" solo al enlace que se hizo clic
        $(this).addClass('active');

        // Obtiene la posición vertical del elemento de historial correspondiente
        var historialPos = $($(this).attr('href')).position().top;

        // Desplaza la posición vertical del contenedor del historial
        $('#historial-container').scrollTop(historialPos);
    });
});


// para eliminar ítems o buscar en servicios
const searchBoxes = document.querySelectorAll('.search-box');
  
searchBoxes.forEach((searchBox) => {
  const closeIcon = searchBox.querySelector('.fas.fa-times');
  const searchIcon = searchBox.querySelector('.fas.fa-search');
  const searchBoxText = searchBox.querySelector('.search-text').textContent;

  // Agregar evento para eliminar elemento de búsqueda
  closeIcon.addEventListener('click', () => {
    searchBox.remove();

    // Obtener el ID de búsqueda
    const busquedaId = encodeURIComponent(closeIcon.id);

    // Obtener todas las fechas
    var fechas = document.querySelectorAll('.fecha-container');

    // Recorrer todas las fechas y verificar si tienen elementos de búsqueda asociados
    for (var i = 0; i < fechas.length; i++) {
      var fecha = fechas[i];
      var busquedasFecha = fecha.getElementsByClassName('search-box');

      // Verificar si hay elementos de búsqueda asociados a la fecha
      if (busquedasFecha.length === 0) {
        fecha.remove(); // Eliminar la fecha y las búsquedas asociadas del DOM
      }
    }

    // Obtener el valor del token CSRF
    const csrfToken = document.querySelector('input[name="csrf_token"]').value;

    // Construir la URL de eliminación
    const url = '/historial/eliminar';

    // Configurar los datos de la solicitud
    const data = new URLSearchParams();
    data.append('busqueda_id', busquedaId);

    // Realizar una solicitud POST al backend utilizando fetch
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-CSRFToken': csrfToken
      },
      body: data
    })
      .then(response => response.text()) // Obtener el cuerpo de la respuesta como texto
      .then(data => {
        // Reemplazar el contenido de la página con el HTML recibido
        // document.documentElement.innerHTML = data;
      })
      .catch(error => console.error(error));

  });

  // Agregar evento para mostrar mensaje de confirmación
  searchIcon.addEventListener('click', () => {

    // const confirmed = confirm(`¿Desea buscar "${searchBoxText}" en los servicios?`);

    // Modificar el atributo href del enlace
    const url = `/servicios/busqueda?busqueda=${encodeURIComponent(searchBoxText)}`; // Construir la URL con el término de búsqueda

    // Realizar una solicitud GET al backend utilizando fetch
    fetch(url)
      .then(response => response.text()) // Obtener el cuerpo de la respuesta como texto
      .then(data => {
        // Reemplazar el contenido de la página con el HTML recibido
        document.documentElement.innerHTML = data;
      })
      .catch(error => console.error(error));

    if (confirmed) {
      // Agregar lógica de búsqueda aquí
      window.location.href = '../HTML/servicios.html';
    }
  });
});

// Para realizar las búsquedas

// Obtener el campo de entrada de búsqueda
var busquedaInput = document.getElementById('busquedaH');

// Agregar un evento de escucha para detectar cambios en el campo de entrada
busquedaInput.addEventListener('input', function(event) {

  // Obtener el texto ingresado en el campo de búsqueda
  var textoBusqueda = event.target.value.toLowerCase();

  // Obtener todas las cajas de búsqueda
  var searchBoxes = document.getElementsByClassName('search-box');

  // Recorrer todas las cajas de búsqueda y mostrar solo las que coinciden con el texto de búsqueda
  for (var i = 0; i < searchBoxes.length; i++) {
    var searchBox = searchBoxes[i];
    var searchBoxTexto = searchBox.getElementsByClassName('search-text')[0].textContent.toLowerCase();

    // Verificar si el texto de búsqueda está presente en el texto de la caja de búsqueda
    if (searchBoxTexto.includes(textoBusqueda)) {
      searchBox.style.display = 'flex'; // Mostrar la caja de búsqueda
    } else {
      searchBox.style.display = 'none'; // Ocultar la caja de búsqueda
    }
  }

  // Obtener todas las fechas
  var fechas = document.querySelectorAll('.fecha-container');

  // Recorrer todas las fechas y verificar si todos los elementos de búsqueda están ocultos
  for (var i = 0; i < fechas.length; i++) {
    var fecha = fechas[i];
    var busquedasFecha = fecha.getElementsByClassName('search-box');

    var todosOcultos = true;

    // Verificar si todos los elementos de búsqueda están ocultos
    for (var j = 0; j < busquedasFecha.length; j++) {
      var busqueda = busquedasFecha[j];

      if (busqueda.style.display !== 'none') {
        todosOcultos = false;
        break;
      }
    }

    // Ocultar el contenedor de fecha si todos los elementos de búsqueda están ocultos
    if (todosOcultos) {
      fecha.style.display = 'none';
    } else {
      fecha.style.display = 'block';
    }
  }

});
