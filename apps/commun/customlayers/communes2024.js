{
    mviewer.customLayers.communes2024 = {};
    var communes2024 = mviewer.customLayers.communes2024 ;
    
    mviewer.customLayers.communes2024 .layer = new ol.layer.Vector({
            source: new ol.source.Vector({
                url: "https://observatoire.parc-naturel-normandie-maine.fr/geoserver/carteetdonnees/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=carteetdonnees%3Acommunes_parc2024&outputFormat=application/json&srsName=EPSG:3857",
                format: new ol.format.GeoJSON()
            }),
            style: new ol.style.Style({
          fill: new ol.style.Fill({
            color: 'rgba(0, 0, 0, 0)'
          })
})  
    });
    mviewer.customLayers.communes2024 .handle = false;
    }
