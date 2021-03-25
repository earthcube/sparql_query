**Sparql test utilities for Earthcube**
=============

# Install


* npm install
  
test
====
* npm test
or
  
* mocha src/test/

Config
====
tests being run are configured in:
src/testconfigs

```
exports.fullTextTests = {
// somepoint change this to read from some env config
    server: 'https://graph.geodex.org/blazegraph/namespace/nabu/sparql',
    templates: new Map([
    [ "geodex",'/../geodex/sparql_fulltext.txt'],
    [ "geocode", '/../ecosearch/sparql_query.txt']
    ]),
    baseresults: './results',
    
    tests: [
        {
            name: 'norway',
            params: {
                q:'norway',
                n: 10000,
                o: 0,
                exact: false
            },
            expectedCount: 172
        },
    ]
}
```

TODOS
====
* Duplicates
* queries Match
* Top N Match:
Approval Test like.
Save id's of top n results to file, ask, do they match

