{
  mviewer.customLayers.villes_portes = {};
  var villes_portes = mviewer.customLayers.villes_portes;

  mviewer.customLayers.villes_portes.layer = new ol.layer.Vector({
    source: new ol.source.Vector({
      url: "https://observatoire.parc-naturel-normandie-maine.fr/geoserver/carteetdonnees/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=carteetdonnees%3Avilles_portes&outputFormat=application/json&srsName=EPSG:3857",
      format: new ol.format.GeoJSON()
    }),
    style: new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: 'rgba(200,86,86)'
      }),
      fill: new ol.style.Fill({
        color: 'rgba(235, 179, 185, 0.21)'
      })
    })
  });

  mviewer.customLayers.villes_portes.handle = false;
}
