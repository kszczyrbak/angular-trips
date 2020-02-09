import { browser, by, element } from 'protractor';
import { TripsPage } from '../trips/trips.po';

export class AdminPage {

    navigateTo() {
        let tripsPage = new TripsPage();
        tripsPage.navigateTo();
        return browser.get('app/admin')
    }

    getTitleText() {
        return element(by.css('app-root .content span')).getText() as Promise<string>;
    }

    getTitle() {
        return browser.getTitle();
    }

    getTripsTab() {
        return element(by.id('trips-tab'))
    }

    getAddTripButton() {
        return element(by.buttonText('Add a trip'))
    }


}
