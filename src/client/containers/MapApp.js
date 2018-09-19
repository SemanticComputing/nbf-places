import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import LeafletMap from '../components/map/LeafletMap';
// 
// import {
//   //getVisibleResults,
//   //getVisibleValues
// } from '../selectors';

import {
  updateQuery,
  toggleDataset,
  fetchSuggestions,
  clearSuggestions,
  fetchManuscripts,
  fetchPlaces,
  clearManuscripts,
  clearPlaces,
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
  const { options, map, nbfPlaces, } = props;
  //error, resultValues
  return (
    <LeafletMap
      results={nbfPlaces}
      fetchPlaces={props.fetchPlaces}
      mapMode={options.mapMode}
      geoJSON={map.geoJSON}
      geoJSONKey={map.geoJSONKey}
      getGeoJSON={props.getGeoJSON}
      bouncingMarker={map.bouncingMarker}
      popupMarker={map.popupMarker}
      bouncingMarkerKey={map.bouncingMarkerKey}
      openPopupMarkerKey={map.openPopupMarkerKey}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    options: state.options,
    browser: state.browser,
    search: state.search,
    map: state.map,
    nbfPlaces: state.search.places,
    //resultValues: getVisibleValues(state.search),
    resultValues: {},
  };
};

const mapDispatchToProps = ({
  updateQuery,
  toggleDataset,
  fetchSuggestions,
  clearSuggestions,
  fetchManuscripts,
  fetchPlaces,
  clearManuscripts,
  clearPlaces,
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
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  //error: PropTypes.object.isRequired,
  browser: PropTypes.object.isRequired,

  options: PropTypes.object.isRequired,
  search: PropTypes.object.isRequired,
  map: PropTypes.object.isRequired,
  nbfPlaces: PropTypes.array,
  resultValues: PropTypes.object,

  updateQuery: PropTypes.func.isRequired,
  toggleDataset: PropTypes.func.isRequired,
  fetchSuggestions: PropTypes.func.isRequired,
  clearSuggestions: PropTypes.func.isRequired,
  fetchManuscripts: PropTypes.func.isRequired,
  fetchPlaces: PropTypes.func.isRequired,
  clearManuscripts: PropTypes.func.isRequired,
  clearPlaces: PropTypes.func.isRequired,
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
