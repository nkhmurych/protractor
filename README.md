Run test protractor tests/protractor/conf.js

Control browser
    browser.get('yoururl');
    browser.navigate().back();
    browser.navigate().forward();
    browser.ignoreSynchronization = true;

Check visibility
    element(by.id('create')).isPresent();
    element(by.id('create')).isEnabled();
    element(by.id('create')).isDisplayed();

Send keystrokes
    element(by.id('user_name').sendKeys('user1');
    sendKeys(protractor.Key.ENTER);
    sendKeys(protractor.Key.TAB);

Find collection of elements
    expect(list.count()).toBe(3);
    expect(list.get(0).getText()).toBe('First');
    expect(list.get(1).getText()).toBe('Second');
    expect(list.first().getText()).toBe('First');
    expect(list.last().getText()).toBe('Last');

    var list = element.all(by.css('.items'));
    var list2 = element.all(by.repeater('personhome.results'));
    var list3 = element.all(by.xpath(/*div*/));
    var dog = element(by.cssContainingText('.pet', 'Dog'));
    var allOptions = element.all(by.options('c c in colors'))

Methods to find elements on web page
    Find elements by Id: browser.driver.findElement(by.id('elem_id'));
    Find elements by name: browser.driver.findElement(by.name('elem_name'));
    Find elements by xpath: browser.driver.findElement(by.xpath('elem_xpath'));
    Find elements by css Selector: browser.driver.findElement(by.css('cssSelector));
    Find elements by css Selector: element(by.css('#myItem'));
    Find elements by css Selector: element(by.css('[ng-click="cancel()"]'));
    Find elements by tag name: browser.driver.findElement(by.tagName('tagName'));
    Find elements by class name:browser.driver.findElement(by.className('class_name'));
    Find elements by model Selector: element(by.model('person.name'));
    Find elements by binding Selector: element(by.binding('person.concatName'));
    Find elements by textarea Selector: element(by.textarea('person.extraDetails'));
    Find elements by input Selector: element(by.input('username'));
    Find elements by buttonText Selector: element(by.buttonText('Save'));
    Find elements by partialButtonText Selector: element(by.partialButtonText('Save'));
    Find elements by linkText Selector: element(by.linkText('Save'));
    Find elements by partialLinkText Selector: element(by.partialLinkText('Save'));

    $('#some-id')                // element(by.id())
    $('.some-class')             // element(by.className())
    $('tag-name')                // element(by.tagName())
    $('[ng-message=required]')   // remember to leave out the double quotes around the value of attribute
    $('#parent #child')          // select one child inside parent
    $('ul li')                   // select all children inside parent
    $('ul li').first()           // select first of children
    $('ul li').last()            // select last of children
    $('ul li').get(index)        // select index-th of children

    elementor https://www.google.com --nonAngular