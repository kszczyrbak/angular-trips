import { browser, logging } from 'protractor';
import { LoginPage } from './login.po';

describe('login page', () => {
    let page: LoginPage;

    beforeEach(() => {
        page = new LoginPage();
        page.navigateTo();

    });

    it('should display a login form', () => {
        expect(page.getLoginForm().isDisplayed()).toBe(true)
    })

    it('should allow me to enter an email', () => {
        let testMail = "protractor@mail.com"
        page.getEmailForm().sendKeys(testMail)
        expect(page.getEmailForm().getAttribute('value')).toBe(testMail);
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

    it('should allow me to move to register page', () => {
        page.getRegisterBtn().click().then(
            _ => browser.getCurrentUrl().then(
                url => expect(url).toContain("register")
            )
        )
    })

    it('should route me to app after successful login', () => {
        page.loginCorrectly()
        browser.getCurrentUrl().then(
            url => expect(url).toContain("app")
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
