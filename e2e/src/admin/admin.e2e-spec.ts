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

    it('should display trips', () => {
        expect(page.getAllTrips().count()).toBeGreaterThanOrEqual(0)
    })

    it('should display add trip button', () => {
        expect(page.getAddTripButton().isDisplayed()).toBe(true)
    })

    it('should add a trip', () => {
        let noTrips = 0
        page.getAllTrips().count().then(
            count => noTrips = count
        )

        browser.touchActions()
            .tap(
                page.getAddTripButton()
            ).perform().then(
                _ => page.addTrip().then(
                    _ => {
                        browser.sleep(1500)
                        page.getAllTrips().count().then(
                            newCount => expect(newCount).toBeGreaterThan(noTrips)
                        )
                    }

                )
            )
    })

    // it('should delete a trip', () => {
    //     let noTrips = 0
    //     page.getAllTrips().count().then(
    //         count => noTrips = count
    //     )

    //     browser.touchActions()
    //         .tap(page.getDeleteButton())
    //         .perform().then(
    //             _ => {
    //                 browser.sleep(3000)
    //                 page.getAllTrips().count().then(
    //                     newCount => expect(newCount).toBeLessThan(noTrips)
    //                 )
    //             }
    //         )

    // })

    afterEach(async () => {
        // Assert that there are no errors emitted from the browser
        const logs = await browser.manage().logs().get(logging.Type.BROWSER);
        expect(logs).not.toContain(jasmine.objectContaining({
            level: logging.Level.SEVERE,
        } as logging.Entry));
    });
});
