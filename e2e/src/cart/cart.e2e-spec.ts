import { browser, logging, element, by } from 'protractor';
import { O_TRUNC } from 'constants';
import { CartPage } from './cart.po';

describe('cart page', () => {
    let page: CartPage

    beforeEach(() => {
        page = new CartPage();
        page.navigateTo();
    });

    it('should display title', () => {
        expect(page.getTitle()).toEqual('Wycieczki');
    });

    it('should display booked trips', () => {
        expect(page.getBooked().count()).toBeGreaterThan(0)
    })

    it('should checkout properly', () => {
        expect(page.getBooked().count()).toBeGreaterThan(0)

        page.getCheckoutButton().click().then(
            _ => {
                browser.sleep(500)
                expect(page.getBooked().count()).toEqual(0)
            }
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
