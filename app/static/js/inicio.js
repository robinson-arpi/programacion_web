$(document).ready(function() {  
  // Obtener referencias a los campos de texto
  var inputContraseña = document.querySelector('.password');
  
  // Agrega un event listener al botón para detectar el clic
  const boton = document.querySelector(".boton_iniciar");
  //Verificar llenado
  botonIniciar.addEventListener("click", function(event) {
    // Verifica si los campos required están llenos
    var inputs = document.querySelectorAll('input[required]');
    var formValid = true;
    var mensaje = '';
    
    for (var i = 0; i < inputs.length; i++){
      if (inputs[i].value.trim() === ''){
        formValid = false;
        mensaje += "\nLos campos deben estar llenos";  
        break;
      }
    }
    
    if (formValid) {
      event.preventDefault(); // Evita el envío del formulario por defecto
    }else{
      mostrarMensaje("Error", mensaje)
    }
  });


  /*------------------------------------------------------------------------
  Local storage para incio
  */
  // Obtener el contenido guardado del almacenamiento local
  var correoGuardado = localStorage.getItem('correo_i');
  var contraseñaGuardada = localStorage.getItem('contraseña_i');

  // Restaurar el contenido si está disponible
  if (correoGuardado != null)
    inputCorreo.value = correoGuardado;

  if (contraseñaGuardada != null)
    inputContraseña.value = contraseñaGuardada;

  // Guardar el contenido cuando se cambie
  inputCorreo.addEventListener('input', function() {
    localStorage.setItem('correo_i', inputCorreo.value);
  });
  inputContraseña.addEventListener('input', function() {
    localStorage.setItem('contraseña_i', inputContraseña.value);
  });


  // ------------------------------- Mostrar Mensaje Modal -------------------------------------------------------------------------------------------// 

    // Función para mostrar mensajes de éxito o error
    function mostrarMensaje(titulo, mensaje) {
      $('#mensajeModalLabel').text(titulo);
      document.getElementById('mensajeModal').querySelector('.modal-body').innerHTML = mensaje;
      $('#mensajeModal').modal('show');
    }

    // ------------------------------- Cerrar Modal -------------------------------------------------------------------------------------------// 
    $('#mensajeModal .btn-secondary').on('click', function() {
      $('#mensajeModal').modal('hide');
    });

    $('#mensajeModal .close').on('click', function() {
      $('#mensajeModal').modal('hide');
    });

    $('#btnX').on('click', function() {
      $('#preguntaModal').modal('hide');
    });

    $('#preguntaModal .btn-primary').on('click', function() {
      var requisito = inputRequisito.value;
      var li = document.createElement("li");
      li.classList.add("list-group-item");
      li.textContent = requisito;
      var botonEliminar = document.createElement("button");
      botonEliminar.classList.add("btn", "btn-danger", "btn-sm", "float-end");
      botonEliminar.textContent = "X";
      li.appendChild(botonEliminar);
      listaRequisitos.appendChild(li);
      inputRequisito.value = "";
      $('#preguntaModal').modal('hide');
    });

    $('#XCerrar').on('click', function() {
      console.log("Cerrar");
      $('#preguntaModal').modal('hide');
    }); 
});

/*------------------------------------------------------------------------
Span para verificar correo
*/
const inputCorreo = document.querySelector('.correo');
const mensajeError = document.querySelector('#mensaje-error');

inputCorreo.addEventListener('input', () => {
    const correo = inputCorreo.value;
    const formatoValido = validarFormatoCorreo(correo);

    if (!formatoValido) {
        mensajeError.textContent = 'El formato del correo es incorrecto.';
    } else {
        mensajeError.textContent = '';
    }
});

function validarFormatoCorreo(correo) {
    // Utiliza una expresión regular para validar el formato del correo
    const expresionRegular = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return expresionRegular.test(correo);
}