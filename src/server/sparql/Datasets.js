module.exports = {
  'nbf': {
    'title': 'nbf',
    'shortTitle': 'nbf',
    'timePeriod': '',
    'endpoint': 'http://ldf.fi/nbf/sparql',
    'placesQuery': `
        PREFIX wgs84: <http://www.w3.org/2003/01/geo/wgs84_pos#>
        PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
        PREFIX nbf:	<http://ldf.fi/nbf/>
        SELECT ?id ?label ?lat ?long ?source
        WHERE {
          ?id a nbf:Place ;
              skos:prefLabel ?label .
          FILTER (lang(?label)="fi")
          FILTER EXISTS { [] nbf:place ?id }
          OPTIONAL {
            ?id wgs84:lat ?lat ;
                wgs84:long ?long .
          }
        }
        `,
    'placeQuery': `
        PREFIX wgs84: <http://www.w3.org/2003/01/geo/wgs84_pos#>
        PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
        PREFIX foaf: <http://xmlns.com/foaf/0.1/>
        PREFIX crm: <http://www.cidoc-crm.org/cidoc-crm/>
        PREFIX bioc:  <http://ldf.fi/schema/bioc/>
        PREFIX nbf:	<http://ldf.fi/nbf/>
        SELECT DISTINCT ?class
        (COUNT(DISTINCT ?person) AS ?personCount)
        WHERE {
          VALUES ?id { <ID> }
        	?event nbf:place ?id ;
        	  (crm:P100_was_death_of|crm:P98_brought_into_life|bioc:inheres_in)/^foaf:focus ?person ;
        	  a/skos:prefLabel ?class .
        	FILTER (lang(?class)="en")
        }
        GROUP BY ?class
        `,
  },
};
