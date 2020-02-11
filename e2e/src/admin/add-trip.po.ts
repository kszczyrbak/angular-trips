import { browser, by, element } from 'protractor';

export class AddTripPage {
    
    correctFillForm() {
        this.getNameForm().sendKeys('ProtractorTestTrip')
        this.getCountryForm().sendKeys('Turcja')
        this.getStartDateForm().sendKeys('12/02/2020')
        this.getEndDateForm().sendKeys('13/02/2020')
        this.getPriceForm().sendKeys('600')
        return this.getMaxSeatsForm().sendKeys('60')
    }

    getNameForm() {
        return element(by.id('nameForm'));
    }

    getCountryForm() {
        return element(by.id('countryForm'));
    }

    getPriceForm() {
        return element(by.id('priceForm'));
    }

    getStartDateForm() {
        return element(by.id('startDateForm'));
    }

    getEndDateForm() {
        return element(by.id('endDateForm'));
    }

    getDescriptionForm() {
        return element(by.id('descriptionForm'));
    }

    getMaxSeatsForm() {
        return element(by.id('maxSeatsForm'));
    }

    getSubmitButton() {
        return element(by.buttonText('Submit'))
    }


}
