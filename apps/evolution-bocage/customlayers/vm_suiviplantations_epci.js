
{
  
  mviewer.customLayers.vm_suiviplantations_epci = {};
  var vm_suiviplantations_epci = mviewer.customLayers.vm_suiviplantations_epci;


  mviewer.customLayers.vm_suiviplantations_epci.layer = new ol.layer.Vector({
    source: new ol.source.Vector({
      url: "https://observatoire.parc-naturel-normandie-maine.fr/geoserver/carteetdonnees/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=carteetdonnees%3Avm_suiviplantations_epci&outputFormat=application/json&srsName=EPSG:3857",
      format: new ol.format.GeoJSON()
    }),
    style: function (feature) {
      var fill = new ol.style.Fill({ color: 'rgba(235, 179, 185, 0.21)' });
      var stroke = new ol.style.Stroke({ color: 'rgba(200,86,86)', width: 2 });
      var geom = "40504.598600620004,6154841.750600785";

      if (feature.get('haies_ml') <= 3000) {

        new ol.style.Style({
          image: new ol.style.Circle({
            radius: 5,
            fill: fill,
            stroke: stroke
          }),
          geometry: geom
        });
      }
      else if (feature.get('haies_ml') > 3000 && feature.get('haies_ml') <= 6000) {

        new ol.style.Style({
          image: new ol.style.Circle({
            radius: 10,
            fill: fill,
            stroke: stroke
          }),
          geometry: geom
        });
      }
      else if (feature.get('haies_ml') > 6000 && feature.get('haies_ml') <= 9000) {

        new ol.style.Style({
          image: new ol.style.Circle({
            radius: 15,
            fill: fill,
            stroke: stroke
          }),
          geometry: geom
        });
      }
      else if (feature.get('haies_ml') > 9000 && feature.get('haies_ml') <= 12000) {

        new ol.style.Style({
          image: new ol.style.Circle({
            radius: 20,
            fill: fill,
            stroke: stroke
          }),
          geometry: geom
        });
      }
      else if (feature.get('haies_ml') > 12000 ){

        new ol.style.Style({
          image: new ol.style.Circle({
            radius: 25,
            fill: fill,
            stroke: stroke
          }),
          geometry: geom
        });


    }
  }});

  mviewer.customLayers.vm_suiviplantations_epci.handle = false;
}