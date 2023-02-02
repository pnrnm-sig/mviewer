{
  mviewer.customLayers.geosites = {};
  var geosites = mviewer.customLayers.geosites;

  geosites.legend = {
    items: [
      {
        label: "Précambrien",
        geometry: "Polygon",
        styles: [
          // Style pour l'intérieur du polygone à grande échelle afin d'avoir un polygone large et ainsi rendre les plus petits géosites bien visibles
          new ol.style.Style({
            stroke: new ol.style.Stroke({ color: "#ff6484", width: 3 }),
            fill: new ol.style.Fill({ color: "#ff6484" }),
            zIndex: 1 // Se trouve devant le style noir
          }),
          // Style pour ajouter un contour noir afin de rendre les polygones visibles sur la couche des formations géologiques. 
          new ol.style.Style({
            stroke: new ol.style.Stroke({ color: "#222", width: 5 }),
            fill: new ol.style.Fill({ color: "#222" }),
            zIndex: 0 // Se trouve derrière le style coloré
          })
        ],
      },
      {
        label: "Paléozoïque",
        geometry: "Polygon",
        styles: [
          new ol.style.Style({
            stroke: new ol.style.Stroke({ color: "#26917f", width: 3 }),
            fill: new ol.style.Fill({ color: "#26917f" }),
            zIndex: 1
          }),
          new ol.style.Style({
            stroke: new ol.style.Stroke({ color: "#222", width: 5 }),
            fill: new ol.style.Fill({ color: "#222" }),
            zIndex: 0
          })
        ],
      },
      {
        label: "Sur autorisation",
        geometry: "Polygon",
        styles: [
          new ol.style.Style({
            stroke: new ol.style.Stroke({ color: "#28aade", width: 3 }),
            fill: new ol.style.Fill({ color: "#28aade" }),
            zIndex: 1
          }),
          new ol.style.Style({
            stroke: new ol.style.Stroke({ color: "#222", width: 5 }),
            fill: new ol.style.Fill({ color: "#222" }),
            zIndex: 0
          })
        ],
      },
      {
        label: "Cénozoïque",
        geometry: "Polygon",
        styles: [
          new ol.style.Style({
            stroke: new ol.style.Stroke({ color: "#ffd819", width: 3 }),
            fill: new ol.style.Fill({ color: "#ffd819" }),
            zIndex: 1
          }),
          new ol.style.Style({
            stroke: new ol.style.Stroke({ color: "#222", width: 5 }),
            fill: new ol.style.Fill({ color: "#222" }),
            zIndex: 0
          })
        ],
      },
      {
        label: "Inconnu",
        geometry: "Polygon",
        styles: [
      // Pour les géosites ne correspondant pas à une des 4 périodes
          new ol.style.Style({
            stroke: new ol.style.Stroke({ color: "#aaaaaa", width: 3 }),
            fill: new ol.style.Fill({ color: "#aaaaaa" }),
            zIndex: 1
          }),
          new ol.style.Style({
            stroke: new ol.style.Stroke({ color: "#222", width: 5 }),
            fill: new ol.style.Fill({ color: "#222" }),
            zIndex: 0
          })
        ],
      },
      {
        label: "Précambrien",
        geometry: "Polygon",
        styles: [
        // Style pour l'intérieur du polygone à petite échelle afin d'avoir un polygone large et ainsi rendre les plus petits géosites bien visibles
          new ol.style.Style({
            stroke: new ol.style.Stroke({ color: "#ff6484", width: 10 }),
            fill: new ol.style.Fill({ color: "#ff6484" }),
            zIndex:1
        }),
          new ol.style.Style({
            stroke: new ol.style.Stroke({ color: "#222", width: 12 }),
            fill: new ol.style.Fill({ color: "#222" }),
            zIndex: 0
        })
      ],
    },
    {
      label: "Paléozoïque",
      geometry: "Polygon",
      styles: [
        new ol.style.Style({
          stroke: new ol.style.Stroke({ color: "#26917f", width: 10 }),
          fill: new ol.style.Fill({ color: "#26917f" }),
          zIndex:1
      }),
        new ol.style.Style({
          stroke: new ol.style.Stroke({ color: "#222", width: 12 }),
          fill: new ol.style.Fill({ color: "#222" }),
          zIndex: 0
      })
      ],
    },
    {
      label: "Mésozoïque",
      geometry: "Polygon",
      styles: [
        new ol.style.Style({
          stroke: new ol.style.Stroke({ color: "#28aade", width: 10 }),
          fill: new ol.style.Fill({ color: "#28aade" }),
          zIndex:1
      }),
        new ol.style.Style({
          stroke: new ol.style.Stroke({ color: "#222", width: 12 }),
          fill: new ol.style.Fill({ color: "#222" }),
          zIndex: 0
      })
      ],
    },
    {
      label: "Cénozoïque",
      geometry: "Polygon",
      styles: [
        new ol.style.Style({
          stroke: new ol.style.Stroke({ color: "#ffd819", width: 10 }),
          fill: new ol.style.Fill({ color: "#ffd819" }),
          zIndex:1
      }),
        new ol.style.Style({
          stroke: new ol.style.Stroke({ color: "#222", width: 12 }),
          fill: new ol.style.Fill({ color: "#222" }),
          zIndex: 0
      })
      ],
    },
    {
      // Pour les géosites ne correspondant pas à une des 4 périodes
      label: "Inconnu",
      geometry: "Polygon",
      styles: [
        new ol.style.Style({
          stroke: new ol.style.Stroke({ color: "#aaaaaa", width: 10 }),
          fill: new ol.style.Fill({ color: "#aaaaaa" }),
          zIndex:1
      }),
        new ol.style.Style({
          stroke: new ol.style.Stroke({ color: "#222", width: 12 }),
          fill: new ol.style.Fill({ color: "#222" }),
          zIndex: 0
      })
      ],
    },
    ],
  };
// Ajout d'un WFS avec OpenLayers : géosites du Géoparc
  mviewer.customLayers.geosites.layer = new ol.layer.Vector({
    source: new ol.source.Vector({
      url: "https://observatoire.parc-naturel-normandie-maine.fr/geoserver/carteetdonnees/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=carteetdonnees%3Ageosites&outputFormat=application/json&srsName=EPSG:3857",
      format: new ol.format.GeoJSON()
    }),
    // Création d'une fonction pour l'attribution du style en fonction des attributs
    style: function (feature, resolution) {
      var stl;
      // Si l'entité a une valeur pour ere_roche (n'est pas NULL) et que la resolution de la carte est inférieure à 10 (grande échelle)
      if (feature.get("ere_roche") && resolution < 10) {
        // Prendre la valeur de ere_roche
        switch (feature.get("ere_roche")) {
          // Si la valeur de ere_roche est égale à Précambrien
          case "Précambrien":
            // Prendre la valeur de styles du premier élément de la liste geosites.legend
            stl = geosites.legend.items[0].styles;
            break;
          // Si la valeur de ere_roche est égale à Paléozoïque
          case "Paléozoïque":
            // Prendre la valeur de styles du deuxième élément de la liste geosites.legend
            stl = geosites.legend.items[1].styles;
            break;
            // Si la valeur de ere_roche est égale à Mésozoïque
          case "Mésozoïque":
            // Prendre la valeur de styles du troisième élément de la liste geosites.legend
            stl = geosites.legend.items[2].styles;
            break;
            // Si la valeur de ere_roche est égale à Cénozoïque
          case "Cénozoïque":
            // Prendre la valeur de styles du quatrième élément de la liste geosites.legend
            stl = geosites.legend.items[3].styles;
            break;
        }
      } // Si l'entité a une valeur pour ere_roche (n'est pas NULL) et que la resolution de la carte est supérieure à 10 (petite échelle)
      else if (feature.get("ere_roche") && resolution > 10) {
        // Prendre la valeur de ere_roche
        switch (feature.get("ere_roche")) {
          // Si la valeur de ere_roche est égale à Précambrien
          case "Précambrien":
            // Prendre la valeur de styles du sixième élément de la liste geosites.legend
            stl = geosites.legend.items[5].styles;
            break;
          // Si la valeur de ere_roche est égale à Paléozoïque
          case "Paléozoïque":
            // Prendre la valeur de styles du septième élément de la liste geosites.legend
            stl = geosites.legend.items[6].styles;
            break;
            // Si la valeur de ere_roche est égale à Mésozoïque
          case "Mésozoïque":
            // Prendre la valeur de styles du huitième élément de la liste geosites.legend
            stl = geosites.legend.items[7].styles;
            break;
            // Si la valeur de ere_roche est égale à Cénozoïque
          case "Cénozoïque":
            // Prendre la valeur de styles du neuvième élément de la liste geosites.legend
            stl = geosites.legend.items[8].styles;
            break;
        }
      } // Si la resolution de la carte est supérieure à 10 (petite échelle)
      else if (resolution > 10) {
        // Prendre la valeur de styles du dixième élément de la liste geosites.legend
        stl = geosites.legend.items[9].styles;
      } // Si rien de tout ce qu'il y a eu avant 
      else {
        // Prendre la valeur de styles du cinquième élément de la liste geosites.legend
        stl = geosites.legend.items[4].styles;
      }
      // Renvoyer la valeur et mettre fin à la fonction
      return stl;
    }});
  mviewer.customLayers.geosites.handle = false;
}