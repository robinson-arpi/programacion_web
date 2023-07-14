function inicializarMapa() {
    var coordenadas = { lat: -2.897424438401388, lng: -79.00446922485868 }; 
   
    var mapa = new google.maps.Map(document.getElementById('mapa'), {
      zoom: 15, // Zoom inicial del mapa
      center: coordenadas // Ubicación inicial del mapa
    });
    
    var marcador = new google.maps.Marker({
      position: coordenadas,
      map: mapa,
      title: 'Calle Luis Cordero y Avenida Simón Bolivar'
    });
  }
