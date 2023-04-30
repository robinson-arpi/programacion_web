// const formComentario = document.getElementById('form-comentario');
// const listaComentarios = document.getElementById('lista-comentarios');

// formComentario.addEventListener('submit', function(event) {
//   event.preventDefault();
//   const comentario = document.getElementById('input-comentario').value;
//   const calificacion = document.querySelector('input[name="rating"]:checked').value;
//   const nuevoComentario = document.createElement('li');
//   nuevoComentario.className = 'list-group-item';
//   nuevoComentario.innerHTML = `
//     <div class="row">
//       <div class="col-12">
//         <p>${comentario}</p>
//       </div>
//       <div class="col-12">
//         <span>Calificación:</span>
//         <div class="estrellitas">
//           ${'★'.repeat(calificacion)}
//         </div>
//       </div>
//     </div>
//   `;
//   listaComentarios.appendChild(nuevoComentario);
//   formComentario.reset();
// });


const form = document.querySelector('form'); // Selecciona el formulario
const accordion = document.querySelector('.accordion'); // Selecciona el elemento que contiene los acordeones

form.addEventListener('submit', (e) => { // Agrega un evento al formulario para cuando se envíe
  e.preventDefault(); // Previene el comportamiento predeterminado del formulario

  const nombre = document.querySelector('#nombre').value; // Obtiene el valor del campo de nombre
  const calificacion = document.querySelector('#calificacion').value; // Obtiene el valor del campo de calificación
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
  //accordionButton.innerHTML = `${nombre} - ${calificacion} estrellas`;
   accordionButton.innerHTML = `${nombre} - 
         <span> Calificación:</span>
           <div class="estrellitas">
           ${'★'.repeat(calificacion)}
          </div>`;

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
  document.querySelector('#calificacion').value = '1';
  document.querySelector('#comentario').value = '';
});