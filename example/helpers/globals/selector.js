/**
 * @author: Roman Soltys
 * Date: 16.09.16 11:39
 *
 */

var ElementArrayFinder = $$('').constructor;
var ElementFinder = $('').constructor;

ElementArrayFinder.prototype.$$data = ElementFinder.prototype.$$data = function (hook) {
    return this.all(by.dataHookAll(hook));
};

ElementFinder.prototype.$data = function (hook) {
    return this.element(by.dataHook(hook));
};

ElementFinder.prototype.$id = function (selector) {
    return this.element(by.id(selector));
};

ElementFinder.prototype.$xPath = function (selector) {
    return this.element(by.xpath(selector));
};

ElementFinder.prototype.$css = function (selector) {
    return this.element(by.css(selector));
};

ElementFinder.prototype.$el = function (selector) {
    return this.element(selector);
};

ElementFinder.prototype.$cl = function (selector) {
    return this.element(by.className(selector));
};

ElementFinder.prototype.$n = function (selector) {
    return this.element(by.name(selector));
};

(function (global) {
    global.$data = function (hook) {
        return element(by.dataHook(hook));
    };

    global.$$data = function (hook) {
        return element.all(by.dataHookAll(hook));
    };

    global.$id = function (selector) {
        return (by.id(selector));
    };

    global.$el = function (selector) {
        return element(selector);
    };

    global.$cl = function (selector) {
        return (by.className(selector));
    };

    global.$xPath = function (selector) {
        return (by.xpath(selector));
    };

    global.$css = function (selector) {
        return (by.css(selector));
    };

    global.$n = function (selector) {
        return (by.name(selector));
    };
})(global);