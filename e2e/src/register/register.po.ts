import { browser, by, element } from 'protractor';

export class RegisterPage {
    navigateTo() {
        return browser.get('/register');
    }

    getTitle() {
        return browser.getTitle();
    }

    getNameForm() {
        return element(by.id('nameForm'))
    }

    getRegisterForm() {
        return element(by.className('register-form'))
    }

    getEmailForm() {
        return element(by.id('emailForm'))
    }

    getPasswordForm() {
        return element(by.id('passwordForm'))
    }

    getConfirmPasswordForm() {
        return element(by.id('confirmPasswordForm'))
    }

    getRegisterBtn() {
        return element(by.buttonText('Register'))
    }

    getAlertElement() {
        return element(by.className('alert'))
    }



}
