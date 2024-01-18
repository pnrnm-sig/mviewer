{
  mviewer.customLayers.epci = {};
  var epci = mviewer.customLayers.epci;


  // Lignes en diagonale
  function makeBackslash() {
    var cnv = document.createElement('canvas');
    var ctx = cnv.getContext('2d');
    cnv.width = 20;
    cnv.height = 20;
    ctx.strokeStyle = 'rgba(177, 89, 40, 0.7)'
    ctx.lineWidth = 2;
    
    ctx.beginPath();
    ctx.moveTo(20, 20);
    ctx.lineTo(0, 0);
    ctx.stroke();
    
    return ctx.createPattern(cnv, 'repeat');
  }

  // Lignes verticales
  function makeVertline() {
    var cnv = document.createElement('canvas');
    var ctx = cnv.getContext('2d');
    cnv.width = 15;
    cnv.height = 15;
    ctx.strokeStyle = 'rgb(50, 50, 50)';
    
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, 15);
    ctx.stroke();
    
    return ctx.createPattern(cnv, 'repeat');
  }

  // Lignes horizontales
  function makeHorline() {
    var cnv = document.createElement('canvas');
    var ctx = cnv.getContext('2d');
    cnv.width = 20;
    cnv.height = 20;
    ctx.strokeStyle = 'rgb(31, 120, 180, 0.7)';
    ctx.lineWidth = 3;
    
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(20, 0);
    ctx.stroke();
    
    
    return ctx.createPattern(cnv, 'repeat');
  }
  mviewer.customLayers.epci.layer = new ol.layer.Vector({
    source: new ol.source.Vector({
      url: "https://observatoire.parc-naturel-normandie-maine.fr/geoserver/carteetdonnees/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=carteetdonnees%3Aepci&outputFormat=application/json&srsName=EPSG:3857",
      format: new ol.format.GeoJSON()
    }),
    style: function (feature) {
      var stl;
      // Si l'entité a une valeur pour epci (n'est pas NULL)
      if (feature.get("epci")) {
        // Prendre la valeur de epci
        switch (feature.get("epci")) {
          // Si la valeur de epci est égale à Communauté de communes
          case "Communauté de communes":
            // Appliquer le style ci-dessous
            stl = new ol.style.Style({
              fill: new ol.style.Fill({
                //color: 'rgba(255, 255, 255, 0.6)'
                color: makeVertline()
              }),
              stroke: new ol.style.Stroke({
                color: 'rgb(50, 50, 50)'
              })
            })
            break;
          // Si la valeur de epci est égale à Communauté d'agglomération
          case "Communauté d'agglomération":
          // Appliquer le style ci-dessous
            stl = new ol.style.Style({              
              stroke: new ol.style.Stroke({
                color: 'rgba(177,89,40)'
            }),
            fill: new ol.style.Fill({
              color: makeBackslash()

                })
                }) 
              break;
          // Si la valeur de epci est égale à Communauté urbaine
          case "Communauté urbaine":
            // Appliquer le style ci-dessous
            stl = new ol.style.Style({
              stroke: new ol.style.Stroke({
                color: 'rgb(71,71,71)'
              }),
              fill: new ol.style.Fill({
                color:  makeHorline()
              })
              }) 
            break;
          }
      } return stl
    }
  });
  mviewer.customLayers.epci.handle = false;
}
