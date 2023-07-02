$('.modificar-btn').click(function() {
    var id = $(this).data('id');
    mostrarFormularioModificar(id);
  });

  // Función para mostrar el formulario de modificación con los datos del cliente
  function mostrarFormularioModificar(id) {
    try {
      $('#modalEditar').modal('show');
    } catch (error) {
      mostrarMensaje('Error', 'Error al obtener los datos del cliente.');
    }
  }
  
    // Evento de submit para actualizar un usuario
    $(document).ready(function() {
      $('#formularioEditar').submit(function(event) {
        event.preventDefault();  // Evita la acción predeterminada del formulario
        
        var userId = $('.id').val();  // Obtén el valor del campo oculto con clase "id"
        var url = '/actualizar_usuario/' + userId;  // Construye la URL para el método PUT
        
        var formData = $(this).serialize();  // Serializa los datos del formulario
    
        $.ajax({
          url: url,  // Utiliza la URL construida
          type: 'PUT',
          data: formData,
          success: function(response) {
            // Manejar la respuesta exitosa
            $('#modalEditar').modal('hide');
          },
          error: function(error) {
            // Manejar el error
          }
        });
      });
    });
    
      
            
    
      
    