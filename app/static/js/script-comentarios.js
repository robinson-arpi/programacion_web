form.addEventListener("submit", function(even){
  // Verifica si los campos required están llenos
  var inputs = document.querySelectorAll('input[required]');
  var formValid = true;


  for (var i = 0; i < inputs.length; i++){
    if (inputs[i].value.trim() === ''){
      formValid = false;
      break;
    }
  }

  if (!validarComboBox()){
    formValid = false;
  }

  if (formValid) {
    event.preventDefault(); // Evita el envío del formulario por defecto
    form.submit(); // Si los campos son válidos, envía el formulario
  }
});

function validarComboBox(){
  const calificacionSelect = document.getElementById('calificacion');
  const categoriaSelect = document.getElementById('categoria');
  if (calificacionSelect.value === '') {
    event.preventDefault();
    //valoresGuardados();
    return false;
  } 

  if (categoriaSelect.value === '') {
    event.preventDefault();
    // valoresGuardados();
    return false;
  }

  return true;
}
