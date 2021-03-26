var _ = require('lodash')
var expect = require("chai").expect;
var should = require('chai').should();
var fullTextTests = require("../testconfigs/fullTextTests")
var results = require("../sparql_testing")

describe("queryFullText", function () {
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
                        b.should.have.length(t.expectedCount);
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


                        }).timeout(10000)


            })
        ;

    });
});
