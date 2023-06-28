var botonEliminar1 = document.getElementById("eliminar_favorito1");
var divFavorito1 = document.getElementById("favorito1");

var botonEliminar2 = document.getElementById("eliminar_favorito2");
var divFavorito2 = document.getElementById("favorito2");

var botonEliminar3 = document.getElementById("eliminar_favorito3");
var divFavorito3 = document.getElementById("favorito3");

var botonEliminar4 = document.getElementById("eliminar_favorito4");
var divFavorito4 = document.getElementById("favorito4");

botonEliminar1.addEventListener("click", function() {
    // Si hay cambios, muestra ventana de confirmación
    if(confirm("¿Está seguro que desea eliminar el servicio?")){
        divFavorito1.remove();
    }        
});

botonEliminar2.addEventListener("click", function() {
    // Si hay cambios, muestra ventana de confirmación
    if(confirm("¿Está seguro que desea eliminar el servicio?")){
        divFavorito2.remove();
    }        
});

botonEliminar3.addEventListener("click", function() {
    // Si hay cambios, muestra ventana de confirmación
    if(confirm("¿Está seguro que desea eliminar el servicio?")){
        divFavorito3.remove();
    }        
});

botonEliminar4.addEventListener("click", function() {
    // Si hay cambios, muestra ventana de confirmación
    if(confirm("¿Está seguro que desea eliminar el servicio?")){
        divFavorito4.remove();
    }        
});