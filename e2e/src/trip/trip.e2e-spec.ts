import { browser, logging, element, by } from 'protractor';
import { O_TRUNC } from 'constants';
import { TripPage } from './trip.po';

describe('trip detail page', () => {
    let page: TripPage

    beforeEach(() => {
        page = new TripPage();
        page.navigateTo();
    });

    it('should display title', () => {
        expect(page.getTitle()).toEqual('Wycieczki');
    });

    it('should display details correctly', () => {
        expect(element(by.id('name')).isDisplayed()).toBe(true)
        expect(element(by.id('country')).isDisplayed()).toBe(true)
        expect(element(by.id('price')).isDisplayed()).toBe(true)
        expect(element(by.id('rating')).isDisplayed()).toBe(true)
        expect(element(by.id('description')).isDisplayed()).toBe(true)
        expect(element(by.id('seats')).isDisplayed()).toBe(true)
    })

    it('should hide comments by default', () => {
        expect(page.getCommentsPanel().isDisplayed()).toBe(false)
    })

    it('should display comments after pressing the button', () => {
        browser.touchActions()
            .tap(page.getCommentToggleButton())
            .perform().then(
                _ => expect(page.getCommentsPanel().isDisplayed()).toBe(true)
            )
    })

    it('should hide comments after pressing the hide button', () => {
        browser.touchActions()
            .tap(page.getCommentToggleButton())
            .tap(page.getCommentToggleButton())
            .perform().then(
                _ => expect(page.getCommentsPanel().isDisplayed()).toBe(false)
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
