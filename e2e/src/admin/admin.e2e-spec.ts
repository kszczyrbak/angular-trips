import { browser, logging, element, by } from 'protractor';
import { O_TRUNC } from 'constants';
import { TripPage } from '../trip/trip.po';
import { AdminPage } from './admin.po';

describe('admin page', () => {
    let page: AdminPage

    beforeEach(() => {
        page = new AdminPage();
        page.navigateTo();
    });

    it('should display title', () => {
        expect(page.getTitle()).toEqual('Wycieczki');
    });

    it('should add a trip', () => {
        browser.touchActions()
            .tap(page.getTripsTab())
            .perform()
            .then(
                _ => {
                    expect(element.all(by.id('trip-row')).isDisplayed()).toBeTruthy()
                }
            )

    })

    it('should delete a trip', () => {

    })

    afterEach(async () => {
        // Assert that there are no errors emitted from the browser
        const logs = await browser.manage().logs().get(logging.Type.BROWSER);
        expect(logs).not.toContain(jasmine.objectContaining({
            level: logging.Level.SEVERE,
        } as logging.Entry));
    });
});
