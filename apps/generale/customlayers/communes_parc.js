{
  mviewer.customLayers.communes_parc = {};
  var communes_parc = mviewer.customLayers.communes_parc;

  mviewer.customLayers.communes_parc.layer = new ol.layer.Vector({
    source: new ol.source.Vector({
      url: "https://observatoire.parc-naturel-normandie-maine.fr/geoserver/carteetdonnees/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=carteetdonnees%3Acommunes_parc&outputFormat=application/json&srsName=EPSG:3857",
      format: new ol.format.GeoJSON()
    }),
    style: function (feature) {
      var stl;
      // Si l'entité a une valeur pour statutparc (n'est pas NULL)
      if (feature.get("statutparc")) {
        // Prendre la valeur de statutparc
        switch (feature.get("statutparc")) {
          // Si la valeur de statutparc est égale à Commune rurale
          case "Commune rurale":
            // Appliquer le style ci-dessous
            stl = new ol.style.Style({
              stroke: new ol.style.Stroke({
                color: 'rgb(178, 118, 219)'
              }),
              fill: new ol.style.Fill({
                color: 'rgba(190,174,212,0.3)'
              })
              }) 
            break;
          // Si la valeur de statutparc est égale à Ville porte
          case "Ville porte":
            // Appliquer le style ci-dessous
            stl = new ol.style.Style({
              stroke: new ol.style.Stroke({
                color: 'rgb(233, 170, 53)'
              }),
              fill: new ol.style.Fill({
                color: 'rgba(253,192,134,0.2)'
              })
              }) 
            break;
            // Si la valeur de statutparc est égale à Centre d'appui
          case "Centre d'appui":
          // Appliquer le style ci-dessous
            stl = new ol.style.Style({
                stroke: new ol.style.Stroke({
                  color: 'rgba(89, 152, 34)'
                }),
                fill: new ol.style.Fill({
                  color: 'rgba(89, 152, 34, 0.4)'
                })
                }) 
              break;
          }
      } return stl
    }
  });

  mviewer.customLayers.communes_parc.handle = false;
}
