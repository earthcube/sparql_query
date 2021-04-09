

exports.fullTextTests = {
    // somepoint change this to read from some env config
    server: 'https://graph.geodex.org/blazegraph/namespace/nabu/sparql',
    templates: new Map([
       [ "geodex",{ indexKey:'s',file:'/../geodex/sparql_fulltext.txt'}],
       [ "geocodes", { indexKey:'subj',file:'/../geocodes/sparql_query.txt'}],
        [ "geocodes_original", { indexKey:'subj',file:'/../other_queries/facetsearch_2021_04_01.txt'}],
    ]),
    baseresults: './results',
    comparisons: [
       ['geodex', 'geocodes'],
        ['geocodes', 'geocodes_original']
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
           name: 'Steens Reversal MagIC Demo 1 exact',
           params: {
               q:'Steens Reversal',
               n: 10000,
               o: 0,
               exact: true
           },
           expectedCount: 17
       },{
           name: 'Steens Reversal MagIC Demo 1',
           params: {
               q:'Steens',
               n: 10000,
               o: 0,
               exact: false
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
           name: '2019 ridgecrest earthquake exact',
           params: {
               q:'2019 ridgecrest earthquake',
               n: 10000,
               o: 0,
               exact: true
           },
           expectedCount: 142
       },
       {
           name: '2019 ridgecrest earthquake not all match',
           params: {
               q:'2019 ridgecrest earthquake',
               n: 10000,
               o: 0,
               exact: false
           },
           expectedCount: 3842
       },
       {
           name: 'rim fire not all match',
           params: {
               q:'rim fire',
               n: 10000,
               o: 0,
               exact: false
           },
           expectedCount: 3842
       },
       {
           name: 'rim fire all match',
           params: {
               q:'rim fire',
               n: 10000,
               o: 0,
               exact: true
           },
           expectedCount: 3842
       },
       {
           name: 'hydrologic extreme ',
           params: {
               q:'hydrologic extreme',
               n: 10000,
               o: 0,
               exact: false
           },
           expectedCount: 58
       },       {
           name: 'hydrologic extreme exact',
           params: {
               q:'hydrologic extreme',
               n: 10000,
               o: 0,
               exact: true
           },
           expectedCount: 58
       },
       {
           name: 'Drought ',
           params: {
               q:'Drought',
               n: 10000,
               o: 0,
               exact: false
           },
           expectedCount: 58
       },       {
           name: 'Drought exact',
           params: {
               q:'Drought',
               n: 10000,
               o: 0,
               exact: true
           },
           expectedCount: 58
       }
   ]
}


