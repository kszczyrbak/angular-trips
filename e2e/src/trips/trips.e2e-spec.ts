import { browser, logging, by, element } from 'protractor';
import { O_TRUNC } from 'constants';
import { TripsPage } from './trips.po';

describe('trips page', () => {
    let page: TripsPage;

    beforeEach(() => {
        page = new TripsPage();
        page.navigateTo();
        browser.ignoreSynchronization = true
    });

    it('should display title', () => {
        expect(page.getTitle()).toEqual('Wycieczki');
    });

    it("should display the trips", () => {
        browser.getCurrentUrl().then(
            url => {
                expect(url).toContain("app/trips")
                expect(page.getTripElements()).toBeTruthy()
            }
        )

    })

    it('should display data correctly', () => {
        expect(element(by.id('name')).isDisplayed()).toBe(true)
        expect(element(by.id('country')).isDisplayed()).toBe(true)
        expect(element(by.id('price')).isDisplayed()).toBe(true)
        expect(element(by.id('rating')).isDisplayed()).toBe(true)
        expect(element(by.id('seats')).isDisplayed()).toBe(true)
    })

    it("should move to trip details when clicking on a trip", () => {
        browser.touchActions()
            .tap(page.getDetailLink())
            .perform().then(
                _ => browser.getCurrentUrl().then(
                    url => expect(url).toContain('trip/')
                )
            )
    })

    afterEach(async () => {
        // Assert that there are no errors emitted from the browser
        const logs = await browser.manage().logs().get(logging.Type.BROWSER);
        expect(logs).not.toContain(jasmine.objectContaining({
            level: logging.Level.SEVERE,
        } as logging.Entry));
    });
});
