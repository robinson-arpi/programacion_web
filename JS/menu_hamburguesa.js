// Obtener los elementos del menú de hamburguesa y la lista de enlaces
const menuHamburguesa = document.querySelectorAll('.menu-hamburguesa');
const navbarNav = document.querySelectorAll('.navbar-nav');

// Agregar evento de clic al menú de hamburguesa
menuHamburguesa.forEach((element) => {
  element.addEventListener('click', () => {
    // Alternar la clase 'active' en la lista de enlaces al hacer clic en el menú de hamburguesa
    navbarNav.forEach((nav) => {
      nav.classList.toggle('active');
    });
  });
});

document.addEventListener("DOMContentLoaded", function() {
  var menuButton = document.getElementById("menu-button");
  var menuItems = document.getElementById("menu-items");

  menuButton.addEventListener("click", function() {
    menuItems.classList.toggle("show");
  });
});