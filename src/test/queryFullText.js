var _ = require('lodash')
var fs = require('fs')
var path = require('path')
var expect = require("chai").expect;
var should = require('chai').should();
var fullTextTests = require("../testconfigs/fullTextTests")
var results = require("../sparql_testing")

describe("queryFullText", function () {

    before(function() {
        // runs once before the first test in this block
        let templates = fullTextTests.fullTextTests.templates
        templates.forEach(function(template,key){
            var dir = __dirname + '/../../results/'+key;
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
        })

    });

    describe("general test", function () {

        let templates = fullTextTests.fullTextTests.templates


            let tests = fullTextTests.fullTextTests.tests
            let server = fullTextTests.fullTextTests.server
            let name = fullTextTests.fullTextTests.name

            fullTextTests.fullTextTests.tests.forEach(
                function (t) {
                    templates.forEach(function (template,key) {
                    it(`${key} full text for ${t.name} `, async function () {

                        const response = await results.results(template, t.params, server)
                        var b = await response.data.results.bindings

                        var filename = __dirname + '/../../results/'+key +'/' + t.name ;
                        fs.writeFileSync(filename, JSON.stringify(b,null,2), { flag: 'w+' })

                        b.should.have.length(t.expectedCount);
                        // dupe
                        // const gb = _.groupBy(b, s =>  s.s.value )
                        // const dupes = _.pickBy(gb,x => x.length > 1)
                        //
                        // console.log(dupes)


                    }).timeout(3000)
                }
            )
        })
        ;

    });
    describe("Compare Results", function () {



        fullTextTests.fullTextTests.tests.forEach(
            function (t) {
                let templates = fullTextTests.fullTextTests.templates
                let templateKeys = [...templates.keys()]
                let key0= templateKeys[0]
                let key1 = templateKeys[1]

                let tests = fullTextTests.fullTextTests.tests
                let server = fullTextTests.fullTextTests.server
                let name = fullTextTests.fullTextTests.name
                        it(`compare  ${t.name} `, async function () {

                            const response0 = await results.results(templates.get(key0), t.params, server)
                            var r0 = await response0.data.results.bindings
                            const response1 = await results.results(templates.get(key1), t.params, server)
                            var r1 = await response1.data.results.bindings
                            r0.length.should.equal(r1.length);
                            // dupe
                            // const gb = _.groupBy(b, s =>  s.s.value )
                            // const dupes = _.pickBy(gb,x => x.length > 1)
                            //
                            // console.log(dupes)


                        }).timeout(3000)


            })
        ;

    });
});
