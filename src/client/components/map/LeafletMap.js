import React from 'react';
import PropTypes from 'prop-types';
import L from 'leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import 'leaflet-geosearch/assets/css/leaflet.css';
import 'leaflet-fullscreen/dist/fullscreen.png';
import 'leaflet-fullscreen/dist/leaflet.fullscreen.css';
import 'leaflet-fullscreen/dist/Leaflet.fullscreen.min.js';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet.markercluster/dist/leaflet.markercluster.js';
import 'Leaflet.Control.Opacity/dist/L.Control.Opacity.css';
import 'Leaflet.Control.Opacity/dist/L.Control.Opacity.js';
import 'leaflet.smooth_marker_bouncing/leaflet.smoothmarkerbouncing.js';
import 'Leaflet.extra-markers/dist/js/leaflet.extra-markers.min.js';
import 'Leaflet.extra-markers/dist/css/leaflet.extra-markers.min.css';
import 'Leaflet.extra-markers/dist/img/markers_default.png';
import 'Leaflet.extra-markers/dist/img/markers_shadow.png';
import 'leaflet.gridlayer.googlemutant/Leaflet.GoogleMutant.js';

const style = {
  width: '100%',
  height: '100%'
};

// https://github.com/pointhi/leaflet-color-markers
const ColorIcon = L.Icon.extend({
  options: {
    shadowUrl: 'img/markers/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  }
});

class LeafletMap extends React.Component {

  componentDidMount() {

    // Base layers
    const OSMBaseLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    });

    const googleBaseLayer = L.gridLayer.googleMutant({
      type: 'roadmap',
    });

    const karelianMaps = L.tileLayer('http:///mapwarper.onki.fi/mosaics/tile/4/{z}/{x}/{y}.png', {
      attribution: 'SeCo'
    });

    const senateAtlas = L.tileLayer('http:///mapwarper.onki.fi/mosaics/tile/5/{z}/{x}/{y}.png', {
      attribution: 'SeCo'
    });

    const westernFront = L.tileLayer('http://mapwarper.net/mosaics/tile/844/{z}/{x}/{y}.png', {
      attribution: 'SeCo'
    });

    // Marker layers
    this.resultMarkerLayer = L.layerGroup();

    this.bouncingMarkerObj = null;
    this.popupMarkerObj = null;

    // create map
    this.leafletMap = L.map('map', {
      center: [22.11, 4.04],
      zoom: 3,
      layers: [
        OSMBaseLayer,
        this.resultMarkerLayer,
      ],
      fullscreenControl: true,
    });

    // layer controls
    const baseMaps = {
      'OpenStreetMap': OSMBaseLayer,
      'Google': googleBaseLayer
    };
    const overlayMaps = {
      'Kansallisbiografian paikat': this.resultMarkerLayer,
      'Karjalan kartat (1928-1951), 47 karttalehteä': karelianMaps,
      'Senaatin kartasto (1870 - 1907), 414 karttalehteä': senateAtlas,
      //'Western Front July 1917 (MapWarper)': westernFront
    };

    this.layerControl = L.control.layers(
      baseMaps,
      overlayMaps,
    ).addTo(this.leafletMap);

    L.control.opacity(
      overlayMaps, {
        collapsed: true,
        position: 'bottomleft'
      }).addTo(this.leafletMap);

    const provider = new OpenStreetMapProvider({
      params: {
        'accept-language': 'fi',
      }
    });

    const searchControl = new GeoSearchControl({
      provider: provider,
      style: 'bar',
      showMarker: false,
      searchLabel: 'Hae paikkaa',
    });

    this.leafletMap.addControl(searchControl);

    L.Marker.setBouncingOptions({ exclusive: true });
    this.props.fetchNbfPlaces();
  }

  componentDidUpdate({ nbfPlaces, nbfPlace, mapMode, geoJSONKey, bouncingMarkerKey, openPopupMarkerKey }) {
    if (this.props.bouncingMarker === '' && this.bouncingMarkerObj !== null) {
      this.leafletMap.removeLayer(this.bouncingMarkerObj);
    }

    if (this.props.bouncingMarkerKey !== bouncingMarkerKey) {
      if (this.props.mapMode === 'cluster') {
        const m = this.markers[this.props.bouncingMarker];
        const latlng = m.getLatLng();
        // create a new marker so that the temporary popup can be left open
        this.bouncingMarkerObj = L.marker(latlng);
        this.bouncingMarkerObj.addTo(this.leafletMap).bounce(1);
      } else {
        this.markers[this.props.bouncingMarker].bounce(1);
      }
    }

    if (this.props.openPopupMarkerKey !== openPopupMarkerKey) {
      if (this.props.mapMode === 'cluster') {
        if (this.popupMarkerObj !== null) {
          this.leafletMap.removeLayer(this.popupMarkerObj);
        }
        this.popupMarkerObj = this.markers[this.props.popupMarker];
        this.popupMarkerObj.addTo(this.leafletMap).openPopup();
      } else {
        this.markers[this.props.popupMarker].openPopup();
      }
    }

    // check if results data or mapMode have changed
    if (this.props.nbfPlaces !== nbfPlaces || this.props.mapMode !== mapMode) {
      if (this.props.mapMode === 'cluster') {
        this.updateMarkersAndCluster(this.props.nbfPlaces);
      } else {
        this.updateMarkers(this.props.nbfPlaces);
      }
    }

    if (this.props.nbfPlace !== nbfPlace) {
      console.log(this.props.nbfPlace)
    }

    // check if geoJSON has updated
    if (this.props.geoJSONKey !== geoJSONKey) {
      this.props.geoJSON.map(obj => {
        const layer = L.geoJSON(obj.geoJSON, {
          onEachFeature: this.onEachFeature
        });
        this.layerControl.addOverlay(layer, obj.layerID);
      });
    }
  }

  updateMarkers(results) {
    this.resultMarkerLayer.clearLayers();
    this.markers = {};
    Object.values(results).forEach(value => {
      const marker = this.createMarker(value);
      this.markers[value.id] = marker;
      marker == null ? null : marker.addTo(this.resultMarkerLayer);
    });
  }

  updateMarkersAndCluster(results) {
    this.resultMarkerLayer.clearLayers();
    this.markers = {};
    const clusterer = new L.MarkerClusterGroup({
      iconCreateFunction: (cluster) => {
        const childCount = cluster.getChildCount();
        // let childCount = 0;
        // cluster.getAllChildMarkers().forEach(marker => {
        //   childCount += parseInt(marker.options.manuscriptCount);
        // });
        let c = ' marker-cluster-';
        if (childCount < 10) {
          c += 'small';
        } else if (childCount < 100) {
          c += 'medium';
        } else {
          c += 'large';
        }
        return new L.DivIcon({ html: '<div><span>' + childCount + '</span></div>', className: 'marker-cluster' + c, iconSize: new L.Point(40, 40) });
      }
    });
    // const clusterer = L.markerClusterGroup();
    results.forEach(value => {
      const marker = this.createMarker(value);
      this.markers[value.id] = marker;
      marker == null ? null : clusterer.addLayer(marker);
    });
    clusterer.addTo(this.resultMarkerLayer);
  }

  createMarker(result) {
    const color = typeof result.markerColor === 'undefined' ? 'blue' : result.markerColor;
    const icon = new ColorIcon({iconUrl: 'img/markers/marker-icon-' + color + '.png'});
    const { lat, long } = result;
    if (lat === 'Undefined' || long === 'Undefined') {
      return null;
    } else {
      const latLng = [+lat, +long];

      // const icon = L.ExtraMarkers.icon({
      //   icon: 'fa-number',
      //   number: result.manuscriptCount,
      //   markerColor: 'red',
      //   shape: 'circle',
      //   prefix: 'fa'
      // });

      const marker = L.marker(latLng, {
        icon: icon,
        result: result
      })
        .on('click', this.markerOnClick);
        // .bindPopup(this.createPopUpContent(result), {
        //   //maxHeight: 300,
        //   //maxWidth: 350,
        //   //minWidth: 300,
        //   closeButton: false,
        // });
      return marker;
    }
  }

  markerOnClick = (event) => {
    //console.log(event.target.options.result.id);
    const nbfPlaceId = (event.target.options.result.id.replace('http://ldf.fi/nbf/places/', ''));
    //console.log(nbfPlaceId);
    this.props.fetchNbfPlace(nbfPlaceId);
  };

  createPopUpContent(result) {
    // https://github.com/ui-router/core/blob/8ed691b/src/params/paramTypes.ts#L56

    //let nbfLink = encodeURIComponent(result.id);


    let encoded = encodeURIComponent('http://ldf.fi/nbf/p6428');
    encoded = encoded.replace(/%/g, '~');
    encoded = 'https://semanticcomputing.github.io/nbf/#!/' + encoded;


    let nbfURI = 'http://ldf.fi/nbf/p6428'.replace(/\//g, '~2F');
    result.nbfLink = 'https://semanticcomputing.github.io/nbf/#!/' + nbfURI;


    if (result.id == 'http://ldf.fi/nbf/places/Marburg') {
      console.log(encoded)
      console.log(result.nbfLink)
    }


    let popUpTemplate = `
      <h3><a target="_blank" rel="noopener noreferrer" href={nbfLink}>{label}</a></p></h3>
      `;
    // if (result.source) {
    //   popUpTemplate += '<p>Place authority: <a target="_blank" rel="noopener noreferrer" href={source}>{source}</a></p>';
    // }
    //popUpTemplate += this.createManscriptListing(result.manuscript);
    return L.Util.template(popUpTemplate, result);
  }

  createManscriptListing(manuscripts) {
    let html = '';
    manuscripts.forEach(msId => {
      html += '<p><a target="_blank" rel="noopener noreferrer" href=' + msId + '>' + msId + '</a></p>';
    });
    return html;
  }

  createOpacitySlider() {
    L.Control.OpacitySlider = L.Control.extend({
      onAdd: function() {
        const slider = L.DomUtil.create('input', 'opacity-slider');
        slider.type = 'range';
        slider.min = 0;
        slider.max = 100;
        slider.value = 100;
        return slider;
      },
    });

    L.control.opacitySlider = function(opts) {
      return new L.Control.OpacitySlider(opts);
    };

    L.control.opacitySlider({ position: 'bottomleft' }).addTo(this.leafletMap);
  }

  render() {
    return <div id="map" style={style} />;
  }
}

LeafletMap.propTypes = {
  nbfPlaces: PropTypes.array.isRequired,
  nbfPlace: PropTypes.object.isRequired,
  mapMode: PropTypes.string.isRequired,
  geoJSON: PropTypes.array,
  geoJSONKey: PropTypes.number.isRequired,
  fetchNbfPlaces: PropTypes.func.isRequired,
  fetchNbfPlace: PropTypes.func.isRequired,
  getGeoJSON: PropTypes.func.isRequired,
  bouncingMarker: PropTypes.string.isRequired,
  popupMarker: PropTypes.string.isRequired,
  bouncingMarkerKey: PropTypes.number.isRequired,
  openPopupMarkerKey: PropTypes.number.isRequired,
};

export default LeafletMap;
