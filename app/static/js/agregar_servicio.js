
// ------------------------------- Enviar formulario -------------------------------------------------------------------------------------------//

// Obtener el formulario y el botón de agregar servicio
var formAgregar = document.getElementById("form_agregar");
var btnAgregarServicio = document.getElementById("agregar-servicio");

// Agregar evento de escucha para el evento "submit" del formulario
formAgregar.addEventListener("submit", function(event) {
  event.preventDefault(); // Evitar que el formulario se envíe automáticamente

  // Obtener los valores de los campos del formulario
  var titulo = document.getElementById("titulo").value;
  var descripcion = document.getElementById("descripcion").value;
  var ciudad = document.getElementById("ciudad").value;
  var categoria = document.getElementById("categoria").value;
  var disponibilidad = document.getElementById("disponibilidad").value;
  var requisitosList = document.getElementById("requisitos-lista").getElementsByTagName("li");
  var imagen = document.getElementById("imagen").value;

  // Validar que todos los campos estén llenos
  if (titulo.trim() === "" || descripcion.trim() === "" || ciudad.trim() === "" || categoria.trim() === "" || disponibilidad.trim() === "" 
    || requisitosList.length === 0 || imagen.trim() === "") {
    alert("Por favor, complete todos los campos y seleccione una imagen.");
    return;
  }

  // Convertir la lista de requisitos en una cadena separada por punto y coma
  var requisitos = Array.from(requisitosList).map(function(li) {
    return li.textContent.trim();
  }).join(";");

  // Asignar el valor de los requisitos al campo oculto "requisitos"
  document.getElementById("requisitos").value = requisitos;

  // Enviar el formulario
  formAgregar.submit();
});

// ------------------------------- Para agregar o quitar requisitos -------------------------------------------------------------------------------------------//

var listaRequisitos = document.getElementById("requisitos-lista");
var inputRequisito = document.getElementById("nuevo-requisito");
var botonAgregar = document.getElementById("agregar-requisito");

// Agregar requisito al hacer clic en el botón
botonAgregar.addEventListener("click", function() {
  var requisito = inputRequisito.value;
  if (requisito.trim() !== "") {
    var li = document.createElement("li");
    li.classList.add("list-group-item");
    li.textContent = requisito;
    var botonEliminar = document.createElement("button");
    botonEliminar.classList.add("btn", "btn-danger", "btn-sm", "float-end");
    botonEliminar.textContent = "X";
    li.appendChild(botonEliminar);
    listaRequisitos.appendChild(li);
    inputRequisito.value = "";
  }
});

// Eliminar requisito al hacer clic en el botón "X"
listaRequisitos.addEventListener("click", function(event) {
  if (event.target.tagName === "BUTTON") {
    var requisitoElemento = event.target.parentNode;
    requisitoElemento.remove();
  }
});


// ------------------------------- Mostrar vista previa de imagen -------------------------------------------------------------------------------------------// 

var inputImagen = document.getElementById("imagen");
var imagenPreview = document.getElementById("imagen-preview");
var eliminarImagen = document.getElementById("eliminar-imagen");
var uploadArea = document.getElementById("upload-area");

uploadArea.addEventListener("click", function() {
  inputImagen.click();
});

inputImagen.addEventListener("change", function() {
  var reader = new FileReader();
  reader.onload = function(e) {
    imagenPreview.src = e.target.result;
    imagenPreview.style.display = "block";
    eliminarImagen.style.display = "block";
    uploadArea.style.display = "none";

    // Aplicar clase CSS adicional para imágenes verticales
    imagenPreview.addEventListener("load", function() {
      if (imagenPreview.naturalWidth < imagenPreview.naturalHeight) {
        imagenPreview.classList.add("vertical");
      } else {
        imagenPreview.classList.remove("vertical");
      }
    });
  };
  reader.readAsDataURL(inputImagen.files[0]);
});

eliminarImagen.addEventListener("click", function() {
  imagenPreview.style.display = "none";
  eliminarImagen.style.display = "none";
  inputImagen.value = null;
  uploadArea.style.display = "flex";
});
