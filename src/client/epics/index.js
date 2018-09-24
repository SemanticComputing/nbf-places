import 'rxjs';
import { ajax } from 'rxjs/observable/dom/ajax';
import { combineEpics } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import {
  updateNbfPlaces,
  updateNbfPlace,
  updateGeoJSON,
  FETCH_PLACES,
  FETCH_PLACE,
  FETCH_PLACES_FAILED,
  GET_GEOJSON,
  GET_GEOJSON_FAILED
} from '../actions';

const nbfPlacesApiUrl = (process.env.NODE_ENV === 'development')
  ? 'http://localhost:3001/'
  : 'http://biografiasampo.fi/paikat/';


const getNbfPlacesEpic = (action$) => {
  const searchUrl = nbfPlacesApiUrl + 'nbf-places';
  return action$.ofType(FETCH_PLACES)
    .switchMap(() => {
      return ajax.getJSON(searchUrl)
        .map(response => updateNbfPlaces({ places: response }))
        .catch(error => Observable.of({
          type: FETCH_PLACES_FAILED,
          error: error,
        }));
    });
};

const getNbfPlaceEpic = (action$) => {
  const searchUrl = nbfPlacesApiUrl + 'nbf-places';
  return action$.ofType(FETCH_PLACE)
    .switchMap(action => {
      const placeId = action.placeId;
      const requestUrl = `${searchUrl}/${placeId}`;
      return ajax.getJSON(requestUrl)
        .map(response => updateNbfPlace({ place: response }))
        .catch(error => Observable.of({
          type: FETCH_PLACES_FAILED,
          error: error,
        }));
    });
};

const getGeoJSONEpic = (action$) => {
  const wfsUrl = nbfPlacesApiUrl + 'wfs';
  return action$.ofType(GET_GEOJSON)
    .switchMap(action => {
      let s = '';
      action.layerIDs.map(layerID => {
        s += `&layerID=${layerID}`;
      });
      const requestUrl = `${wfsUrl}?${s}`;
      return ajax.getJSON(requestUrl)
        // .map(response => {
        //   console.log(response)
        // })
        .map(response => updateGeoJSON({ geoJSON: response }))
        .catch(error => Observable.of({
          type: GET_GEOJSON_FAILED,
          error: error,
        }));
    });
};


const rootEpic = combineEpics(
  getNbfPlacesEpic,
  getNbfPlaceEpic,
  getGeoJSONEpic
);

export default rootEpic;
