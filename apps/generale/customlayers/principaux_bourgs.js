{
  mviewer.customLayers.principaux_bourgs = {};
  var principaux_bourgs = mviewer.customLayers.principaux_bourgs;

  mviewer.customLayers.principaux_bourgs.layer = new ol.layer.Vector({
    source: new ol.source.Vector({
      url: "https://observatoire.parc-naturel-normandie-maine.fr/geoserver/carteetdonnees/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=carteetdonnees%3Aprincipaux_bourgs&outputFormat=application/json&srsName=EPSG:3857",
      format: new ol.format.GeoJSON()
    }),
    style: function (feature) {
      var fill = new ol.style.Fill({ color: 'rgba(235, 179, 185, 0.21)' });
      var stroke = new ol.style.Stroke({ color: 'rgba(200,86,86)', width: 2 });

      if (feature.get('population') <= 1000) {

        return new ol.style.Style({
          image: new ol.style.Circle({
            radius: 5,
            fill: fill,
            stroke: stroke
          })

        });
      }
      else if (feature.get('population') > 1000 && feature.get('population') <= 2000) {

        return new ol.style.Style({
          image: new ol.style.Circle({
            radius: 10,
            fill: fill,
            stroke: stroke
          })

        });
      }
      else if (feature.get('population') > 2000 && feature.get('population') <= 3000) {

        return new ol.style.Style({
          image: new ol.style.Circle({
            radius: 15,
            fill: fill,
            stroke: stroke
          })

        });
      }
      else if (feature.get('population') > 3000 && feature.get('population') <= 4000) {

        return new ol.style.Style({
          image: new ol.style.Circle({
            radius: 20,
            fill: fill,
            stroke: stroke
          })

        });
      }
      else if (feature.get('population') > 4000 && feature.get('population') <= 5186) {

        return new ol.style.Style({
          image: new ol.style.Circle({
            radius: 25,
            fill: fill,
            stroke: stroke
          })

        });
      };


    }
  });

  mviewer.customLayers.principaux_bourgs.handle = false;
}