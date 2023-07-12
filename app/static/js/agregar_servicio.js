$(document).ready(function() {  
  
  // ------------------------------- Enviar formulario -------------------------------------------------------------------------------------------//

  // Obtener el formulario
  var formAgregar = document.getElementById("form_agregar");

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

    var camposVacios = '';

    if (titulo.trim() === ""){
      camposVacios += "- Un título <br>";
    }

    if (descripcion.trim() === ""){
      camposVacios += "- Una descripción <br>";
    }

    if (ciudad.trim() === ""){
      camposVacios += "- Una ciudad donde ofrece el servicio <br>";
    }

    if (categoria.trim() === "Seleccione ..."){
      camposVacios += "- Una categoría <br>";
    }

    if (disponibilidad.trim() === "Seleccione ..."){
      camposVacios += "- Su disponibilidad <br>";
    }

    if (imagen.trim() === ""){
      camposVacios += "- Una imagen <br>";
    }

    if (camposVacios === '') {
      // Si hay un requisito no agregado a la lista
      if (document.getElementById("nuevo-requisito").value.trim() !== ""){
        $('#preguntaModal').modal('show');
        return;
      }
    } else {
      mostrarMensaje("Error", "Falta incluir: <br>" + camposVacios)
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
  var btnAgregarRequisito = document.getElementById("agregar-requisito");

  // Agregar requisito al hacer clic en el botón
  btnAgregarRequisito.addEventListener("click", function() {
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
    };
    reader.readAsDataURL(inputImagen.files[0]);
  });

  eliminarImagen.addEventListener("click", function() {
    imagenPreview.style.display = "none";
    eliminarImagen.style.display = "none";
    inputImagen.value = null;
    uploadArea.style.display = "flex";
  });

  // ------------------------------- Mostrar Mensaje Modal -------------------------------------------------------------------------------------------// 

  // Función para mostrar mensajes de éxito o error
  function mostrarMensaje(titulo, mensaje) {
    $('#mensajeModalLabel').text(titulo);
    document.getElementById('mensajeModal').querySelector('.modal-body').innerHTML = mensaje;
    $('#mensajeModal').modal('show');
  }

  // ------------------------------- Cerrar Modal -------------------------------------------------------------------------------------------// 
  $('#mensajeModal .btn-secondary').on('click', function() {
    $('#mensajeModal').modal('hide');
  });

  $('#mensajeModal .close').on('click', function() {
    $('#mensajeModal').modal('hide');
  });

  $('#btnX').on('click', function() {
    $('#preguntaModal').modal('hide');
  });

  $('#preguntaModal .btn-primary').on('click', function() {
    var requisito = inputRequisito.value;
    var li = document.createElement("li");
    li.classList.add("list-group-item");
    li.textContent = requisito;
    var botonEliminar = document.createElement("button");
    botonEliminar.classList.add("btn", "btn-danger", "btn-sm", "float-end");
    botonEliminar.textContent = "X";
    li.appendChild(botonEliminar);
    listaRequisitos.appendChild(li);
    inputRequisito.value = "";
    $('#preguntaModal').modal('hide');
  });

  $('#XCerrar').on('click', function() {
    console.log("Cerrar");
    $('#preguntaModal').modal('hide');
  }); 

  // ------------------------------- Limpiar campos -------------------------------------------------------------------------------------------// 

  $('#limpiar-campos').on('click', function() {
    formAgregar.reset();
    // quitar imagen
    imagenPreview.style.display = "none";
    eliminarImagen.style.display = "none";
    inputImagen.value = null;
    uploadArea.style.display = "flex";
    // Limpiar la lista de requisitos
    document.getElementById("requisitos-lista").innerHTML = "";
    document.getElementById("requisitos").value = "";
  });
  
});