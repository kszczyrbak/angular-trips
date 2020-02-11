import { browser, by, element } from 'protractor';
import { LoginPage } from '../login/login.po';
import { TripsPage } from '../trips/trips.po';

export class CartPage {

    navigateTo() {
        let tripsPage = new TripsPage()
        tripsPage.navigateTo()
        tripsPage.getBookBtn().click()
            .then(
                _ => {
                    tripsPage.getCartBtn().click().then(
                        _ => {
                            browser.sleep(500)
                        }
                    )
                }
            )


    }

    getTitleText() {
        return element(by.css('app-root .content span')).getText() as Promise<string>;
    }

    getTitle() {
        return browser.getTitle();
    }

    getBooked() {
        return element.all(by.id('cart-row'))
    }

    getCheckoutButton() {
        return element(by.buttonText('Checkout'))
    }


}
