import _ from 'lodash';
import SparqlApi from './SparqlApi';
import datasetConfig from './Datasets';
import {
  //mergeFederatedResults,
  mapPlaces,
  mapPlace
} from './Mappers';
//import { makeObjectList } from './SparqlObjectMapper';

class SparqlSearchEngine {

  doSearch(sparqlQuery, endpoint, mapper) {
    const sparqlApi = new SparqlApi({ endpoint });
    return sparqlApi.selectQuery(sparqlQuery)
      .then((data) => {
        if (data.results.bindings.length === 0) {
          return [];
        }
        return mapper ? mapper(data.results.bindings) : data.results.bindings;
      });
  }

  getNbfPlaces() {
    const { endpoint, placesQuery } = datasetConfig['nbf'];
    return this.doSearch(placesQuery, endpoint, mapPlaces);
  }

  getNbfPlace(placeId) {
    let { endpoint, placeQuery } = datasetConfig['nbf'];
    placeQuery = placeQuery.replace('<ID>', '<http://ldf.fi/nbf/places/' + placeId + '>');
    return this.doSearch(placeQuery, endpoint, mapPlace);
  }

  uriFy(id) {
    if (_.isArray(id)) {
      return '<' + id.join('> <') + '>';
    } else if (id) {
      return '<' + id + '>';
    }
    return;
  }
}

export default new SparqlSearchEngine();
