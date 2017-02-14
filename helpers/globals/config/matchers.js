
function Helpers() {
    browser.getCapabilities().then(function (cap) {
        this.browserName = cap.get('browserName');
    }.bind(this));
}

Helpers.prototype.createMessage = function (actual, message, isNot) {
    var msg = message
        .replace('{{actual}}', actual)
        .replace('{{not}}', (isNot ? ' not ' : ' '));

    if (actual.locator) {
        msg = msg.replace('{{locator}}', actual.locator());
    }

    return msg;
};

(function () {
    var helpers = new Helpers();

    beforeEach(function () {
        jasmine.addMatchers({
            toBePresent: function () {
                return {
                    compare: function (actual) {
                        var result = {};
                        result.pass = actual.isPresent().then(function (pass) {
                            result.message = helpers.createMessage(actual, 
                                'Expected {{locator}}{{not}}to Be Present', pass);
                            return pass;
                        });
                        return result;
                    }
                };
            },
            toBeDisplayed: function () {
                return {
                    compare: function (actual) {
                        var result = {};
                        result.pass = actual.isDisplayed().then(function (pass) {
                            result.message = helpers.createMessage(actual, 
                                'Expected {{locator}}{{not}}to Be Displayed', pass);
                            return pass;
                        });
                        return result;
                    }
                };
            },
            toHaveCountOf: function () {
                return {
                    compare: function (actual, expectedCount) {
                        var result = {};
                        result.pass = (function () {
                            result.message = helpers.createMessage(actual, 
                                'Expected {{locator}}{{not}}to have length of ' 
                                + expectedCount + ' but was {{actual}}', actual === expectedCount);
                            return actual === expectedCount;
                        })();
                        return result;
                    }
                };
            },
            toHaveText: function () {
                return {
                    compare: function (actual, expectedText) {
                        var result = {};
                        result.pass = actual.getText().then(function (text) {
                            result.message = helpers.createMessage(actual, 
                                'Expected {{locator}}{{not}}to have text ' 
                                + expectedText + ' but was ' + text, (text === expectedText));
                            return text === expectedText;
                        });
                        return result;
                    }
                };
            },
            toMatchRegex: function () {
                return {
                    compare: function (actual, expectedPattern) {
                        var re = new RegExp(expectedPattern);
                        var result = {};
                        result.pass = actual.getText().then(function (text) {
                            result.message = helpers.createMessage(actual, 
                                'Expected {{locator}}with text ' 
                                + text + '{{not}}to match pattern ' + expectedPattern, re.test(text));
                            return re.test(text);
                        });
                        return result;
                    }
                };
            },
            toMatchMoney: function () {
                return {
                    compare: function (actual, expectedValue, currencySymbol) {
                        var regexExpectedValue = createMoneyRegexp(actual, expectedValue, currencySymbol);
                        var result = {};
                        result.pass = (function () {
                            result.message = helpers.createMessage(actual, 
                                'Expected ' + actual + '{{not}}to match money pattern ' 
                                + regexExpectedValue, regexExpectedValue.test(actual));
                            return regexExpectedValue.test(actual);
                        })();
                        return result;
                    }
                };
            },
            toMatchMoneyWithFraction: function () {
                return {
                    compare: function (actual, expectedValue, currencySymbol) {
                        var regexExpectedValue = createMoneyRegexp(actual, expectedValue, currencySymbol, true);
                        var result = {};
                        result.pass = (function () {
                            result.message = helpers.createMessage(actual, 
                                'Expected ' + actual + '{{not}}to match money pattern ' 
                                + regexExpectedValue, regexExpectedValue.test(actual));
                            return regexExpectedValue.test(actual);
                        })();
                        return result;
                    }
                };
            },
            toHaveValue: function () {
                return {
                    compare: function (actual, expectedValue) {
                        var result = {};
                        result.pass = helpers.hasValue(actual, expectedValue).then(function (pass) {
                            result.message = helpers.createMessage(actual, 
                                'Expected {{locator}}{{not}}to have value ' 
                                + expectedValue, pass);
                            return pass;
                        });
                        return result;
                    }
                };
            },
            toHaveClass: function () {
                return {
                    compare: function (actual, className) {
                        var result = {};
                        result.pass = helpers.hasClass(actual, className).then(function (pass) {
                            result.message = helpers.createMessage(actual, 
                                'Expected {{locator}}{{not}}to have class ' 
                                + className, pass);
                            return pass;
                        });
                        return result;
                    }
                };
            },
            toHaveUrl: function () {
                return {
                    compare: function (actual, url) {
                        var result = {};
                        result.pass = helpers.hasLink(actual, url).then(function (pass) {
                            result.message = helpers.createMessage(actual, 
                                'Expected {{locator}}{{not}}to have url ' 
                                + url, pass);
                            return pass;
                        });
                        return result;
                    }
                };
            },
            toBeDisabled: function () {
                return {
                    compare: function (actual) {
                        var result = {};
                        result.pass = helpers.isDisabled(actual).then(function (pass) {
                            result.message = helpers.createMessage(actual, 
                                'Expected {{locator}}{{not}}to be Disabled', pass);
                            return pass;
                        });
                        return result;
                    }
                };
            },
            toBeChecked: function () {
                return {
                    compare: function (actual) {
                        var result = {};
                        result.pass = helpers.isChecked(actual).then(function (pass) {
                            result.message = helpers.createMessage(actual, 
                                'Expected {{locator}}{{not}}to be checked', pass);
                            return pass;
                        });
                        return result;
                    }
                };
            },
            toBeValid: function () {
                return {
                    compare: function (actual) {
                        var result = {};
                        result.pass = helpers.hasClass(actual, 'ng-valid').then(function (pass) {
                            result.message = helpers.createMessage(actual, 
                                'Expected {{locator}}{{not}} to have valid input value', pass);
                            return pass;
                        });
                        return result;
                    }
                };
            },
            toBeInvalid: function () {
                return {
                    compare: function (actual) {
                        var result = {};
                        result.pass = helpers.hasClass(actual, 'ng-invalid').then(function (pass) {
                            result.message = helpers.createMessage(actual, 
                                'Expected {{locator}}{{not}} to have invalid input value', pass);
                            return pass;
                        });
                        return result;
                    }
                };
            },
            toBeInvalidRequired: function () {
                return {
                    compare: function (actual) {
                        var result = {};
                        result.pass = helpers.hasClass(actual, 'ng-invalid-required').then(function (pass) {
                            result.message = helpers.createMessage(actual, 
                                'Expected {{locator}}{{not}} to be required and invalid (when empty)', pass);
                            return pass;
                        });
                        return result;
                    }
                };
            },
            toMatchTranslated: function () {
                return {
                    compare: function (actual, key, values) {
                        var result = {};
                        result.pass = helpers.translate(key, values).then(function (translatedStr) {
                            var re = new RegExp(translatedStr);
                            result.message = helpers.createMessage(actual, 'Expected {{actual}}{{not}} ' 
                                + translatedStr + ' (translated from ' + key + ', values: ' + JSON.stringify(values) + ')', re.test(actual));
                            return re.test(actual);
                        });
                        return result;
                    }
                };
            }
        });
    });
})();