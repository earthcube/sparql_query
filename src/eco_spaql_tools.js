var testing=require('eco_sparql_testing')
var configs = require('testconfigs/fullTextTests')

exports.querytypes = function(){
    return [ ...configs.fullTextTests.templates.keys()]
}
exports.textQuery = function(type,textString){
    var template = configs.fullTextTests.templates.get(type)
}
