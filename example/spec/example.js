/**
 * @author: Roman Soltys
 * Date: 16.09.16 11:39
 *
 */
var testsName = "Sample test case";
describe(testsName, function () {

    it("Sample step", function () {
        tests.openNewPage(settings.domain);
        tests.waitForElement(google.lstIb);
    });

    /**Test Rail Integrations*/
    afterEach(function(done){
        tests.takeScreenShotsIfSpecFailed(testsName);
        tests.testRail(done, 1, 'plan', 7, testsName)
    });
});