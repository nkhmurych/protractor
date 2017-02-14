/**
 * @author: Roman Soltys
 * Date: 16.09.16 11:39
 *
 */
'use strict';

exports.config = {
    onPrepare: function () {
        global.TIMEOUT = 45000;
        global.DEFAULT_WIDTH = 1280;
        global.DEFAULT_HEIGHT = 1024;
        global.fs = require('fs');

        require('./helpers/globals/selector.js');
        require('./helpers/globals/config/matchers.js');

        browser.ignoreSynchronization = true;
        browser.driver.manage().window().maximize();
        browser.driver.manage().timeouts().pageLoadTimeout(45000);

        global.settings = require('./helpers/environment/testData');
        global.helper = require('./helpers/globals/config/utils');
        global.randomData = require('./helpers/functions/randomData.js');
        global.tests = helper.utils;

        global.path = './helpers/functions/';
        global.google = require(path + '/google.js');

        var SpecReporter = require('./modules/jasmine-spec-reporter');
        var failFast = require('./modules/protractor-fail-fast');
        var AllureReporter = require('jasmine-allure-reporter');

        jasmine.getEnv().addReporter(new SpecReporter({displayStacktrace: true}));
        jasmine.getEnv().addReporter(failFast.init());


        jasmine.getEnv().addReporter(new AllureReporter({
            resultsDir: 'allure-results'
        }));

        jasmine.getEnv().afterEach(function(done){
            browser.takeScreenshot().then(function (png) {
                allure.createAttachment('Screenshot', function () {
                    return new Buffer(png, 'base64')
                }, 'image/png')();
                done();
            })
        });
    },

    framework: 'jasmine2',
    seleniumAddress: 'http://localhost:4444/wd/hub',

    suites: {
        google: './spec/example.js'
    },

    capabilities: {
        browserName: 'chrome',
        shardTestFiles: true,
        maxInstances: 3,
        'chromeOptions': {
            args: [
                '--no-sandbox',
                '--window-size=1920,1080',
                '--ignore-certificate-errors',
                '--ssl-protocol=tlsv1',
                '--disable-web-security'
            ],
            prefs: {
                'download': {
                    'prompt_for_download': false,
                    'directory_upgrade': true,
                    'default_directory': 'protractor/helpers/functions/'
                }
            }
        }
    },

    jasmineNodeOpts: {
        defaultTimeoutInterval: 500000,
        throwFailures: true,
        stopSpecOnExpectationFailure: true,
        failOnError: true,
        includeStackTrace: true,
        isVerbose: true,
        realtimeFailure: true
    }
};