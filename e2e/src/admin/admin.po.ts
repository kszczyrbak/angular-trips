import { browser, by, element } from 'protractor';
import { TripsPage } from '../trips/trips.po';
import { AddTripPage } from './add-trip.po';
import { LoginPage } from '../login/login.po';

export class AdminPage {

    navigateTo() {
        let loginPage = new LoginPage()
        loginPage.navigateTo()
        loginPage.loginAsAdmin().then(
            _ => {
                browser.sleep(1000)
                browser.get('/app/admin/trips')
                browser.sleep(1500)
            }
        )

    }


    addTrip() {
        let addPage = new AddTripPage()
        return addPage.correctFillForm().then(
            _ => browser.touchActions()
                .tap(addPage.getSubmitButton())
                .perform()
        )
    }

    getAllTrips() {
        return element.all(by.id('trip-row'))
    }

    getTitleText() {
        return element(by.css('app-root .content span')).getText() as Promise<string>;
    }

    getTitle() {
        return browser.getTitle();
    }

    getTripsTab() {
        return element(by.css('a#trips-tab'))
    }

    getAddTripButton() {
        return element(by.css('button#addTrip'))
    }

    getDeleteButton() {
        return this.getAllTrips().first().element(by.buttonText('Delete'))
    }


}
