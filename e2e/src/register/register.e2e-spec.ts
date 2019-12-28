import { browser, logging } from 'protractor';
import { RegisterPage } from './register.po';

describe('register page', () => {
    let page: RegisterPage;

    let validTestName = "Test Name"
    let validPassword = "password"
    let validEmail = "testmail@mail.com"

    beforeEach(() => {
        page = new RegisterPage();
        page.navigateTo();

    });

    it('should display a register form', () => {
        expect(page.getRegisterForm().isDisplayed()).toBe(true)
    })

    it('should allow me to enter a name', () => {
        page.getNameForm().sendKeys(validTestName)
        expect(page.getNameForm().getAttribute('value')).toBe(validTestName);
    });

    it('should display error when not entering a name', () => {
        browser.touchActions()
            .tap(page.getNameForm())
            .tap(page.getPasswordForm())
            .perform().then(
                _ => expect(page.getAlertElement().isDisplayed()).toBe(true)
            )
    })

    it('should allow me to enter an email', () => {
        page.getEmailForm().sendKeys(validEmail)
        expect(page.getEmailForm().getAttribute('value')).toBe(validEmail);
    });

    it('should display error when not entering an email', () => {
        browser.touchActions()
            .tap(page.getEmailForm())
            .tap(page.getPasswordForm())
            .perform().then(
                _ => expect(page.getAlertElement().isDisplayed()).toBe(true)
            )
    })

    it('should allow me to enter a password', () => {
        let testPass = "protractortestpass"
        page.getPasswordForm().sendKeys(testPass)
        expect(page.getPasswordForm().getAttribute('value')).toBe(testPass);
    });

    it('should display error when not entering a password', () => {
        browser.touchActions()
            .tap(page.getPasswordForm())
            .tap(page.getEmailForm())
            .perform().then(
                _ => expect(page.getAlertElement().isDisplayed()).toBe(true)
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
