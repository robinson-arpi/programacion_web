function inicializarMapa() {
    var coordenadas = { lat: -0.19496898187598333, lng: -78.48125769088819 }; 
   
    var mapa = new google.maps.Map(document.getElementById('mapa'), {
      zoom: 15, // Zoom inicial del mapa
      center: coordenadas // Ubicación inicial del mapa
    });
    
    var marcador = new google.maps.Marker({
      position: coordenadas,
      map: mapa,
      title: 'Av. Diego de Almagro N31-95 entre Whymper y Alpallana'
    });
  }
  
  