var _ = require('lodash')
var fs = require('fs')
var path = require('path')
var expect = require("chai").expect;
var should = require('chai').should();
var config = require("../testconfigs/fullTextTests")
var testing = require("../eco_sparql_testing")

describe("queryFullText", function () {

    before(function() {
        // runs once before the first test in this block
        let templates = config.fullTextTests.templates
        templates.forEach(function(template,key){
            var dir = __dirname + '/../../results/'+key;
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
        });
        dir = __dirname + '/../../results/compare';
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

    });

    describe("general test", function () {

        let templates = config.fullTextTests.templates


            let tests = config.fullTextTests.tests
            let server = config.fullTextTests.server
            let name = config.fullTextTests.name

            config.fullTextTests.tests.forEach(
                function (t) {
                    templates.forEach(function (template,key) {
                    it(`${key} full text for ${t.name} `, async function () {

                        // const response = await results.results(template, t.params, server)
                        // var b = await response.data.results.bindings
                        //
                        // var filename = __dirname + '/../../results/'+key +'/' + t.name ;
                        // fs.writeFileSync(filename, JSON.stringify(b,null,2), { flag: 'w+' })

                        var results = await testing.results(template,t.params, server)
                        var filename = __dirname + '/../../results/'+key +'/' + t.name +'_results.json' ;
                        testing.writeJson(results,filename)
                        results.should.have.length(t.expectedCount);
                        // dupe
                        // const gb = _.groupBy(b, s =>  s.s.value )
                        // const dupes = _.pickBy(gb,x => x.length > 1)
                        //
                        // console.log(dupes)


                    }).timeout(10000)
                }
            )
        })
        ;

    });
    describe("Compare Results", function () {



        config.fullTextTests.tests.forEach(
            function (t) {
                let templates = config.fullTextTests.templates
                let templateKeys = [...templates.keys()]
                let key0= templateKeys[0]
                let key1 = templateKeys[1]

                let tests = config.fullTextTests.tests
                let server = config.fullTextTests.server
                let name = config.fullTextTests.name
                        it(`compare  ${t.name} `, async function () {

                            // const response0 = await testing.results(templates.get(key0), t.params, server)
                            // var r0 = await response0.data.results.bindings
                            // const response1 = await testing.results(templates.get(key1), t.params, server)
                            // var r1 = await response1.data.results.bindings

                            var filename = __dirname + '/../../results/compare/' + t.name + '_compare_diffs.json' ;
                           var comp = await testing.compare(t.params,
                               templates.get(key0), 's',
                               templates.get(key1), 'subj', server, filename)

                            comp.unique_lengths[0].should.equal(comp.unique_lengths[1],
                                'compare:different unique lengths');
                            comp.result_lengths[0].should.equal(comp.result_lengths[1],
                                'compare:different results lengths. Unique OK');
                            // dupe
                            // const gb = _.groupBy(b, s =>  s.s.value )
                            // const dupes = _.pickBy(gb,x => x.length > 1)
                            //
                            // console.log(dupes)


                        }).timeout(10000)


            })
        ;

    });
});
