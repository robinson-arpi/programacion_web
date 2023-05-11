
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
      });
  
      // Agregar evento para mostrar mensaje de confirmación
      searchIcon.addEventListener('click', () => {
        const confirmed = confirm(`¿Desea buscar "${searchBoxText}" en los servicios?`);
        if (confirmed) {
          // Agregar lógica de búsqueda aquí
          window.location.href = '../HTML/servicios.html';
        }
      });
});

// para poner las fechas en el historial
// Obtener la fecha actual
const fechaHoy = new Date();

// Obtener el nombre del día de la semana actual
const diasSemana = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
const nombreDia = diasSemana[fechaHoy.getDay()];

// Obtener la fecha en formato deseado
const fechaActual = fechaHoy.toLocaleDateString("es-ES", { 
  day: "numeric",
  month: "long",
  year: "numeric",
});

// Actualizar el contenido del elemento HTML correspondiente
document.getElementById("fecha-hoy").textContent = `${nombreDia}, ${fechaActual}`;

// Obtener la fecha de ayer en formato deseado
const fechaAyer = new Date(fechaHoy);
fechaAyer.setDate(fechaHoy.getDate() - 1);
const nombreDiaAyer = diasSemana[fechaAyer.getDay()];
const fechaAyerFormateada = fechaAyer.toLocaleDateString("es-ES", { 
  day: "numeric",
  month: "long",
  year: "numeric",
});

// Actualizar el contenido del elemento HTML correspondiente
document.getElementById("fecha-ayer").textContent = `${nombreDiaAyer}, ${fechaAyerFormateada}`;
