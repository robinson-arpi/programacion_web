/*------------------------------------------------------------------------
Direccion a index
*/
var botonIniciar = document.querySelector(".iniciar");

botonIniciar.addEventListener("click", function(event) {
  // Verifica si los campos required están llenos
  var inputs = document.querySelectorAll('input[required]');
  var formValid = true;
  
  for (var i = 0; i < inputs.length; i++){
    if (inputs[i].value.trim() === ''){
      formValid = false;
      break;
    }
  }

  if (formValid) {
    event.preventDefault(); // Evita el envío del formulario por defecto
    window.location.href = '../index.html';
  }
});

/*------------------------------------------------------------------------
Local storage para registro
*/
// Obtener referencias a los campos de texto
var inputNombre = document.querySelector('.nombre');
var inputApellido = document.querySelector('.apellido');
var inputCorreo = document.querySelector('.correo');
var inputPassword1 = document.querySelector('.password1');
var inputPassword2 = document.querySelector('.password2');
var inputF_nacimiento = document.querySelector('.f_nacimiento')

// Obtener el contenido guardado del almacenamiento local
var nombreGuardado = localStorage.getItem('nombre');
var apellidoGuardado = localStorage.getItem('apellido');
var correoGuardado = localStorage.getItem('correo');
var password1Guardado = localStorage.getItem('password1');
var password2Guardado = localStorage.getItem('password2');
var f_nacimientoGuardado = localStorage.getItem('f_nacimiento');

// Restaurar el contenido si está disponible
if (nombreGuardado != null)
  inputNombre.value = nombreGuardado;
if (apellidoGuardado != null)
  inputApellido.value = apellidoGuardado;
if (password1Guardado != null)
  inputPassword1.value = password1Guardado;  
if (password2Guardado != null)
  inputPassword2.value = password2Guardado;
if (correoGuardado != null)
  inputCorreo.value = correoGuardado;
if (f_nacimientoGuardado != null)
  inputF_nacimiento.value = f_nacimientoGuardado;

// Guardar el contenido cuando se cambie
inputNombre.addEventListener('input',function() {
  localStorage.setItem('nombre', inputNombre.value);
});
inputApellido.addEventListener('input',function() {
  localStorage.setItem('apellido', inputApellido.value);
});
inputCorreo.addEventListener('input',function() {
  localStorage.setItem('correo', inputCorreo.value);
});
inputPassword1.addEventListener('input',function() {
  localStorage.setItem('password1', inputPassword1.value);
});
inputPassword2.addEventListener('input',function() {
  localStorage.setItem('password2', inputPassword2.value);
});
inputF_nacimiento.addEventListener('input',function() {
  localStorage.setItem('f_nacimiento', inputF_nacimiento.value);
});

//Verificacion de contrasena
function verificarCampos() {
  var valorPass1 = document.querySelector('.password1').value
  var valorPass2 = document.querySelector('.password2').value
  return valorPass1 === valorPass2;
}

//Comprobacion de haber iniciado sesion
let botonPresionado = localStorage.getItem('sesion_iniciada') === 'true';

function botonPresionadoHandler() {
  botonPresionado = true;
  // Guarda el valor en el localStorage
  localStorage.setItem('sesion_iniciada', true); 
}

// Agrega un event listener al botón para detectar el clic
const boton = document.querySelector('.boton_registrar');
boton.addEventListener("click", botonPresionadoHandler);