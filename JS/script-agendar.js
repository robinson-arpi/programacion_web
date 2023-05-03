/*------------------------------------------------------------------------
HTML de agendar-servicio
*/
// Obtener referencias a los campos de texto
var inputFecha = document.querySelector('.fecha');
var inputHora = document.querySelector('.hora');
var inputDireccion = document.querySelector('.direccion');
<<<<<<< HEAD
const buttonCancelar = document.querySelector('.boton-cancelar');
var buttonAgendar = document.querySelector('agendarB');
=======
var buttonCancelar = document.querySelector('.boton-cancelar');
var buttonAgendar = document.querySelector(".boton-agendar");
>>>>>>> 8c153434ed55313834ab880f0df958f7f0bd9068

buttonAgendar.addEventListener("click", function(event) {
  // Verifica si los campos required están llenos
  var inputs = document.querySelectorAll('input[required]');
  var formValid = true;
  
  for (var i = 0; i < inputs.length; i++){
    if (inputs[i].value.trim() === ''){
      formValid = false;
      break;
    }
  }
<<<<<<< HEAD
   
=======
    
>>>>>>> 8c153434ed55313834ab880f0df958f7f0bd9068
  if (formValid) {
    event.preventDefault(); // Evita el envío del formulario por defecto
    window.location.href = '../index.html';
  }
});

<<<<<<< HEAD
// buttonAgendar.addEventListener("click", function(event) {
//      if (inputFecha.value.trim() === "" || inputHora.value.trim() === "" || inputDireccion.value.trim() === "") {
//          //event.preventDefault(); // detener el envío del formulario
//          alert("Por favor, complete todos los campos requeridos.");
//      }
//      else {
//        //Proceso de guardar en la base de datos
//        event.preventDefault(); // Evita el envío del formulario por defecto
//        window.location.href = '../index.html';
//      }
// });
=======

>>>>>>> 8c153434ed55313834ab880f0df958f7f0bd9068

buttonCancelar.addEventListener("click",function(event){
  event.preventDefault(); // detener el envío del formulario
  const confirmacion = confirm("Está seguro de querer cancelar el agendamiento?");
  if (confirmacion) {
    window.location.href = '../index.html';
  }
});





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

buttonCancelar.addEventListener('input',borrarCampos());
buttonAgendar.addEventListener('input',borrarCampos())


//Función que limpia campos al pulsar un botón u otro
function borrarCampos(){
    localStorage.setItem('fecha_agendar', '');
    localStorage.setItem('hora_agendar', '');
    localStorage.setItem('direccion_agendar', '');
}