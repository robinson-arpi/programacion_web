// Obtener elementos HTML para cargar una imagen
var inputImagen = document.getElementById("input-imagen");
var imagenPreview = document.getElementById("imagen-preview");
var eliminarImagen = document.getElementById("eliminar-imagen");
var subirImagen = document.querySelector('.subir-imagen');

// Mostrar el input de imagen al hacer clic en la sección de subir imagen
subirImagen.addEventListener('click', function() {
  inputImagen.click();
});

// Actualizar la imagen preview al seleccionar una imagen
inputImagen.addEventListener('change', function() {
  var reader = new FileReader();
  reader.onload = function(e) {
    imagenPreview.src = e.target.result;
    imagenPreview.style.display = "block";
    eliminarImagen.style.display = "block";
    subirImagen.style.display = "none"; // Ocultar la sección de subir imagen
  };
  reader.readAsDataURL(inputImagen.files[0]);
});

// Eliminar la imagen preview al hacer clic en el botón de eliminar
eliminarImagen.addEventListener('click', function() {
  imagenPreview.src = "";
  imagenPreview.style.display = "none";
  eliminarImagen.style.display = "none";
  inputImagen.value = null;
  subirImagen.style.display = "flex"; // Mostrar la sección de subir imagen
});

// agregar eliminar requisitos
// Obtener elementos necesarios
var listaRequisitos = document.getElementById("requisitos");
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
    botonEliminar.addEventListener("click", function() {
      li.remove();
    });
    li.appendChild(botonEliminar);
    listaRequisitos.appendChild(li);
    inputRequisito.value = "";
  }
});

// submit

