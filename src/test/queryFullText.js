var expect = require("chai").expect;
var should = require('chai').should();
var fullTextTests = require("../testconfigs/fullTextTests")
var results = require("../sparql_testing")

describe("queryFullText", function () {
    describe("geodex", function () {

        let templates = fullTextTests.fullTextTests.templates

        templates.forEach(function (template,key) {
            let tests = fullTextTests.fullTextTests.tests
            let server = fullTextTests.fullTextTests.server
            let name = fullTextTests.fullTextTests.name

            fullTextTests.fullTextTests.tests.forEach(
                function (t) {
                    it(`queries using full text for ${t.name} ${key}`, async function () {

                        const response = await results.results(template, t.params, server)
                        var b = await response.data.results.bindings
                        b.should.have.length(t.expectedCount);

                    }).timeout(10000)
                }
            )
        })
        ;

    });
});
