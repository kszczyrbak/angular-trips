import { browser, by, element } from 'protractor';
import { LoginPage } from '../login/login.po';

export class TripsPage {

    navigateTo() {
        let loginPage = new LoginPage()
        loginPage.navigateTo()
        loginPage.loginCorrectly()
        browser.get("/app/trips")
        browser.sleep(1000)
    }

    getTitleText() {
        return element(by.css('app-root .content span')).getText() as Promise<string>;
    }

    getTitle() {
        return browser.getTitle();
    }

    getTripElements() {
        return element.all(by.id('trip'))
    }

    getDetailLink() {
        return element.all(by.id('trip')).first().element(by.id('toDetails'))
    }


}
