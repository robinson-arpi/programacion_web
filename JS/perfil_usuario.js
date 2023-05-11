var botonEliminar = document.getElementById("eliminar_servicio3");
var divServicio3 = document.getElementById("servicio3");

var botonEliminar2 = document.getElementById("eliminar_servicio2");
var divServicio2 = document.getElementById("servicio2");

botonEliminar.addEventListener("click", function() {
    // Si hay cambios, muestra ventana de confirmación
    if(confirm("¿Está seguro que desea eliminar el servicio?")){
        divServicio3.remove();
    }        
});

botonEliminar2.addEventListener("click", function() {
    // Si hay cambios, muestra ventana de confirmación
    if(confirm("¿Está seguro que desea eliminar el servicio?")){
        divServicio2.remove();
    }        
});