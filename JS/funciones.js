function funcionRegresar() {
    window.history.back();
}

function cerrarSesion(){
  localStorage.removeItem("sesion_iniciada");
}