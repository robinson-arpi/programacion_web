var inputNombre = document.getElementById('nombre');
var inputCalificacion = document.getElementById('calificacion');
var inputCategoria = document.getElementById('categoria');
var inputComentario = document.getElementById('comentario');

function valoresGuardados(){
  // Obtener el contenido guardado del almacenamiento local
  var nombreGuardado = localStorage.getItem('nombre_comentario');
  var calificacionGuardada = localStorage.getItem('calificacion_comentario');
  var categoriaGuardada = localStorage.getItem('categoria_comentario');
  var comentarioGuardada = localStorage.getItem('comentario_comentario');

  // Restaurar el contenido si está disponible
  if (nombreGuardado != null)
    inputNombre.value = nombreGuardado;
    
  if (calificacionGuardada != null)
   inputCalificacion.value = calificacionGuardada;

  if (categoriaGuardada != null)
    inputCategoria.value = categoriaGuardada;
  
  if (comentarioGuardada != null)
    inputComentario.value = comentarioGuardada;

  // Guardar el contenido cuando se cambie
  inputNombre.addEventListener('input', function() {
    localStorage.setItem('nombre_comentario', inputNombre.value);
  });

  inputCalificacion.addEventListener('changed', function() {
    localStorage.setItem('calificacion_comentario', inputCalificacion.value);
  });

  inputCategoria.addEventListener('changed', function() {
    localStorage.setItem('categoria_comentario', inputCategoria.value);
  });

  inputComentario.addEventListener('input', function() {
    localStorage.setItem('comentario_comentario', inputComentario.value);
  });
}

var buttonEnviar = document.querySelector('#btn-enviar');

buttonEnviar.addEventListener("click", function(event) {
  // Verifica si los campos required están llenos
  var inputs = document.querySelectorAll('input[required]');
  var formValid = true;
  var comboCategoria = true;
  var comboCalificacion = true;

  const calificacionSelect = document.getElementById('calificacion');
  const categoriaSelect = document.getElementById('categoria');

  for (var i = 0; i < inputs.length; i++){
    if (inputs[i].value.trim() === ''){
      event.preventDefault();
      formValid = false;
      break;
    }
  }

  if (calificacionSelect.value === '') {
    event.preventDefault();
    comboCalificacion = false;
    alert('Debe seleccionar una calificación');
    valoresGuardados();
    return;
  }

  if (categoriaSelect.value === '') {
    event.preventDefault();
    comboCategoria = false;
    alert('Debe seleccionar una categoría de servicio');
    valoresGuardados();
    return;
  }
   
  if (formValid && comboCalificacion && comboCategoria) {
    const form = document.querySelector('form'); // Selecciona el formulario
    const accordion = document.querySelector('.accordion'); // Selecciona el elemento que contiene los acordeones

    form.addEventListener('submit', (e) => { // Agrega un evento al formulario para cuando se envíe
      e.preventDefault(); // Previene el comportamiento predeterminado del formulario

      const nombre = document.querySelector('#nombre').value; // Obtiene el valor del campo de nombre
      const calificacion = document.querySelector('#calificacion').value; // Obtiene el valor del campo de calificación
      const categoria = document.querySelector('#categoria').value; // Obtiene el valor del campo de categoria
      const comentario = document.querySelector('#comentario').value; // Obtiene el valor del campo de comentario

      // Crea un nuevo acordeón
      const accordionItem = document.createElement('div');
      accordionItem.classList.add('accordion-item');

      // Crea el encabezado del acordeón con el nombre y la calificación
      const accordionHeader = document.createElement('h2');
      accordionHeader.classList.add('accordion-header');

      const accordionButton = document.createElement('button');
      accordionButton.classList.add('accordion-button');
      accordionButton.setAttribute('type', 'button');
      accordionButton.setAttribute('data-bs-toggle', 'collapse');
      accordionButton.setAttribute('data-bs-target', `#comentario-${Date.now()}`); // Usa la marca de tiempo actual como identificador único
      accordionButton.setAttribute('aria-expanded', 'true');
      accordionButton.setAttribute('aria-controls', `comentario-${Date.now()}`);

      accordionButton.innerHTML = `${nombre} > ${categoria} > 
              ${'★'.repeat(calificacion)}`;

      accordionHeader.appendChild(accordionButton);

      // Crea el cuerpo del acordeón con el comentario
      const accordionBody = document.createElement('div');
      accordionBody.classList.add('accordion-collapse', 'collapse');
      accordionBody.setAttribute('id', `comentario-${Date.now()}`);
      accordionBody.setAttribute('data-bs-parent', '#accordionExample');

      const accordionBodyContent = document.createElement('div');
      accordionBodyContent.classList.add('accordion-body');
      accordionBodyContent.innerHTML = comentario;

      accordionBody.appendChild(accordionBodyContent);

      // Agrega el encabezado y el cuerpo al acordeón
      accordionItem.appendChild(accordionHeader);
      accordionItem.appendChild(accordionBody);

      // Agrega el acordeón al contenedor
      accordion.appendChild(accordionItem);

      // Limpia los campos del formulario
      document.querySelector('#nombre').value = '';
      document.querySelector('#calificacion').value = '';
      document.querySelector('#categoria').value = '';
      document.querySelector('#comentario').value = '';

      inputNombre.addEventListener('input', function() {
        localStorage.setItem('nombre_comentario', inputNombre.value);
      });
    
      inputCalificacion.addEventListener('changed', function() {
        localStorage.setItem('calificacion_comentario', inputCalificacion.value);
      });
    
      inputCategoria.addEventListener('changed', function() {
        localStorage.setItem('categoria_comentario', inputCategoria.value);
      });
    
      inputComentario.addEventListener('input', function() {
        localStorage.setItem('comentario_comentario', inputComentario.value);
      });
    });
  }
});


