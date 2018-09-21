import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import LeafletMap from '../components/map/LeafletMap';
import BootstrapNavbar from '../components/BootstrapNavbar';

import {
  updateQuery,
  toggleDataset,
  fetchSuggestions,
  clearSuggestions,
  fetchNbfPlaces,
  fetchNbfPlace,
  getGeoJSON,
  updateResultFormat,
  updateMapMode,
  updateResultsFilter,
  sortResults,
  bounceMarker,
  openMarkerPopup,
  removeTempMarker
} from '../actions';


let MapApp = (props) => {
  const { options, map } = props;
  //error, resultValues

  //console.log(nbfPlaces);

  return (
    <div id="appFrame">
      <BootstrapNavbar />
      <LeafletMap
        nbfPlaces={props.nbfPlaces}
        nbfPlace={props.nbfPlace}
        fetchNbfPlaces={props.fetchNbfPlaces}
        fetchNbfPlace={props.fetchNbfPlace}
        mapMode={options.mapMode}
        geoJSON={map.geoJSON}
        geoJSONKey={map.geoJSONKey}
        getGeoJSON={props.getGeoJSON}
        bouncingMarker={map.bouncingMarker}
        popupMarker={map.popupMarker}
        bouncingMarkerKey={map.bouncingMarkerKey}
        openPopupMarkerKey={map.openPopupMarkerKey}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    options: state.options,
    browser: state.browser,
    search: state.search,
    map: state.map,
    nbfPlaces: state.search.nbfPlaces,
    nbfPlace: state.search.nbfPlace,
    //resultValues: getVisibleValues(state.search),
    resultValues: {},
  };
};

const mapDispatchToProps = ({
  updateQuery,
  toggleDataset,
  fetchSuggestions,
  clearSuggestions,
  fetchNbfPlaces,
  fetchNbfPlace,
  sortResults,
  getGeoJSON,
  updateResultFormat,
  updateMapMode,
  updateResultsFilter,
  bounceMarker,
  openMarkerPopup,
  removeTempMarker
});

MapApp.propTypes = {
  //error: PropTypes.object.isRequired,
  browser: PropTypes.object.isRequired,

  options: PropTypes.object.isRequired,
  search: PropTypes.object.isRequired,
  map: PropTypes.object.isRequired,
  nbfPlaces: PropTypes.array.isRequired,
  nbfPlace: PropTypes.object.isRequired,
  resultValues: PropTypes.object,

  updateQuery: PropTypes.func.isRequired,
  toggleDataset: PropTypes.func.isRequired,

  fetchNbfPlaces: PropTypes.func.isRequired,
  fetchNbfPlace:  PropTypes.func.isRequired,

  sortResults: PropTypes.func.isRequired,
  getGeoJSON: PropTypes.func.isRequired,
  bounceMarker: PropTypes.func.isRequired,
  openMarkerPopup: PropTypes.func.isRequired,
  removeTempMarker: PropTypes.func.isRequired,
  updateResultFormat: PropTypes.func.isRequired,
  updateMapMode: PropTypes.func.isRequired,
  updateResultsFilter: PropTypes.func.isRequired,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
)(MapApp);
