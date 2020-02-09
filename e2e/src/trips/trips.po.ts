import { browser, by, element } from 'protractor';

export class TripsPage {
    navigateTo() {
        return browser.get('/app/trips');
    }

    getTitleText() {
        return element(by.css('app-root .content span')).getText() as Promise<string>;
    }

    getTitle() {
        return browser.getTitle();
    }

    getTripElements() {
        return element.all(by.tagName('app-trip'))
    }

}
