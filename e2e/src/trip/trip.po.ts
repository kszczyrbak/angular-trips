import { browser, by, element } from 'protractor';
import { TripsPage } from '../trips/trips.po';

export class TripPage {

    navigateTo() {
        let tripsPage = new TripsPage();
        tripsPage.navigateTo()
        tripsPage.getDetailLink().click().then(
            _ => browser.sleep(1000)
        )

    }

    getTitleText() {
        return element(by.css('app-root .content span')).getText() as Promise<string>;
    }

    getTitle() {
        return browser.getTitle();
    }

    getCommentsPanel() {
        return element(by.id('comments'))
    }

    getCommentToggleButton() {
        return element(by.id('comment-toggle'))
    }


}
