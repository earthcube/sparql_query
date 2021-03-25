var _ = require('lodash');
var axios = require('axios')
var fs = require('fs');
let ES_TEMPLATE_OPTIONS ={interpolate: /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g}

exports.results = async function(queryTemplate, params,   serverUrl) {
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
       return response;
    }).catch(function(err) {
        console.log(err)
    })
}
