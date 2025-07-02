/**
 * @module panoramax
 * @description
 * This module provides a custom component for mviewer that allows users to interact with Panoramax
 * pictures. It shows as a topLayer Panoramax pictures availability, and at map click, opens the
 * interactive picture viewer.
 */

var panoramax = (function () {
  var _map;
  var _url;
  var _projection;
  var _panoramaxBtn;
  var _config;
  var _pnxLayer;
  var _pnxLayerId = "panoramax";
  var _pnxLayerEnabled;
  var _pnxClickEventId;
  var _pnxDblClickEventId;
  var _pnxViewer;

  /**
   * Initialize the component
   */
  var _initpanoramax = () => {
    _config = mviewer.customComponents.panoramax.config.options.panoramax;
    _url = _config.url;
    _map = mviewer.getMap();
    _projection = _map.getView().getProjection();
    _initToolbarBtn();
    _initPhotoViewer();
  };

  /**
   * Create the toolbar button
   */
  var _initToolbarBtn = () => {
    var button = [
      '<button id="panoramaxBtn" title href="#" type="button" class="btn btn-default btn-raised" data-original-title="Panoramax" data-toggle="tooltip">'+
      '<span class="fas fa-street-view"></span>'+
      '</button>'
    ].join("");
    $("#toolstoolbar").append(button);

    _panoramaxBtn = document.getElementById("panoramaxBtn");
    _panoramaxBtn?.addEventListener("click", _toggleCoverageLayer);
  };

  var _initPhotoViewer = () => {
    _pnxViewer = document.getElementById("panoramaxPhotoViewer");
    if(!_pnxViewer) { console.error("Panoramax photo viewer is not available"); return; }
    _pnxViewer.setAttribute("endpoint", _url+"/api");
  };

  /**
   * Toggle vector tiles on map.
   */
  var _toggleCoverageLayer = function () {
    // Layer exists : toggle its display
    if (_pnxLayer) {
      if (!_pnxLayerEnabled) {
        _map.addLayer(_pnxLayer);
        _pnxClickEventId = _map.on("click", _onCoverageClick);
        _pnxLayerEnabled = true;
      } else {
        _map.removeLayer(_pnxLayer);
        if(_pnxClickEventId?.listener) {
          _map.un("singleclick", _pnxClickEventId.listener);
          _map.un("dblclick", _pnxDblClickEventId.listener);
        }
        _pnxLayerEnabled = false;
        _showPictureInViewer();
      }
    }
    // Create layer
    else {
      _pnxLayer = new ol.layer.VectorTile({ declutter: true });

      // Get style JSON
      fetch(_url + "/api/map/style.json").then((response) => {
        response.json().then((glStyle) => {
          // glStyle.sources.geovisio.attribution = '© <a href="https://panoramax.fr">Panoramax</a>',
          olms.applyStyle(_pnxLayer, glStyle);
        });
      });
      
      // Add to map + listen to click
      new CustomLayer(_pnxLayerId, _pnxLayer);
      _map.addLayer(_pnxLayer);
      _pnxClickEventId = _map.on("singleclick", _onCoverageClick);
      _pnxDblClickEventId = _map.on("dblclick", () => _showPictureInViewer());
      _pnxLayerEnabled = true;
    }
  };

  var _showPictureInViewer = (picId, seqId) => {
    if(picId) {
      if(seqId) {
        _pnxViewer.setAttribute("sequence", seqId);
      }
      else {
        _pnxViewer.removeAttribute("sequence");
      }
      _pnxViewer.setAttribute("picture", picId);
      _pnxViewer.style.display = "unset";
    }
    else {
      _pnxViewer.style.display = "none";
    }
  };

  /**
   * Handles map click over coverage layer.
   */
  var _onCoverageClick = function(evt) {
    let coordinates = _coordsTo4326(evt.coordinate);
    let bbox = _coordsToBbox(coordinates);

    // Search for features under click position
    _pnxLayer.getFeatures(evt.pixel).then((features) => {
      const searchOpts = {
        "limit": 1,
        "bbox": bbox.join(",")
      };

      const f = features?.shift();
      if(f) {
        const props = f.getProperties();
        if(props.layer === "pictures" && props.id) {
          searchOpts.ids = props.id;
        }
        else if(props.layer === "sequences" && props.id) {
          searchOpts.collections = props.id;
        }
      }

      // If picture ID is found from map, use it directly
      if(searchOpts.ids) {
        console.log("Picture ID (from map)", searchOpts.ids);
        _showPictureInViewer(searchOpts.ids);
      }
      // Otherwise, launch API call to find best matching picture
      else {
        fetch(_url + "/api/search?"+(new URLSearchParams(searchOpts)).toString()).then((response) => {
          response.json().then((pnxjson) => {
            const f = pnxjson?.features?.shift();
            if(f) {
              console.log("Picture ID (from API)", f.id);
              _showPictureInViewer(f.id, f.collection);
            }
            else {
              console.log("No matching picture found");
              _showPictureInViewer();
            }
          });
        });
      }
    });
  };

  /**
   * Transforms map coordinates into EPSG:4326
   * @param {object} c Original map coordinates
   * @returns {number[]} [lon,lat] coordinates in WGS84
   */
  var _coordsTo4326 = function (c) {
    return ol.proj.transform(
      c,
      _projection.getCode(),
      "EPSG:4326"
    );
  }

  /**
   * Generate a bounding box based on coordinates.
   * The bbox allows to search more or less precisely based on map zoom.
   * @param {number[]} coordinate The map coordinates (in EPSG:4326)
   */
  var _coordsToBbox = function (coordinate) {
    const view = _map.getView();
    const size = (20*0.01) / Math.max(view.getZoom(), 1);
  
    return [
      coordinate[0] - size,
      coordinate[1] - size,
      coordinate[0] + size,
      coordinate[1] + size
    ];
  };

  return {
    init: _initpanoramax,
  };
})();

new CustomComponent("panoramax", panoramax.init);
