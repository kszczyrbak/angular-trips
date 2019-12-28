import { browser, by, element } from 'protractor';

export class LoginPage {
    navigateTo() {
        return browser.get('/login');
    }

    getTitle() {
        return browser.getTitle();
    }

    getLoginForm() {
        return element(by.className('login-form'))
    }

    getEmailForm() {
        return element(by.id('emailForm'))
    }

    getPasswordForm() {
        return element(by.id('passwordForm'))
    }

    getLoginBtn() {
        return element(by.id('loginButton'))
    }

    getRegisterBtn() {
        return element(by.id('registerButton'))
    }

    getAlertElement() {
        return element(by.className('alert'))
    }



}
