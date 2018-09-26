import _ from 'lodash';

//https://github.com/SemanticComputing/angular-paging-sparql-service/blob/master/src/sparql.object-mapper-service.js

export const groupBy = (sparqlBindings, group) => Object.values(_.reduce(sparqlBindings, (results, sparqlResult) => {
  const id = _.get(sparqlResult[group], 'value');
  if (id === undefined) {
    return [];
  }
  if (!results[id]) {
    results[id] = {};
  }
  let result = results[id];
  _.forOwn(sparqlResult, (value, key) => {
    if (key === group) {
      result[group] = value.value; // ignore lang tags
    } else {
      const oldValues = result[key];
      // add new value if it doesn't already exist
      if (!_.includes(oldValues, value.value)) {
        (result[key] || (result[key] = [])).push(value.value);
      }
    }
  });
  return results;
}, {}));

// export const mergeSuggestions = (suggestions) => {
//   return groupBy(_.compact(_.flatten(suggestions)), 'label', false);
// };
//
//
// export const mergeSimpleSuggestions = (suggestions) => {
//
//   // Suggestions from different datasets may have duplicates
//   let uniqueSuggestions = [...new Set(_.flatten(suggestions))];
//
//   // Sort suggestions alphabetically, because Lunece score does
//   // not work with wildcard queries.
//   return uniqueSuggestions.sort();
// };
//

// const capitalizeFirstLetter = (string) => {
//   return string.charAt(0).toUpperCase() + string.slice(1);
// };

export const mapPlaces = (sparqlBindings) => {
  const places = sparqlBindings.map(b => {
    return {
      id: b.id.value,
      label: b.label.value,
      lat: _.has(b, 'lat',) ? b.lat.value : 'Undefined',
      long: _.has(b, 'long',) ? b.long.value : 'Undefined',
    };
  });
  return places;
};

export const mapPlace = (sparqlBindings) => {
  //console.log(sparqlBindings)
  return arrayToObject(sparqlBindings, 'class');
};

const arrayToObject = (array, keyField) =>
  array.reduce((obj, item) => {
    let newItem = {};
    Object.entries(item).forEach(([key, value]) => {
      if (key !== keyField) {
        newItem[key] = value.value;
      }
    });
    obj[item[keyField].value] = newItem;
    return obj;
  }, {});
