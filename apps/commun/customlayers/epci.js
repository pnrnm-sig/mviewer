{
    mviewer.customLayers.epci= {};
    var epci= mviewer.customLayers.epci;
    
    mviewer.customLayers.epci.layer = new ol.layer.Vector({
            source: new ol.source.Vector({
                url: "https://observatoire.parc-naturel-normandie-maine.fr/geoserver/carteetdonnees/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=carteetdonnees%3Aepci&outputFormat=application/json&srsName=EPSG:3857",
                format: new ol.format.GeoJSON()
            }),
            style: new ol.style.Style({
          fill: new ol.style.Fill({
            color: 'rgba(0, 0, 0, 0)'
          })
})  
    });
    mviewer.customLayers.epci.handle = false;
    }
