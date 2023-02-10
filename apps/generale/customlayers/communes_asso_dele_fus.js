{

  // Motif à gros points
  function makeBigDots() {
    var cnv = document.createElement('canvas');
    var ctx = cnv.getContext('2d');
    cnv.width = 20;
    cnv.height = 20;
    ctx.fillStyle = 'rgb(20, 97, 148)'
    ctx.lineWidth = 2;
    
      const circle = new Path2D();
      circle.arc(10, 10, 6, 0, 2 * Math.PI);
  
      ctx.fill(circle);
    
  
    
    return ctx.createPattern(cnv, 'repeat');
  }

  // Motif à moyen points
  function makeMiddleDots() {
    var cnv = document.createElement('canvas');
    var ctx = cnv.getContext('2d');
    cnv.width = 20;
    cnv.height = 20;
    ctx.fillStyle = 'rgb(20, 97, 148)'
    ctx.lineWidth = 2;
    
      const circle = new Path2D();
      circle.arc(10, 10, 3, 0, 2 * Math.PI);
  
      ctx.fill(circle);
    
  
    
    return ctx.createPattern(cnv, 'repeat');
  }

  // Motif à petit points
  function makeSmallDots() {
    var cnv = document.createElement('canvas');
    var ctx = cnv.getContext('2d');
    cnv.width = 10;
    cnv.height = 10;
    ctx.fillStyle = 'rgb(20, 97, 148)'
    ctx.lineWidth = 2;
    
      const circle = new Path2D();
      circle.arc(5, 5, 1, 0, 2 * Math.PI);
  
      ctx.fill(circle);
    
  
    
    return ctx.createPattern(cnv, 'repeat');
  }
  mviewer.customLayers.communes_asso_dele_fus = {};
  var communes_asso_dele_fus = mviewer.customLayers.communes_asso_dele_fus;

  mviewer.customLayers.communes_asso_dele_fus.layer = new ol.layer.Vector({
    source: new ol.source.Vector({
      url: "https://observatoire.parc-naturel-normandie-maine.fr/geoserver/carteetdonnees/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=carteetdonnees%3Acommunes_asso_dele_fus&outputFormat=application/json&srsName=EPSG:3857",
      format: new ol.format.GeoJSON()
    }),
    // Création d'une fonction pour l'attribution du style en fonction des attributs
    style: function (feature) {
      var stl;
      // Si l'entité a une valeur pour nature (n'est pas NULL)
      if (feature.get("nature")) {
        // Prendre la valeur de nature
        switch (feature.get("nature")) {
          // Si la valeur de nature est égale à Commune simple
          case "Commune associée":
            // Appliquer le style ci-dessous
            stl = new ol.style.Style({
              stroke: new ol.style.Stroke({
                color: 'rgb(50, 50, 50)'
              }),
              fill: new ol.style.Fill({
                color: makeBigDots()
              })
              }) 
            break;
            // Si la valeur de nature est égale à IGN Admin Express Cog 2022
            case "Commune déléguée":
              // Appliquer le style ci-dessous
              stl = new ol.style.Style({
                stroke: new ol.style.Stroke({
                color: 'rgb(50, 50, 50)'
              }),
                fill: new ol.style.Fill({
                  color: makeMiddleDots()
                })
              })
       
              break;
            
          // Si la valeur de nature est égale à IGN Admin Express Cog 2022
          case "Autre commune fusionnée":
            // Appliquer le style ci-dessous
            stl = new ol.style.Style({
              stroke: new ol.style.Stroke({
              color: 'rgb(50, 50, 50)'
            }),
              fill: new ol.style.Fill({
                color: makeSmallDots()
              })
            })
     
            break;
          }
      } return stl
    }
  });
  mviewer.customLayers.communes_asso_dele_fus.handle = false;
}
