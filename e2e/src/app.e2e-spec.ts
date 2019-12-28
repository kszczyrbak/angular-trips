import { AppPage } from './app.po';
import { browser, logging } from 'protractor';
import { O_TRUNC } from 'constants';

describe('whole app', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    page.navigateTo();
  });

  it('should display title', () => {
    expect(page.getTitle()).toEqual('Wycieczki');
  });

  it('should redirect to login', () => {
    browser.getCurrentUrl().then(
      url => expect(url).toContain('login')
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
