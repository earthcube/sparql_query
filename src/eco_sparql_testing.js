var _ = require('lodash');
var axios = require('axios')
var fs = require('fs');
let ES_TEMPLATE_OPTIONS ={interpolate: /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g}


const results = async function(queryTemplate, params,   serverUrl) {
    //var self = this;
var templateString= fs.readFileSync(__dirname + queryTemplate)
    const resultsTemplate = _.template(templateString, ES_TEMPLATE_OPTIONS)
    //var sparql = self.state.queryTemplates[template_name]({'n': n, 'o': o, 'q': q})
    var sparql = resultsTemplate(params)
    //var url = "https://graph.geodex.org/blazegraph/namespace/nabu/sparql";
    var url = serverUrl;
    var params = {
        query: sparql
    }

    const config = {
        url: url,
        method: 'get',
        headers: {
            'Accept': 'application/sparql-results+json',
            'Content-Type': 'application/json'
        },
        params: params
    }
   // console.log(params["query"]);
    return axios.request(config).then(function (response) {
       return response.data.results.bindings;
    }).catch(function(err) {
        console.log(err)
    })
}
exports.results =results

    exports.dupes = function(results,field, file){
    const gb = _.groupBy(results, s =>  s[field].value )
    const dupes = _.pickBy(gb,x => x.length > 1)
    if (file ){
        writeJson(dupes, file)
    }

    return dupes;
}

const writeJson = function(results, filename){
    if (filename) {
        fs.writeFileSync(filename, JSON.stringify(results,null,2), { flag: 'w+' })
    }
}
exports.writeJson = writeJson

exports.compare = async function (params, template0, template1, server,  file) {

        const response0 = await results(template0, params, server)
        var r0 = await response0
        const response1 = await results(template1, params, server)
        var r1 = await response1

        // add some dump diff to dump
        return {
            lengths: [r0.length, r1.length],
            diff: null
        }
        };



