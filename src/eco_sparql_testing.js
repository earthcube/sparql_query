var _ = require('lodash');
var axios = require('axios')
var fs = require('fs');
let ES_TEMPLATE_OPTIONS = {interpolate: /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g}
const { Parser,transforms: { flatten } } = require('json2csv');

const results = async function (queryTemplate, params, serverUrl) {
    //var self = this;
    var templateString = fs.readFileSync(__dirname + queryTemplate)
    const resultsTemplate = _.template(templateString, ES_TEMPLATE_OPTIONS)

    var sparql = resultsTemplate(params)
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
    }).catch(function (err) {
        console.log(err)
    })
}
exports.results = results

exports.dupes = function (results, field, file) {
    const gb = _.groupBy(results, s => s[field].value)
    const dupes = _.pickBy(gb, x => x.length > 1)
    if (file) {
        writeJson(dupes, file)
    }

    return dupes;
}

const writeJson = function (results, filename) {
    if (filename) {
        fs.writeFileSync(filename, JSON.stringify(results, null, 2), {flag: 'w+'})
    }
}
exports.writeJson = writeJson

const writeCsv = function (results, fields, filename) {
    if (filename) {
        var parser= new Parser({transforms: [ flatten('__')]})
        fs.writeFileSync(filename, parser(results), {flag: 'w+'})
    }
}
exports.writeCsv = writeCsv

exports.compare = async function (params, template0, keyField0, template1, keyField1, server, file) {

    const response0 = await results(template0, params, server)
    var r0 =  unique(response0, keyField0)
    const response1 = await results(template1, params, server)
    var r1 = unique(response1,keyField1)

    // add some dump diff to dump
    var diffBySubj = _.differenceWith(r0, r1 , (a, b) => a[keyField0].value === b[keyField1].value)
    if (file) {
        fs.writeFileSync(file, JSON.stringify(diffBySubj, null, 2), {flag: 'w+'})
    }
    return {
        result_lengths: [response0.length, response1.length],
        unique_lengths:  [r0.length, r1.length],
        diff: diffBySubj
    }
};
const unique= function(results, keyField){
    if (keyField) {
        return _.uniqWith(results, (a,b)=> a[keyField].value ===b[keyField].value )
    }
}
exports.unique =unique



