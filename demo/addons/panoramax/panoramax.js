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
  var _pnxViewerContainer;
  var _pnxViewerCloseBtn;
  var _pnxPicMarker;
  var _pnxPicMarkerLayer;
  var _delayMapRender;
  var _glStyle;
  var _pnxMapFilters;
  var _pnxMapFiltersMenu;

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
      '<button id="panoramaxBtn" title href="#" type="button" class="btn btn-default btn-raised" data-original-title="Panoramax" data-toggle="tooltip">' +
        '<span class="fas fa-street-view"></span>' +
        "</button>",
    ].join("");
    $("#toolstoolbar").append(button);

    _panoramaxBtn = document.getElementById("panoramaxBtn");
    _panoramaxBtn?.addEventListener("click", _toggleCoverageLayer);
  };

  /**
   * Create the photo viewer widget
   */
  var _initPhotoViewer = () => {
    _pnxViewerContainer = document.getElementById("panoramaxPhotoViewerContainer");
    _pnxViewer = document.getElementById("panoramaxPhotoViewer");
    if (!_pnxViewer) {
      console.error("Panoramax photo viewer is not available");
      return;
    }
    _pnxViewer.setAttribute("endpoint", _url + "/api");
    _pnxViewerCloseBtn = document.getElementById("panoramaxClose");
    _pnxViewerCloseBtn.addEventListener("click", () => _showPictureInViewer());

    // Picture events
    _pnxViewer.addEventListener("psv:picture-loading", (e) =>
      _changePicMarker(true, [e.detail.lon, e.detail.lat], e.detail.x)
    );
    _pnxViewer.addEventListener("psv:picture-loaded", (e) =>
      _changePicMarker(true, [e.detail.lon, e.detail.lat], e.detail.x)
    );
    _pnxViewer.addEventListener("psv:view-rotated", (e) =>
      _changePicMarker(null, null, e.detail.x)
    );
  };

  /**
   * Toggle vector tiles on map.
   */
  var _toggleCoverageLayer = function () {
    // Layer exists : toggle its display
    if (_pnxLayer) {
      if (!_pnxLayerEnabled) {
        info.disable();
        _map.addLayer(_pnxLayer);
        _pnxClickEventId = _map.on("click", _onCoverageClick);
        _pnxMapFiltersMenu.style.display = "block";
        _pnxLayerEnabled = true;
      } else {
        _map.removeLayer(_pnxLayer);
        if (_pnxClickEventId?.listener) {
          _map.un("singleclick", _pnxClickEventId.listener);
          _map.un("dblclick", _pnxDblClickEventId.listener);
        }
        info.enable();
        _pnxLayerEnabled = false;
        _pnxMapFiltersMenu.style.display = "none";
        _showPictureInViewer();
      }
    }
    // Create layer
    else {
      _pnxLayer = new ol.layer.VectorTile({ declutter: true });

      // Get style JSON
      fetch(_url + "/api/map/style.json").then((response) => {
        response.json().then((glStyle) => {
          _glStyle = glStyle;
          olms.applyStyle(_pnxLayer, glStyle);
        });
      });

      // Create marker for showing selected picture
      _pnxPicMarker = new ol.Feature({
        geometry: new ol.geom.Point([0, 0]),
      });
      _pnxPicMarkerLayer = new ol.layer.Vector({
        source: new ol.source.Vector({ features: [_pnxPicMarker] }),
        style: new ol.style.Style({
          image: new ol.style.Icon({
            // Original image @ https://gitlab.com/panoramax/clients/web-viewer/-/blob/develop/src/img/marker_blue.svg
            src: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcKICAgd2lkdGg9IjQ4IgogICBoZWlnaHQ9IjQ4IgogICB2aWV3Qm94PSIwIDAgMTIuNyAxMi43IgogICB2ZXJzaW9uPSIxLjEiCiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgeG1sbnM6c3ZnPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPGRlZnMKICAgICBpZD0iZGVmczEiIC8+CiAgPHBhdGgKICAgICBkPSJNLTMuMDA3LS4wMDVhNS45NzggNS45NzggMCAwIDEtNS45NzkgNS45NzhWLS4wMDV6IgogICAgIHN0eWxlPSJmaWxsOiMxYTIzN2U7ZmlsbC1vcGFjaXR5OjE7c3Ryb2tlOiNmZmY7c3Ryb2tlLXdpZHRoOjAuNjYxNDU4O3N0cm9rZS1taXRlcmxpbWl0OjQ7c3Ryb2tlLWRhc2hhcnJheTpub25lO3N0cm9rZS1vcGFjaXR5OjEiCiAgICAgdHJhbnNmb3JtPSJyb3RhdGUoLTEzNSkiLz4KICA8Y2lyY2xlCiAgICAgY3g9IjYuMzUiCiAgICAgY3k9IjYuNTQ1IgogICAgIHI9IjIuNjQiCiAgICAgc3R5bGU9ImZpbGw6IzFlODhlNTtmaWxsLW9wYWNpdHk6MTtzdHJva2U6I2ZmZjtzdHJva2Utd2lkdGg6MC42NjAwMjc7c3Ryb2tlLW1pdGVybGltaXQ6NDtzdHJva2UtZGFzaGFycmF5Om5vbmU7c3Ryb2tlLW9wYWNpdHk6MSIgLz4KPC9zdmc+Cg==",
          }),
        }),
        visible: false,
        zIndex: 100,
      });

      // Settings form
      _pnxLayer.customcontrol = true;
      mviewer.customControls[_pnxLayerId] = {
        init: function () {
          _pnxMapFiltersMenu = document.createElement("pnx-map-filters-menu");
          _pnxMapFiltersMenu.id = "pnx-map-filters-menu";
          _pnxMapFiltersMenu.setAttribute("quality-score", "");

          // Bindings to look like native Panoramax map
          _pnxMapFiltersMenu._parent = _pnxViewer;
          _pnxMapFiltersMenu._parent._onMapFiltersChange = _onMapFiltersChange;
          _pnxMapFiltersMenu._parent._showQualityScoreDoc = () =>
            window.open("https://docs.panoramax.fr/pictures-metadata/quality_score/");
          const _onMapZoom = () =>
            (_pnxMapFiltersMenu.showZoomIn = _map.getView().getZoom() < 7);
          _onMapZoom();
          _map.on("moveend", _onMapZoom);

          document.getElementById("layers-container").appendChild(_pnxMapFiltersMenu);
        },

        destroy: function () {
          _pnxMapFiltersMenu.parentNode.removeChild(_pnxMapFiltersMenu);
        },
      };
      mviewer.customControls[_pnxLayerId].init();

      // Add to map + listen to click
      new CustomLayer(_pnxLayerId, _pnxLayer);
      _map.addLayer(_pnxLayer);
      info.disable();
      _pnxClickEventId = _map.on("singleclick", _onCoverageClick);
      _pnxDblClickEventId = _map.on("dblclick", () => _showPictureInViewer());
      _pnxLayerEnabled = true;
      _map.addLayer(_pnxPicMarkerLayer);
      mviewer.alert(
        "L'interrogation des couches est désactivé lorsque Panoramax est actif",
        "alert-warning"
      );
    }
  };

  /**
   * Change currently shown picture in photo viewer
   * @param {string} [picId] The picture UUID (null to hide)
   * @param {string} [seqId] The sequence UUID for this picture (optional, for faster retrieval)
   */
  var _showPictureInViewer = (picId, seqId) => {
    if (picId) {
      if (seqId) {
        _pnxViewer.setAttribute("sequence", seqId);
      } else {
        _pnxViewer.removeAttribute("sequence");
      }
      _pnxViewer.setAttribute("picture", picId);
      _pnxViewerContainer.style.display = "unset";
    } else {
      _pnxViewerContainer.style.display = "none";
      _changePicMarker(false);
    }
  };

  /**
   * Handles map click over coverage layer.
   */
  var _onCoverageClick = function (evt) {
    let coordinates = _coordsTo4326(evt.coordinate);
    let bbox = _coordsToBbox(coordinates);

    // Search for features under click position
    _pnxLayer.getFeatures(evt.pixel).then((features) => {
      const searchOpts = {
        limit: 1,
        bbox: bbox.join(","),
      };

      const f = features?.shift();
      if (f) {
        const props = f.getProperties();
        if (props.layer === "pictures" && props.id) {
          searchOpts.ids = props.id;
        } else if (props.layer === "sequences" && props.id) {
          searchOpts.collections = props.id;
        }
      }

      // If picture ID is found from map, use it directly
      if (searchOpts.ids) {
        _showPictureInViewer(searchOpts.ids);
      }
      // Otherwise, launch API call to find best matching picture
      else {
        // Make sure to use appropriate filters as well
        if (_pnxMapFilters?.pic_type) {
          searchOpts.filter =
            "field_of_view" + (_pnxMapFilters.pic_type === "flat" ? "<" : "=") + "360";
        }

        fetch(_url + "/api/search?" + new URLSearchParams(searchOpts).toString()).then(
          (response) => {
            response.json().then((pnxjson) => {
              const f = pnxjson?.features?.shift();
              if (f) {
                _showPictureInViewer(f.id, f.collection);
              } else {
                _showPictureInViewer();
              }
            });
          }
        );
      }
    });
  };

  /**
   * Reflects new settings on coverage layer
   */
  var _onMapFiltersChange = function () {
    // Get Maplibre style using Panoramax functions
    const mapFiltersMenu = document.getElementById("pnx-map-filters-menu");
    let { mapFilters, mapSeqFilters, mapPicFilters, reloadMapStyle } =
      Panoramax.utils.map.mapFiltersToLayersFilters(
        Panoramax.utils.map.mapFiltersFormValues(
          mapFiltersMenu,
          null,
          mapFiltersMenu.getAttribute("quality-score") === ""
        ),
        true
      );
    _pnxMapFilters = mapFilters;

    // Apply filter to current style
    const seqStyle = _glStyle.layers.find((l) => l["source-layer"] == "sequences");
    const picStyle = _glStyle.layers.find((l) => l["source-layer"] == "pictures");
    const gridStyleID = _glStyle.layers.findIndex((l) => l["source-layer"] == "grid");

    if (seqStyle) {
      seqStyle.filter = mapSeqFilters || undefined;
    }
    if (picStyle) {
      picStyle.filter = mapPicFilters || undefined;
    }
    if (gridStyleID >= 0) {
      let newType = "coef";
      if (mapFilters.pic_type) {
        newType =
          mapFilters.pic_type == "flat" ? "coef_flat_pictures" : "coef_360_pictures";
      }
      _glStyle.layers[gridStyleID] = Panoramax.utils.map.switchCoefValue(
        _glStyle.layers[gridStyleID],
        newType
      );
    }

    olms.applyStyle(_pnxLayer, _glStyle);
  };

  /**
   * Edit the currently selected picture marker.
   * If a parameter is not set, its state is not changed.
   * @param {boolean} [visible] True to make it visible, false to hide
   * @param {number[]} [coords] Map coordinates of picture as [lon, lat]
   * @param {number} [orientation] Picture orientation (in degrees, 0-360)
   */
  var _changePicMarker = function (visible, coords, orientation) {
    // Change coords
    if (coords) {
      _pnxPicMarker.getGeometry().setCoordinates(_coordsFrom4326(coords));
    }

    // Change orientation
    if (orientation !== null && orientation !== undefined) {
      _pnxPicMarkerLayer
        .getStyle()
        .getImage()
        .setRotation((orientation * Math.PI) / 180);

      // Hack to force map render to make rotation visible
      clearTimeout(_delayMapRender);
      _delayMapRender = setTimeout(() => _pnxPicMarkerLayer.changed(), 100);
    }

    // Change visibility
    if (visible || visible === false) {
      _pnxPicMarkerLayer.setVisible(visible);
    }
  };

  /**
   * Transforms map coordinates into EPSG:4326
   * @param {object} c Original map coordinates
   * @returns {number[]} [lon,lat] coordinates in WGS84
   */
  var _coordsTo4326 = function (c) {
    return ol.proj.transform(c, _projection.getCode(), "EPSG:4326");
  };

  /**
   * Transforms EPSG:4326 coordinates into map projection
   * @param {object} c Original WGS84 coordinates
   * @returns {number[]} [lon,lat] coordinates in map projection
   */
  var _coordsFrom4326 = function (c) {
    return ol.proj.transform(c, "EPSG:4326", _projection.getCode());
  };

  /**
   * Generate a bounding box based on coordinates.
   * The bbox allows to search more or less precisely based on map zoom.
   * @param {number[]} coordinate The map coordinates (in EPSG:4326)
   */
  var _coordsToBbox = function (coordinate) {
    const view = _map.getView();
    const size = (20 * 0.01) / Math.max(view.getZoom(), 1);

    return [
      coordinate[0] - size,
      coordinate[1] - size,
      coordinate[0] + size,
      coordinate[1] + size,
    ];
  };

  return {
    init: _initpanoramax,
  };
})();

new CustomComponent("panoramax", panoramax.init);
