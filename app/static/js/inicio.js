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

  if (!validarCorreo()){
    alert("El formato del correo es incorrecto");
    formValid = false;
  }
    
  if (formValid) {
    event.preventDefault(); // Evita el envío del formulario por defecto
    window.location.href = '../index.html';
  }
});

/*------------------------------------------------------------------------
Local storage para incio
*/
// Obtener referencias a los campos de texto
var inputCorreo = document.querySelector('.correo');
var inputContraseña = document.querySelector('.password');

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


/*------------------------------------------------------------------------
Boton para registro con google

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId());
    console.log('Nombre: ' + profile.getName());
    console.log('Imagen URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail());
  }
  */


//Comprobacion de haber iniciado sesion
let botonPresionado = localStorage.getItem('sesion_iniciada') === 'true';

function botonPresionadoHandler() {
  botonPresionado = true;
  // Guarda el valor en el localStorage
  localStorage.setItem('sesion_iniciada', true); 
}

// Agrega un event listener al botón para detectar el clic
const boton = document.querySelector(".boton_iniciar");
boton.addEventListener("click", botonPresionadoHandler);


function validarCorreo() {
  var correo = document.querySelector('.correo').value
  // Expresión regular para validar el formato del correo electrónico
  var regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Validar el formato del correo utilizando la expresión regular
  return regexCorreo.test(correo);
}