/*------------------------------------------------------------------------
HTML de agendar-servicio
*/
// Obtener referencias a los campos de texto
var inputFecha = document.querySelector('.fecha');
var inputHora = document.querySelector('.hora');
var inputDireccion = document.querySelector('.direccion');
var buttonCancelar = document.querySelector('.boton-cancelar');
var buttonAgendar = document.querySelector('.boton-agendar');

// Obtener el contenido guardado del almacenamiento local
var fechaGuardado = localStorage.getItem('fecha_agendar');
var horaGuardada = localStorage.getItem('hora_agendar');
var direccionGuardada = localStorage.getItem('direccion_agendar');

// Restaurar el contenido si está disponible
if (fechaGuardado != null)
  inputFecha.value = fechaGuardado;
  
if (horaGuardada != null)
  inputHora.value = horaGuardada;

if (direccionGuardada != null)
  inputDireccion.value = direccionGuardada;

// Guardar el contenido cuando se cambie
inputFecha.addEventListener('input', function() {
  localStorage.setItem('fecha_agendar', inputFecha.value);
});

inputHora.addEventListener('input', function() {
  localStorage.setItem('hora_agendar', inputHora.value);
});

inputDireccion.addEventListener('input', function() {
    localStorage.setItem('direccion_agendar', inputDireccion.value);
  });

//Función que limpia campos al pulsar un botón u otro
function borrarCampos(){
    localStorage.setItem('fecha_agendar', '');
    localStorage.setItem('hora_agendar', '');
    localStorage.setItem('direccion_agendar', '');
    window.history.back();
}

function limpiarCampos(){
  localStorage.setItem('fecha_agendar', '');
  localStorage.setItem('hora_agendar', '');
  localStorage.setItem('direccion_agendar', '');
}