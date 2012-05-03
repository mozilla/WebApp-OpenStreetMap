window.onload=function(){
    map.on('zoomend', function(zoom) {
        settings.zoom = map.getZoom();
    });

    var my = document.getElementById('mylocation');
    my.addEventListener('click', function(e) {
        if (navigator.geolocation) {  
            navigator.geolocation.getCurrentPosition(function(position) {  
                map.setView(new L.LatLng(position.coords.latitude, position.coords.longitude), settings.zoom);
                // create a marker in the given location and add it to the map
                var marker = new L.Marker(new L.LatLng(position.coords.latitude, position.coords.longitude));
                map.addLayer(marker);
            });
        } else {  
          alert("I'm sorry, but geolocation services are not supported by your browser.");  
        } 
    });
};
