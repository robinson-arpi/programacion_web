// Obtener elementos HTML para cargar una imagen
var inputImagen = document.getElementById("input-imagen");
var imagenPreview = document.getElementById("imagen-preview");
var eliminarImagen = document.getElementById("eliminar-imagen");

// Mostrar el input de imagen al hacer clic en la sección de subir imagen
document.querySelector('.subir-imagen').addEventListener('click', function() {
  inputImagen.click();
});

// Actualizar la imagen preview al seleccionar una imagen
inputImagen.addEventListener('change', function() {
  var reader = new FileReader();
  reader.onload = function(e) {
    imagenPreview.src = e.target.result;
    imagenPreview.style.display = "block";
    eliminarImagen.style.display = "block";
  };
  reader.readAsDataURL(inputImagen.files[0]);
});

// Eliminar la imagen preview al hacer clic en el botón de eliminar
eliminarImagen.addEventListener('click', function() {
  imagenPreview.src = "";
  imagenPreview.style.display = "none";
  eliminarImagen.style.display = "none";
  inputImagen.value = null;
});

// Obtener el ancho de la sección de subir imagen
var width = document.querySelector('.subir-imagen').clientWidth;

// Establecer el ancho máximo de la imagen preview al ancho de la sección de subir imagen
imagenPreview.style.maxWidth = width + "px";

// Obtener la sección de subir imagen
var subirImagen = document.querySelector('.subir-imagen');

// Agregar un eventListener para el evento resize de la ventana
window.addEventListener('resize', function() {
  // Obtener el ancho de la sección de subir imagen
  var width = subirImagen.clientWidth;

  // Establecer el ancho máximo de la imagen preview al ancho de la sección de subir imagen
  imagenPreview.style.maxWidth = width + "px";
});

// para agregar requisitos
function agregarRequisito() {
    var requisito = document.getElementById("requisito").value;
    if (requisito != "") {
      var listaRequisitos = document.getElementById("lista-requisitos");
      var nuevoRequisito = document.createElement("li");
      nuevoRequisito.innerHTML = requisito + " <button onclick='eliminarRequisito(this.parentNode)'>X</button>";
      listaRequisitos.appendChild(nuevoRequisito);
      document.getElementById("requisito").value = "";
    }
  }

  function eliminarRequisito(nodo) {
    nodo.parentNode.removeChild(nodo);
  }

// boton cancelar
const btnCancelar = document.getElementById("btnCancelar")
btnCancelar.addEventListener("click", cancelar());

function cancelar() {
    if(document.getElementById("titulo").value != "" ||
        document.getElementById("descripcion").value != "" ||
        document.getElementById("ciudad").value != "" ||
        document.getElementById("categoria").selectedIndex != 0 ||
        document.getElementById("disponibilidad").selectedIndex != 0 ||
        document.getElementById("lista-requisitos").innerHTML != ""
    ){
        // Si hay cambios, muestra ventana de confirmación
        if(confirm("¿Está seguro que desea descartar los cambios?")){
            window.location.href = "../index.html";
        }        
    }else{
        window.location.href = "../index.html";
    }
 
}
