const inputFecha = document.getElementById('fecha');

inputFecha.addEventListener('change', (evento) => {
  const fecha = new Date(evento.target.value);
  const dia = fecha.getDate().toString().padStart(2, '0');
  const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
  const anio = fecha.getFullYear().toString();
  inputFecha.value = `${dia}/${mes}/${anio}`;
});