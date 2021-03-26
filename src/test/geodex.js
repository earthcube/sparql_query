var _ = require('lodash')
var expect = require("chai").expect;
var should = require('chai').should();
var fullTextTests = require("../testconfigs/fullTextTests")
var results = require("../sparql_testing")

describe("Geodex", function () {

    describe("dupe test for geodex", function () {
        let key = "geodex"
        let template = fullTextTests.fullTextTests.templates.get(key)

        // templates.forEach(function (template,key) {
        let tests = fullTextTests.fullTextTests.tests
        let server = fullTextTests.fullTextTests.server
        let name = fullTextTests.fullTextTests.name

        fullTextTests.fullTextTests.tests.forEach(
            function (t) {
                it(`${key} duplicate full text for ${t.name} `, async function () {

                    const response = await results.results(template, t.params, server)
                    var b = await response.data.results.bindings
                    // dupe
                    console.log(`results.bindings.length ${b.length}`)
                    const gb = _.groupBy(b, s =>  s.subj.value )
                    const dupes = _.pickBy(gb,x => x.length > 1)
                    Object.keys(dupes).should.have.length(0)
                    console.log(dupes)


                }).timeout(10000)
            }
        )
        // })
        ;

    });
});
