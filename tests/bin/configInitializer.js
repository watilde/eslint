/**
 * @fileoverview Tests for configInitializer.
 * @author Ilya Volodin
 */

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var assert = require("chai").assert,
    init = require("../../bin/configInitializer");

var answers = {};

describe("configInitializer", function() {
    beforeEach(function() {
        answers = {
            indent: 2,
            quotes: "single",
            linebreak: "unix",
            semi: true,
            es6: true,
            env: ["browser"],
            jsx: false,
            react: false,
            format: "JSON"
        };
    });

    it("should create default config", function() {
        init.processAnswers(answers, function(config, isJson) {
            assert.deepEqual(config.rules.indent, [2, 2]);
            assert.deepEqual(config.rules.quotes, [2, "single"]);
            assert.deepEqual(config.rules["linebreak-style"], [2, "unix"]);
            assert.deepEqual(config.rules.semi, [2, "always"]);
            assert.equal(config.env.es6, true);
            assert.equal(config.env.browser, true);
            assert.equal(isJson, true);
        });
    });
    it("should disable semi", function() {
        answers.semi = false;
        init.processAnswers(answers, function(config) {
            assert.deepEqual(config.rules.semi, [2, "never"]);
        });
    });
    it("should set format to YAML", function() {
        answers.format = "YAML";
        init.processAnswers(answers, function(config, isJson) {
            assert.equal(isJson, false);
        });
    });
    it("should enable jsx flag", function() {
        answers.jsx = true;
        init.processAnswers(answers, function(config) {
            assert.equal(config.ecmaFeatures.jsx, true);
        });
    });
    it("should enable react plugin", function() {
        answers.jsx = true;
        answers.react = true;
        init.processAnswers(answers, function(config) {
            assert.equal(config.ecmaFeatures.jsx, true);
            assert.deepEqual(config.plugins, ["react"]);
        });
    });
});
