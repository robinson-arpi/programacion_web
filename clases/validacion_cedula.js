function validarCedula(cedula) {
    if (cedula.length != 10) {
      alert("La cédula debe tener 10 dígitos");
      return false;
    }
    var coeficientes = [2, 1, 2, 1, 2, 1, 2, 1, 2];
    var suma = 0;
    var ultimoDigitoCedula = parseInt(cedula.charAt(9));
    for (var i = 0; i < 9; i++) {
      var digitoCedula = parseInt(cedula.charAt(i));
      var producto = digitoCedula * coeficientes[i];
      if (producto >= 10) {
        producto -= 9;
      }
      suma += producto;
    }
    var ultimoDigitoCalculado = 10 - (suma % 10);
    if (ultimoDigitoCalculado == 10) {
      ultimoDigitoCalculado = 0;
    }
    if (ultimoDigitoCedula != ultimoDigitoCalculado) {
      alert("La cédula es inválida");
      return false;
    }
    return true;
  }
  