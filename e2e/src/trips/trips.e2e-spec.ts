import { browser, logging } from 'protractor';
import { O_TRUNC } from 'constants';
import { TripsPage } from './trips.po';

describe('trips page', () => {
    let page: TripsPage;

    beforeEach(() => {
        page = new TripsPage();
        page.navigateTo();
    });

    it('should display title', () => {
        expect(page.getTitle()).toEqual('Wycieczki');
    });

    it("Should display the trips", () => {
        let trips = page.getTripElements()
        console.log(trips.length)
    })

    afterEach(async () => {
        // Assert that there are no errors emitted from the browser
        const logs = await browser.manage().logs().get(logging.Type.BROWSER);
        expect(logs).not.toContain(jasmine.objectContaining({
            level: logging.Level.SEVERE,
        } as logging.Entry));
    });
});
