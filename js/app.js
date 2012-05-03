window.onload=function(){
    map.on('zoomend', function(zoom) {
        settings.zoom = map.getZoom();
    });

    document.getElementById('btnLocation').addEventListener('click', function(e) {
        if (navigator.geolocation) {  
            navigator.geolocation.getCurrentPosition(function(position) {  
                map.setView(new L.LatLng(position.coords.latitude, position.coords.longitude), settings.zoom);
                if (!map.currentLocationMarker) {
                    // create a marker in the given location and add it to the map
                    map.currentLocationMarker = new L.Marker(
                        new L.LatLng(position.coords.latitude, position.coords.longitude));
                    map.addLayer(map.currentLocationMarker);
                } else {
                    map.currentLocationMarker.setLatLng(
                        new L.LatLng(position.coords.latitude, position.coords.longitude))
                }
            });
        } else {  
          alert("I'm sorry, but geolocation services are not supported by your browser.");  
        } 
    });

    var btn = document.getElementById('btnSearch');
    btn.addEventListener('click', function(e){

       var scriptTag = document.getElementById('geoSearchjsonp');
       if (scriptTag){
           scriptTag.parentNode.removeChild(scriptTag);
        }

        scriptTag = document.createElement('SCRIPT');
        scriptTag.id = 'geoSearchjsonp';
        scriptTag.src = "http://nominatim.openstreetmap.org/search?q="+
            document.getElementById('txtSearch').value+
            "&format=json&json_callback=geoSearchCallback";
        document.getElementsByTagName('HEAD')[0].appendChild(scriptTag);

    });
    
};

function geoSearchCallback(result){
    var location = null;
    for (var i=0; i<result.length;i++){
        if (result[i].type=="city" && result[i].osm_type=="node"){
            location = result[i];
            break;
        }
    }
    if (!location){
        location = result[0];
    }
    if (!location){
        alert('unable to find location');
    } else {
        console.log(result);
        map.setView(new L.LatLng(location.lat, location.lon), settings.zoom);
    }
    
};
