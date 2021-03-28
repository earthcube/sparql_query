var _ = require('lodash')
var fs = require('fs')
var path = require('path')
var expect = require("chai").expect;
var should = require('chai').should();
var config = require("../testconfigs/fullTextTests")
var testing = require("../eco_sparql_testing")

describe("Geodex", function () {
    let key = "geodex"
    before(function() {
        // runs once before the first test in this block
        let templates = config.fullTextTests.templates
        templates.forEach(function(template,key){
            var dir = __dirname + '/../../results/'+key;
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true } );
            }
        })

    });
    describe("dupe test for geodex", function () {

        let template = config.fullTextTests.templates.get(key).file
        let indexKey = config.fullTextTests.templates.get(key).indexKey
        // templates.forEach(function (template,key) {
        let tests = config.fullTextTests.tests
        let server = config.fullTextTests.server
        let name = config.fullTextTests.name

        config.fullTextTests.tests.forEach(
            function (t) {
                it(`${key} duplicate full text for ${t.name} `, async function () {

                    // const response = await results.results(template, t.params, server)
                    // var b = await response.data.results.bindings
                    // // dupe
                    // console.log(`results.bindings.length ${b.length}`)
                    // const gb = _.groupBy(b, s =>  s.s.value )
                    // const dupes = _.pickBy(gb,x => x.length > 1)
                    //
                    // var filename = __dirname + '/../../results/'+key +'/' + t.name +'_dupes.json';
                    // fs.writeFileSync(filename, JSON.stringify(dupes,null,2), { flag: 'w+' })

                    var results = await testing.results(template,t.params,server)

                    var filename = __dirname + '/../../results/'+key +'/' + t.name +'_dupes.json';

                    var dupes = testing.dupes(results, indexKey, filename)
                    Object.keys(dupes).should.have.length(0)
                    console.log(dupes)


                }).timeout(10000)
            }
        )
        // })
        ;

    });
});
