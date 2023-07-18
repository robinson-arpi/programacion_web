var formValid = true;
var form = document.querySelector('.form_registro');
form.addEventListener("submit", function(event) {
  // Verifica si los campos required están llenos
  var inputs = document.querySelectorAll('input[required]');
  
  
  for (var i = 0; i < inputs.length; i++){
    if (inputs[i].value.trim() === ''){
      formValid = false;
      break;
    }
  }

  
  if (formValid) {
    event.preventDefault(); // Evita el envío del formulario por defecto
    form.submit(); // Si los campos son válidos, envía el formulari
    localStorage.setItem('nombre', '');
    localStorage.setItem('apellido', '');
    localStorage.setItem('correo', '');
    localStorage.setItem('username', '');
    localStorage.setItem('f_nacimiento', '');
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
var inputNickname = document.querySelector('.username');
var inputPassword1 = document.querySelector('.password1');
var inputPassword2 = document.querySelector('.password2');
var inputF_nacimiento = document.querySelector('.f_nacimiento')

// Obtener el contenido guardado del almacenamiento local
var nombreGuardado = localStorage.getItem('nombre');
var apellidoGuardado = localStorage.getItem('apellido');
var correoGuardado = localStorage.getItem('correo');
var f_nacimientoGuardado = localStorage.getItem('f_nacimiento');
var usernameGuardado = localStorage.getItem('.username');

var nombreError = document.getElementById('nombre_completo_error');
var correoError = document.getElementById('correo-error');
var passwordError = document.getElementById('password-error');
var confirmPassError = document.getElementById('confirm-password-error');
var usernameError = document.getElementById('username-error');
var fechaError = document.getElementById('fecha-error');

// Agrega event listeners a los campos de texto para validar los datos ingresados
inputNombre.addEventListener('input', validarNombre);
inputApellido.addEventListener('input', validarNombre);
inputCorreo.addEventListener('input', validarCorreo);
inputPassword1.addEventListener('input', validarContraseña);
inputPassword2.addEventListener('input', validarConfirmacionContraseña);
inputF_nacimiento.addEventListener('input', validarFechaNacimiento);


// Restaurar el contenido si está disponible
if (nombreGuardado != null)
  inputNombre.value = nombreGuardado;
if (apellidoGuardado != null)
  inputApellido.value = apellidoGuardado;
if (correoGuardado != null)
  inputCorreo.value = correoGuardado;
if (f_nacimientoGuardado != null)
  inputF_nacimiento.value = f_nacimientoGuardado;
if (usernameGuardado != null)
  inputNickname.value = usernameGuardado;  
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
inputNickname.addEventListener('input',function() {
  localStorage.setItem('username', inputNickname.value);
});

inputF_nacimiento.addEventListener('input',function() {
  localStorage.setItem('f_nacimiento', inputF_nacimiento.value);
});

// Funciones de validación
function validarNombre() {
  if (inputNombre.value.trim() === '' || inputApellido.value.trim() === '') {
    nombreError.textContent = 'Ingrese un nombre y apellido';
    formValid = false;
  } else {
    nombreError.textContent = '';
    formValid = true;
  }
}

function validarCorreo() {
  var correo = inputCorreo.value.trim();
  // Expresión regular para validar el formato del correo electrónico
  var regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (correo === '') {
    correoError.textContent = 'Ingrese un correo';
    formValid = false;
  } else if (!regexCorreo.test(correo)) {
    correoError.textContent = 'Ingrese un correo válido';
    formValid = false;
  } else{
    // Realizar petición AJAX para verificar si el correo ya existe
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/verificar_correo?correo=' + correo);
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          var response = JSON.parse(xhr.responseText);
          if (response.existe) {
            correoError.textContent = 'El correo ya está registrado';
            formValid = false;
          } else {
            correoError.textContent = '';
            formValid = true;
          }
        } else {
          correoError.textContent = 'Error en la verificación del correo';
          formValid = false;
        }
      }
    };
  xhr.send();
  }
}

function validarContraseña() {
  var contraseña = inputPassword1.value.trim();
  // Verificar la longitud
  if (contraseña.length < 8) {
    passwordError.textContent = 'Al menos 8 caracteres';
    formValid = false;
  } else {
    passwordError.textContent = '';
    formValid = true;
  }
}

function validarConfirmacionContraseña() {
  var pass1 = inputPassword1.value.trim();
  var pass2 = inputPassword2.value.trim();

  if (pass2 !== pass1) {
    confirmPassError.textContent = 'Las contraseñas no coinciden';
    formValid = false;
  } else {
    confirmPassError.textContent = '';
    formValid = true;
  }
}

function validarFechaNacimiento() {
  // Obtener la fecha actual
  var fechaActual = new Date();

  // Obtener la fecha ingresada desde el input (asumiendo que el input tiene el id "fechaNacimiento")
  var fechaIngresada = new Date(inputF_nacimiento.value);

  // Calcular la fecha hace 18 años
  var fechaHace18Anios = new Date();
  fechaHace18Anios.setFullYear(fechaActual.getFullYear() - 18);

  // Comparar la fecha ingresada con la fecha hace 18 años
  if (fechaIngresada > fechaHace18Anios) {
    fechaError.textContent = 'Debes tener al menos 18 años';
    formValid = false;
  } else {
    fechaError.textContent = '';
    formValid = true;
  }
}
