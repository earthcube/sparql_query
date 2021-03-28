

exports.fullTextTests = {
    // somepoint change this to read from some env config
    server: 'https://graph.geodex.org/blazegraph/namespace/nabu/sparql',
    templates: new Map([
       [ "geodex",{ indexKey:'s',file:'/../geodex/sparql_fulltext.txt'}],
       [ "geocodes", { indexKey:'subj',file:'/../geocodes/sparql_query.txt'}]
    ]),
    baseresults: './results',
    comparisons: [
        ['geodex', 'geocodes']
    ],

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
       {
           name: 'lidar',
           params: {
               q:'lidar',
               n: 10000,
               o: 0,
               exact: false
           },
           expectedCount: 582
       },
       {
           name: 'Tethyan MagIC Demo 2',
           params: {
               q:'Tethyan',
               n: 10000,
               o: 0,
               exact: false
           },
           expectedCount: 22
       },
       {
           name: 'Haugtjern Norway LIPD Demo',
           params: {
               q:'Haugtjern Norway',
               n: 10000,
               o: 0,
               exact: false
           },
           expectedCount: 172
       },
       {
           name: 'Steens Reversal MagIC Demo 1',
           params: {
               q:'Steens Reversal',
               n: 10000,
               o: 0,
               exact: false
           },
           expectedCount: 338
       },
       {
           name: 'corelyzer archive CSDCO Demo',
           params: {
               q:'corelyzer archive',
               n: 10000,
               o: 0,
               exact: false
           },
           expectedCount: 1097
       },
       {
           name: 'Haugtjern Norway LIPD Demo',
           params: {
               q:'Haugtjern Norway',
               n: 10000,
               o: 0,
               exact: true
           },
           expectedCount: 164
       },
       {
           name: 'Steens Reversal MagIC Demo 1',
           params: {
               q:'Steens Reversal',
               n: 10000,
               o: 0,
               exact: true
           },
           expectedCount: 17
       },
       {
           name: 'corelyzer archive CSDCO Demo',
           params: {
               q:'corelyzer archive',
               n: 10000,
               o: 0,
               exact: true
           },
           expectedCount: 142
       },
       {
           name: '2019 northridge earthquake exact',
           params: {
               q:'2019 northridge earthquake',
               n: 10000,
               o: 0,
               exact: true
           },
           expectedCount: 142
       },
       {
           name: '2019 northridge earthquake not all match',
           params: {
               q:'2019 northridge earthquake',
               n: 10000,
               o: 0,
               exact: false
           },
           expectedCount: 3842
       }
   ]
}


