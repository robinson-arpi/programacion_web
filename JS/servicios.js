// Obtener todas las cards
const cards = document.querySelectorAll('.clickable');

// Añadir un eventListener click a cada card
cards.forEach(card => {
  card.addEventListener('click', () => {
    // Redireccionar a la url especificada en el atributo data-href de la card
    window.location.href = card.dataset.href;
  });
});