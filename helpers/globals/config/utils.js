'use strict';

var utils = {

    testRail : function (done, prod, plan, section, suite) {
        var obj = {
            "project_id" : prod,
            "plan_name" : plan,
            "section_id" : section,
            "title" : suite,
            "status_name" : (jasmine.results.spec.failedExpectations.length === 0 ? 'passed' : 'failed')
        };
        tr.ifNeededCreateThenAddResultForCase(obj).finally(function(){
            done();
        });
    },

    beforeAll : function () {
        beforeAll(function() {
            browser.driver.manage().deleteAllCookies();
            browser.ignoreSynchronization = true;
        });
    },

    beforeEach : function () {
        beforeEach (function() {
            var originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
            jasmine.DEFAULT_TIMEOUT_INTERVAL = 45000;
        });
    },

    openSite : function(url) {
        browser.get(url);
        console.log('URL is: ' + url);
        // expect(browser.getCurrentUrl()).toEqual(url);
    },

    /**example tests.openNewPage('http://www.example.com')*/
    openNewPage: function (url) {
        browser.get(url);
        console.log('New Page URL is: ' + url);

    },

    /**Asserts that the element matching the provided selector expression is not visible*/
    assertNotVisible: function (el, timeout) {
        return browser.driver.wait(function() {
            console.log("check element not visible " + el);
            return browser.isElementPresent(el).then(function(el){
                return el === false;
            });
        }, timeout || TIMEOUT);
    },

   isApproachable: function(selector, timeout) {
       return browser.driver.wait(function () {
           return element(selector).isPresent().then(function (present) {
               return present ? element(selector).isDisplayed() : false;
           });
       }, timeout || TIMEOUT);
   },

    /**Asserts that the element matching the provided selector expression is not visible*/
    assertVisible: function (el) {
        return browser.wait(function() {
            console.log("check element visible" + el);
            return browser.isElementPresent(el).then(function(el){
                return el === true;
            });
        }, TIMEOUT);
    },

    assertNotPresent: function (selector) {
        console.log('check element not visible: ' + selector);
        expect(browser.isElementPresent(element(selector))).toBe(false);
    },

    assertIsDisplayed: function (selector) {
        element(selector).isDisplayed().then(function() {
            expect(element(selector).isPresent()).toBe(true);
        });
    },

    assertIsNotDisplayed: function (selector) {
        element(selector).isDisplayed().then(function () {
            expect(element(selector).isPresent()).toBe(false)
        })
    },

    /**example tests.assertTextEqual(by.className("login-heading"), 'SIGN IN')*/
    assertTextEqual: function (selector, expected) {
        element(selector).getText().then(function (actual) {
            console.log(actual);
            expect(actual).toEqual(expected);
            return actual === true;
        });
    },

    /**example tests.assertTextNotEqual(by.className("login-heading"), 'SIGN IN')*/
    assertTextNotEqual: function (selector, expected) {
        element(selector).getText().then(function (actual) {
            console.log(actual);
            expect(actual).toBe(expected)
        });
    },

    /**example tests.assertTitleEqual('ProtractorJs');*/
    assertTitleEqual: function (expected) {
        browser.getTitle().then(function (actual) {
            expect(actual).toEqual(expected);
            console.log(actual);
        })
    },

    assertElementVisible: function (selector) {
        expect(element(selector).isDisplayed()).toBeDisabled();
    },

    assertElementNotVisible: function (selector, timeout) {
        browser.wait(function () {
            console.log('check element not visible :' + selector);
            return element(selector).isDisplayed().then(function(isVisible){
                console.log('is visible :' + isVisible);
                return !isVisible;
            });
        }, timeout || TIMEOUT);
    },

    assertNotVisibleAndNotExist: function (selector, timeout) {
        browser.wait(function () {
            console.log('check ' + selector);
            expect(element(selector).isDisplayed()).toBe(false);
        }, timeout || TIMEOUT)
    },

    /**example tests.assertSelectorHasText(by.xpath('selector'), expected)*/
    assertSelectorHasText: function(selector, expected) {
        return browser.isElementPresent(selector).then(function(el) {
            element(selector).getText().then(function (actual) {
                console.log('actual : ' + actual);
                expect(actual).toEqual(expected);
            });
        });
    },

    assertAllSelectorHasText: function(selector, expected) {
        return browser.isElementPresent(selector).then(function(el) {
            element.all(selector).getText().then(function (actual) {
                console.log('actual : ' + actual);
                expect(actual).toEqual(expected);
            });
        });
    },

    /**example tests.assertSelectorHasText(by.xpath('selector'), expected)*/
    assertSelectorHasContainText: function(selector, expected) {
        return browser.isElementPresent(selector).then(function(el) {
            element(selector).getText().then(function (actual) {
                expect(actual).toContain(expected);
            });
        });
    },

    assertAttributeHasValue: function (attribute, selector, expected) {
        element(selector).getAttribute(attribute).then(function (actual) {
            console.log(actual);
            expect(actual).toEqual(expected);
        })
    },

    /**example tests.assertTextExists('text')*/
    assertTextExists: function (text, parentXpathSelector) {
        console.log('check text: ' + text);
        parentXpathSelector = parentXpathSelector || '//';
        expect(element(by.xpath(parentXpathSelector +
            '*[normalize-space(text())="' + text + '"]')).isPresent())
            .toBe(true);
    },

    assertTextDoesntExist: function (text, parentXpathSelector) {
        parentXpathSelector = parentXpathSelector || '//';
        expect(element(by.xpath(parentXpathSelector +
            '*[normalize-space(text())="' + text + '"]')).isPresent())
            .toBe(false);
    },

    /**example tests.assertEquals(2, 3)*/
    assertEquals: function (expected, actual) {
        expect(expected).toEqual(actual);
    },

    /**example tests.checkCurrentUrl('http://www.example.com')*/
    checkCurrentUrl: function (url) {
        expect(browser.getCurrentUrl()).toEqual(url);
    },

    /**example tests.backToPreviousPage()*/
    backToPreviousPage: function () {
        browser.navigate().back();

    },

    browserWaitForElement: function (selector, timeout) {
        browser.driver.wait(function () {
            console.log("check elements present" + selector);
            return browser.isElementPresent(selector).then(function (el) {
                return el === true;
            });
        }, timeout || TIMEOUT);
    },

    /**example tests.waitForCount(selector, count)*/
    waitForCount: function(selector, expectedCount) {
        browser.wait(waitCount(selector, expectedCount), TIMEOUT);
        function waitCount(selector, expectedCount) {
            return function () {
                return element.all(selector).count().then(function (actualCount) {
                    return expectedCount === actualCount;
                });
            }
        }
    },

    checkUrlChanged: function () {
        return function () {
            return browser.getCurrentUrl().then(function(actualUrl) {
                return url != actualUrl;
            });
        };
    },

    /**example tests.check("selector")*/
    check: function (selector) {
        browser.wait(element(selector).isPresent(), TIMEOUT);
    },

    checkFileContent: function (file, expected) {
        expect(fs.readFileSync(file, {
            encoding: 'utf8'
        })).toContain(expected);
    },

    checkElement: function (selector, attribute, expected) {
        expect(element(selector)
            .isDisplayed().then(function (isVisible) {
                if(isVisible)
                {
                    expect(element(selector).getAttribute(attribute))
                        .toMatch(expected);
                }
            })
        )
    },

    /**example tests.checkElementCount(selector), expectedCount)*/
    checkElementCount: function(selector, expectedCount) {
        browser.driver.findElements(selector).
        then(function(elems) {
                expect(elems.length).toEqual(expectedCount);
            }
        );
    },

    checkCount: function (selector, expected) {
        expect(element.all(selector).count()).toEqual(expected);
    },

    clickOn: function () {
        element(selector).click();
    },

    /**example tests.clickElementByText('Text')*/
    clickElementByText: function (buttonText) {
        element(by.buttonText(buttonText))
            .click();
    },

    /**example tests.clickElementByText('ext')*/
    clickElementPartialText: function (buttonText) {
        element(by.partialButtonText(buttonText))
            .click();
    },

    clearCookies: function () {
        browser.driver.manage().deleteAllCookies();
    },

    clearField: function () {
        element(selector).clear();
    },

    childProcess: function (bash, comand, onTimeout, timeout) {
        var cp = require('child_process').execFile;
        var finished = false;
        timeout = timeout === null || TIMEOUT;
        cp(bash, [comand], {}, function(error, output) {
            finished = true;
            console.log(error);
            // console.log(output)
        }, browser.wait(function () {
            return finished === true;
        }, null, onTimeout, timeout));
    },

    dragAndDropActions: function(selector, X, Y) {
        browser.actions().dragAndDrop(element(selector), {x: X, y: Y}).perform();
    },

    runCommand: function (bash, command, newCommand, onTimeout, timeout) {
        var cp = require('child_process').execFile;
        var finished = false;
        timeout = timeout === null || TIMEOUT;
        cp(bash, [command], {}, function(error, output) {
            finished = true;
            console.log(error);
            // console.log(output)
        }, browser.wait(function () {
            newCommand;
            return finished === true;
        }, null, onTimeout, timeout));
    },

    /**example tests.getElementAttribute(by.xpath("//*[contains(@class,'nav')]li[last()]/a"), 'href')*/
    getElementAttribute: function (selector, attributeName) {
        return browser.wait(function() {
            return element(selector).getAttribute(attributeName)
                .then(function(value) {
                    console.log(value);
                    return value;
                });
        }, TIMEOUT);
    },

    /**example tests.getElementCount(selector)*/
    getElementCount: function (selector) {
        element.all(selector).count().then(function(count) {
            console.log(count);
        });
    },

    /**example tests.getElementText(by.className("login-heading"))*/
    getElementText: function (selector) {
        element(selector).getText().then(function (text) {
            console.log(text);
        });
    },

    getPageTitle: function () {
        browser.getTitle().then(function (title) {
            console.log(title)
        });
    },

    getByText: function (compareText) {
        var foundElement;
        return this.each(function (element) {
            element.getWebElement().getText().then(function (elementText) {
                if (elementText.trim() === compareText) {
                    foundElement = element;
                }
            });
        }).then(function () {
            return foundElement;
        });
    },

    /**example tests.getRandomInt(2, 5)*/
    getRandomInt: function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min
    },

    isElementEnabled: function (selector) {
        expect(element(selector).isEnabled()).toBe(true);
    },

    isElementDisabled: function (selector) {
        expect(element(selector).isEnabled()).toBe(false);
    },

    isSelected: function (selector) {
        expect(element(selector).isSelected()).toBeTruthy();
    },

    /**Moves the mouse cursor onto the element
     * matching the provided arguments*/
    mouseMove: function (selector) {
        browser.actions().mouseMove(element(selector)).perform();
    },

    /**example tests.findElement(selector)*/
    findElement: function (selector) {
        browser.findElement(selector)
    },

    findAndClick: function (selector) {
        browser.findElement(selector).click();
    },

    /**Sends a mousedown mouse event onto the
     * element matching the provided arguments*/
    mouseDown: function (selector) {
        browser.actions().mouseDown(element(selector)).perform();
    },

    /**Sends a mouseup mouse event onto the element
     * matching the provided arguments*/
    mouseUp: function (selector) {
        browser.actions().mouseUp(element(selector)).perform();
    },

    /**Sends a doubleclick mouse event onto the element
     * matching the provided arguments*/
    doubleClick: function (selector) {
        browser.actions().doubleClick(element(selector)).perform();
    },

    mouseMoveAndClick: function (selector) {
        browser.actions().mouseMove(element(selector)).click()
    },

    dragAndDrop: function (selector, sel) {
        browser.actions().dragAndDrop(element(selector),
            element(sel)).perform()
    },

    displayHover : function (selector) {
        browser.actions().mouseMove(element(selector)).perform();
        return browser.wait(function () {
            return element(selector).isDisplayed();
        }, TIMEOUT);
    },

    /**example tests.makeImage('asdasdzz1.jpeg')*/
    makeImage: function (name) {
        function writeScreenShot(data, filename) {
            var stream = fs.createWriteStream(filename);
            stream.write(new Buffer(data, 'base64'));
            stream.end();
        }
        browser.takeScreenshot().then(function (png) {
            writeScreenShot(png, name);
        })
    },

    matchCurrentUrl: function (expectedUrl) {
        expect(browser.getCurrentUrl()).toMatch(expectedUrl)
    },

    maximizeWindow: function (width, height) {
        width = width || DEFAULT_WIDTH;
        height = height || DEFAULT_HEIGHT;
        browser.driver.manage().window().setSize(width, height);
    },


    refresh: function () {
        browser.refresh()
    },

    /**example tests.sendKeys(adminUrl, settings.adminUrl)*/
    sendKeys: function(selector, value) {
        element(selector).clear().sendKeys(value);
    },

    sendFieldKeys: function(selector, value) {
        element(selector).sendKeys(value);
    },

    /**sleep 3.5 sec*/
    sleep: function () {
        browser.sleep(3500);
    },

    /**sleep 3.5 sec*/
    sleepSmall: function () {
        browser.sleep(1500);
    },

    waitLong: function () {
        browser.sleep(8000)
    },

    /**switch to new window after click and check url*/
    switchTo: function (selector, url, windows) {
        element(selector).click().then(function () {
            browser.sleep(1500);
            browser.getAllWindowHandles().then(function (handles) {
                var newWindowHandle = handles[windows];
                browser.switchTo().window(newWindowHandle).then(function () {
                    browser.sleep(1500);
                    expect(browser.getCurrentUrl()).toMatch(url);
                });
            });
        });
    },

    /**switch to new window after click*/
    switchToNewWindow: function (selector, expected) {
        element(selector).click().then(function () {
            browser.sleep(1000).then(function () {
                browser.getAllWindowHandles().then(function (handles) {
                    var newWindowHandle = handles[1];
                    browser.switchTo().window(newWindowHandle).then(function () {
                        tests.waitForElement(expected);
                    });
                });
            });
        });
    },

    selectValue: function (selector, value) {
        element(selector).sendKeys(value);
    },

    translate: function (key, values) {
        return browser.executeScript(function (key, values) {
            var $translate = angular.element(document.body).injector().get('$translate');
            return $translate(key, values);
        }, key, values);
    },

    waitAndCheck: function (el, timeout) {
        return browser.driver.wait(function() {
            console.log("check element " + el);
            return browser.isElementPresent(el).then(function(el){
                return el === true;
            });
        }, timeout || TIMEOUT);
    },

    waitUntilReady: function() {
        this.waitUntilReady = function (elm, timeout) {
            browser.wait(function () {
                return elm.isPresent();
            }, timeout || TIMEOUT);
            browser.wait(function () {
                return elm.isDisplayed();
            }, timeout || TIMEOUT);
        };
    },

    waitAndClick: function (selector) {
        browser.driver.wait(function(){
            console.log('check element present before click: ' + selector);
            return browser.isElementPresent(selector).then(function(el){
                return el === true;
            });
        }, TIMEOUT).then(function(){
            console.log('click element: ' + selector);
            element(selector).click();
        });
    },

    clickFirstElement: function (selector) {
        element.all(selector).first().click();
    },

    click: function (selector) {
        element(selector).click();
    },

    waitForElement : function (selector, timeout) {
        browser.wait(function () {
            console.log('check : ' + selector);
            return element(selector).isPresent().then(function (isPresent) {
                if (isPresent) {
                    return element(selector).isDisplayed();
                }
            });
        }, timeout || TIMEOUT);
    },

    waitForElementToDisappear: function (selector, timeout) {
        var _this = this;
        browser.wait(function () {
            return element(selector).isPresent().then(function (isPresent) {
                if (isPresent) {
                    return _this.not(element(selector).isDisplayed());
                }
            });
        }, timeout || TIMEOUT);
    },

    clearAndSetValue: function (selector, value) {
        return element(selector).clear().then(function () {
            return element(selector).sendKeys(value);
        });
    },

    hasClass: function (selector, className) {
        expect(element(selector).getAttribute('class')).toMatch(className);
    },

    hasValue: function (selector, expectedValue) {
        return element(selector).getAttribute('value').then(function (value) {
            console.log('value: ' + value);
            expect(value).toEqual(expectedValue);
        });
    },

    checkReadonly: function (selector, expectedValue) {
        expect(element(selector).getAttribute('readonly')).toBe('true')
    },

    checkUrlAfterClick: function (selector, expectedUrl, timeout) {
        element(selector).click().then(function(){
            return browser.driver.wait(function() {
                return browser.driver.getCurrentUrl().then(function(url) {
                    console.log(expectedUrl);
                    return expectedUrl == (url);
                });
            }, timeout || TIMEOUT);
        });
    },

    checkAutoFocus: function (selector, attribute) {
        console.log('Switch To' + selector);
        expect(element(selector).getAttribute(attribute))
            .toEqual(browser.switchTo().activeElement().getAttribute(attribute));
    },

    hasLink: function (selector, url) {
        return element(selector).getAttribute('href').then(function (href) {
            expect(href).toEqual(url);
        });
    },

    isDisabledAttribute: function (selector) {
        expect(element(selector).getAttribute('disabled')).toBe('true');
    },

    isRequired: function (selector) {
        expect(element(selector).getAttribute('required')).toBe('true');
    },

    notDisabledAttribute: function (selector) {
        expect(element(selector).getAttribute('disabled')).toBe(null);
    },

    isCheckedAttribute: function (selector) {
        expect(element(selector).getAttribute('checked')).toBe('true');
    },

    isChecked: function (selector) {
        expect(element(selector).getAttribute('checked')).toBe('true');
    },

    isAutofocus: function (selector) {
        expect(element(selector).getAttribute('autofocus')).toBe('true');
    },
    isNoCheckedAttribute: function (selector) {
        expect(element(selector).getAttribute('checked')).toBe(null);
    },

    checkMaxLength: function (selector, length) {
        expect(element(selector).getAttribute('maxlength')).toContain(length)
    },

    checkAttributeType: function (selector, expected) {
        expect(element(selector).getAttribute('type')).toBe(expected)
    },

    checkResponse: function httpGet(siteUrl) {
            var http = require('https');
            var defer = protractor.promise.defer();
            http.get(siteUrl, function(response) {
                var bodyString = '';
                response.setEncoding('utf8');
                response.on("data", function(chunk) {
                    bodyString += chunk;
                });
                response.on('end', function() {
                    defer.fulfill({
                        statusCode: response.statusCode,
                        bodyString: bodyString
                    });
                });
            }).on('error', function(e) {
                defer.reject("Got http.get error: " + e.message);
            });
            return defer.promise;
    },

    takeScreenShotsIfSpecFailed : function(testName) {
        jasmine.getEnv().addReporter(new function() {
            this.specDone = function(result) {
                if(result.failedExpectations.length > 0) {
                    browser.takeScreenshot().then(function(png) {
                        var dir = 'screenshot/';
                        try {
                            fs.mkdirSync(dir)
                        } catch(e) {
                            if ( e.code != 'EEXIST' )
                                throw e;
                        }
                        try {
                            var stream = fs.createWriteStream(path.join(dir, testName + '.png'));
                            stream.write(new Buffer(png, 'base64'));
                            stream.end();
                        } catch(e) {
                            if ( e.code != 'EEXIST' )
                                throw e;
                        }
                    });
                }
            }
        });
    }
};

module.exports.utils = utils;