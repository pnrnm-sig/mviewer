
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
      //console.log(geom)

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


// {

  

//   // Motif à gros points
//   function makeBigDots() {
//     var cnv = document.createElement('canvas');
//     var ctx = cnv.getContext('2d');
//     cnv.width = 200;
//     cnv.height = 200;
//     ctx.fillStyle = 'rgb(20, 97, 148)'
//     ctx.lineWidth = 200;
    
//       const circle = new Path2D();
//       circle.arc(10, 10, 10, 0, 2 * Math.PI);
  
//       ctx.fill(circle);
    
  
    
//     return ctx.createPattern(cnv, 'repeat');
//   }

//   // Motif à moyen points
//   function makeMiddleDots() {
//     var cnv = document.createElement('canvas');
//     var ctx = cnv.getContext('2d');
//     cnv.width = 20;
//     cnv.height = 20;
//     ctx.fillStyle = 'rgb(20, 97, 148)'
//     ctx.lineWidth = 2;
    
//       const circle = new Path2D();
//       circle.arc(10, 10, 3, 0, 2 * Math.PI);
  
//       ctx.fill(circle);
    
  
    
//     return ctx.createPattern(cnv, 'repeat');
//   }

//   // Motif à petit points
//   function makeSmallDots() {
//     var cnv = document.createElement('canvas');
//     var ctx = cnv.getContext('2d');
//     cnv.width = 10;
//     cnv.height = 10;
//     ctx.fillStyle = 'rgb(20, 97, 148)'
//     ctx.lineWidth = 2;
    
//       const circle = new Path2D();
//       circle.arc(5, 5, 1, 0, 2 * Math.PI);
  
//       ctx.fill(circle);
    
  
    
//     return ctx.createPattern(cnv, 'repeat');
//   }

//   mviewer.customLayers.vm_suiviplantations_epci = {};
//   var vm_suiviplantations_epci = mviewer.customLayers.vm_suiviplantations_epci;

//   mviewer.customLayers.vm_suiviplantations_epci.layer = new ol.layer.Vector({
//     source: new ol.source.Vector({
//       url: "https://observatoire.parc-naturel-normandie-maine.fr/geoserver/carteetdonnees/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=carteetdonnees%3Avm_suiviplantations_epci&outputFormat=application/json&srsName=EPSG:3857",
//       format: new ol.format.GeoJSON()
//     }),
//     // Création d'une fonction pour l'attribution du style en fonction des attributs
//     style: function (feature) {
//       var stl;
//       var aa = feature.getGeometry().getExtent();
//       var oo = ol.extent.getCenter(aa);
//       console.log("The center is :  "+oo); // voila!!!!
  
//       // Si l'entité a une valeur pour nature (n'est pas NULL)
//         // Prendre la valeur de nature
//           // Si la valeur de nature est égale à Commune simple
//           if (feature.get("haies_ml")<=3000){

//             stl = [
//               // style for the polygon
//               new ol.style.Style({
//                 stroke: new ol.style.Stroke({
//                   color: 'blue',
//                   width: 3
//                 }),
//                 fill: new ol.style.Fill({
//                   color: 'rgba(0, 0, 255, 0.1)'
//                 })
//               }),
//               // style for the vertices
//               new ol.style.Style({
//                 image: new ol.style.Circle({
//                   radius: 2,
//                   fill: new ol.style.Fill({
//                     color: 'orange'
//                   })
//                 }),
//                 geometry: function(featurevertice) {
//                   // return the coordinates of the first ring of the polygon
//                   var coordinates = featurevertice.getGeometry().getCoordinates()[0];
//                   return new ol.geom.MultiPoint(coordinates);
//                 }
//               })
//             ];
//           }
//             // Si la valeur de nature est égale à IGN Admin Express Cog 2022
//             else if  (feature.get("haies_ml")>3000 && feature.get("haies_ml")<=6000){
//               // Appliquer le style ci-dessous
//               stl = new ol.style.Style({
//                 stroke: new ol.style.Stroke({
//                 color: 'rgb(50, 50, 50)'
//               }),
//                 fill: new ol.style.Fill({
//                   color: makeMiddleDots()
//                 })
//               })
//             }
            
//           // Si la valeur de nature est égale à IGN Admin Express Cog 2022
//           else if  (feature.get("haies_ml")>6000 && feature.get("haies_ml")<=9000){
//             // Appliquer le style ci-dessous
//             stl = new ol.style.Style({
//               stroke: new ol.style.Stroke({
//               color: 'rgb(50, 50, 50)'
//             }),
//               fill: new ol.style.Fill({
//                 color: makeSmallDots()
//               })
//             })
          
          
//       } return stl
//     }
//   });

//   mviewer.customLayers.vm_suiviplantations_epci.handle = false;
// }


// {
//   mviewer.customLayers.vm_suiviplantations_epci = {};
//   var vm_suiviplantations_epci = mviewer.customLayers.vm_suiviplantations_epci;

//   mviewer.customLayers.vm_suiviplantations_epci.layer = new ol.layer.Vector({
//     source: new ol.source.Vector({
//       url: "https://observatoire.parc-naturel-normandie-maine.fr/geoserver/carteetdonnees/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=carteetdonnees%3Avm_suiviplantations_epci&outputFormat=application/json&srsName=EPSG:3857",
//       format: new ol.format.GeoJSON()
//     }),
//     style: function (feature) {
//       var fill = new ol.style.Fill({ color: 'rgba(235, 179, 185, 0.21)' });
//       var stroke = new ol.style.Stroke({ color: 'rgba(200,86,86)', width: 2 });
//       var center = e.feature.getGeometry().getExtent().getCenter();

//       if (feature.get('haies_ml') <= 1000) {

//         return new ol.style.Style({
//           image: new ol.style.Circle({
//             radius: 5,
//             fill: fill,
//             stroke: stroke
//           })

//         });
//       }
//       else if (feature.get('haies_ml') > 1000 && feature.get('haies_ml') <= 2000) {

//         return new ol.style.Style({
//           image: new ol.style.Circle({
//             radius: 10,
//             fill: fill,
//             stroke: stroke
//           })

//         });
//       }
//       else if (feature.get('haies_ml') > 2000 && feature.get('haies_ml') <= 3000) {

//         return new ol.style.Style({
//           image: new ol.style.Circle({
//             radius: 15,
//             fill: fill,
//             stroke: stroke
//           })

//         });
//       }
//       else if (feature.get('haies_ml') > 3000 && feature.get('haies_ml') <= 4000) {

//         return new ol.style.Style({
//           image: new ol.style.Circle({
//             radius: 20,
//             fill: fill,
//             stroke: stroke
//           })

//         });
//       }
//       else if (feature.get('haies_ml') > 4000 ){

//         return new ol.style.Style({
//           image: new ol.style.Circle({
//             radius: 25,
//             fill: fill,
//             stroke: stroke
//           })

//         });
//       };


//     }
//   });

//   mviewer.customLayers.vm_suiviplantations_epci.handle = false;
// }