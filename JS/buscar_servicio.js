
document.getElementById("btn_buscar").addEventListener("click", function() {

    var term = document.getElementById("busqueda").value.toLowerCase();
    var cards = document.querySelectorAll(".card clickable");
    cards.forEach(function(card) {
      var title = card.querySelector(".card-title").textContent.toLowerCase();
      var description = card.querySelector(".card-description").textContent.toLowerCase();
      if (title.includes(term) || description.includes(term)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });