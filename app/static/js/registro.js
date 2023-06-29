form.addEventListener("submit", function(event) {
  // Verifica si los campos required están llenos
  var inputs = document.querySelectorAll('input[required]');
  var formValid = true;
  
  for (var i = 0; i < inputs.length; i++){
    if (inputs[i].value.trim() === ''){
      formValid = false;
      break;
    }
  }

  if (!verificarCampos()){
    alert("Las contraseñas no coinciden");
    formValid = false;
  }

  if (!validarContraseña()){
    alert("Las contraseña debe tener al menos 8 caracteres y combinar numeros y letras");
    formValid = false;
  }

  if (!validarCorreo()){
    alert("El formato del correo es incorrecto");
    formValid = false;
  }

  if (!verificarEdad()){
    alert("La fecha de nacimiento es de alguien menor de edad");
    formValid = false;
  }


  if (formValid) {
    event.preventDefault(); // Evita el envío del formulario por defecto
    form.submit(); // Si los campos son válidos, envía el formulari
  }else {
    event.preventDefault(); // Evita el envío del formulario por defecto
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


function validarContraseña() {
  var contraseña = document.querySelector('.password1').value
  // Verificar la longitud
  if (contraseña.length < 8 ) {
    return false;
  }

  // Verificar que contenga al menos un número y una letra
  var tieneNumero = false;
  var tieneLetra = false;
  
  for (var i = 0; i < contraseña.length; i++) {
    var caracter = contraseña.charAt(i);

    if (!isNaN(caracter)) {
      tieneNumero = true;
    } else if (caracter.match(/[a-zA-Z]/)) {
      tieneLetra = true;
    }
  }

  return tieneNumero && tieneLetra;
}

function verificarEdad() {
  // Obtener la fecha actual
  var fechaActual = new Date();

  // Obtener la fecha ingresada desde el input (asumiendo que el input tiene el id "fechaNacimiento")
  var fechaIngresada = new Date(document.getElementById("fecha").value);

  // Calcular la fecha hace 18 años
  var fechaHace18Anios = new Date();
  fechaHace18Anios.setFullYear(fechaActual.getFullYear() - 18);

  // Comparar la fecha ingresada con la fecha hace 18 años
  if (fechaIngresada <= fechaHace18Anios) {
    return true;
  } else {
    return false;
  }
}

function validarCorreo() {
  var correo = document.querySelector('.correo').value
  // Expresión regular para validar el formato del correo electrónico
  var regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Validar el formato del correo utilizando la expresión regular
  return regexCorreo.test(correo);
}