mviewer.customLayers.swipeRight = (function () {
    // Couche affichée à l'affichage de la carte
    var anneeCouche = "HR.ORTHOIMAGERY.ORTHOPHOTOS";
    
    var _rasterSource = new ol.source.TileWMS({
      url: 'https://observatoire.parc-naturel-normandie-maine.fr/geoserver/carteetdonnees/wms',
      params: {LAYERS: 'carteetdonnees:'+anneeCouche}
    });
    
    function changeDate(annee) {
      if (annee === '1950-1965') {
        var anneeCouche = "ORTHOIMAGERY.ORTHOPHOTOS.1950-1965";
      } else if (annee === '2000-2005') {
        var anneeCouche = "ORTHOIMAGERY.ORTHOPHOTOS2000-2005";
      } else if (annee === '2010') {
        var anneeCouche = "ORTHOIMAGERY.ORTHOPHOTOS2010";
      } else if (annee === '2011-2015'){
        var anneeCouche = "ORTHOIMAGERY.ORTHOPHOTOS2011-2015";
      } else if (annee === '2020'){
        var anneeCouche = "HR.ORTHOIMAGERY.ORTHOPHOTOS";
      } else if (annee === 'sat_2014') {
        var anneeCouche = "ORTHOIMAGERY.ORTHO-SAT.SPOT.2014";
      } else if (annee === 'sat_2015') {
        var anneeCouche = "ORTHOIMAGERY.ORTHO-SAT.SPOT.2015";
      } else if (annee === 'sat_2016') {
        var anneeCouche = "ORTHOIMAGERY.ORTHO-SAT.SPOT.2016";
      } else if (annee === 'sat_2017'){
        var anneeCouche = "ORTHOIMAGERY.ORTHO-SAT.SPOT.2017";
      } else if (annee === 'sat_2018'){
        var anneeCouche = "ORTHOIMAGERY.ORTHO-SAT.SPOT.2018";
      } else if (annee === 'sat_2019') {
        var anneeCouche = "ORTHOIMAGERY.ORTHO-SAT.SPOT.2019";
      } else if (annee === 'sat_2020') {
        var anneeCouche = "ORTHOIMAGERY.ORTHO-SAT.SPOT.2020";
      } else if (annee === 'sat_2021') {
        var anneeCouche = "ORTHOIMAGERY.ORTHO-SAT.SPOT.2021";
      } else if (annee === 'carte_cassini'){
        var anneeCouche = "Carte_Cassini";
      } else if (annee === 'carte_capitaine') {
        var anneeCouche = "Carte_Capitaine";
      } else if (annee === 'carte_etatmajor') {
        var anneeCouche = "GEOGRAPHICALGRIDSYSTEMS.ETATMAJOR40";
      } else if (annee === 'carte_1950') {
        var anneeCouche = "GEOGRAPHICALGRIDSYSTEMS.MAPS.SCAN50.1950";
      } else if (annee === 'carte_actuelle') {
        var anneeCouche = "GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2";
      }
      _rasterSource.updateParams({LAYERS: 'carteetdonnees:'+anneeCouche});
    };
    
    var _layer = new ol.layer.Tile({
      title: 'Ortho',
      source: _rasterSource
    });
    
    _layer.on('prerender', function(event) {
        var ctx = event.context;
        var width = ctx.canvas.width * (swipe.value / 100);
        ctx.save();
        ctx.beginPath();
        ctx.rect(width - 1, 0, ctx.canvas.width - width, ctx.canvas.height);
        ctx.clip();
    });
    
    _layer.on('postrender', function(event) {
        var ctx = event.context;
        ctx.restore();
    });
    
      return {
        layer: _layer,
        handle: false,
        changeDate: changeDate,
      };
    }());
    