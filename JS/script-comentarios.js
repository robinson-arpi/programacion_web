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
  document.querySelector('#calificacion').value = '1';
  document.querySelector('#calificacion').value = 'Computacion';
  document.querySelector('#comentario').value = '';
});