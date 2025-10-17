import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import Homepage from "../../../../support/pageObjects/HomePage";
/*import ProductPage from "../../../../support/pageObjects/ProductPage";
import CartPage from "../../../../support/pageObjects/CartPage";
import ConfirmationPage from "../../../../support/pageObjects/ConfirmationPage";*/

const homepage = new Homepage();

Given('I am on Ecom page', function () {
    homepage.goTo(Cypress.env('url') + "/loginpagePractise/#/");
});

When('I login to the application', function () {
    this.productPage = homepage.login(this.data.username, this.data.password);
    cy.log('Logged in successfully');
    this.productPage.pageValidation();
    this.productPage.getCardCount().should('have.length', 4);
});

When('I add items to the cart and checkout', function () {
    this.productPage.selectProducts(this.data.productName);
    this.productPage.selectFirstProduct();
    this.cartPage = this.productPage.goToCart();
});

When('validate the total price limit', function () {
    this.cartPage.sumOfProducts().then((sum) => {
        expect(sum).to.be.lessThan(2000000);
    });
});

Then('select the country, submit, and verify Thank you', function () {
    this.confirmationPage = this.cartPage.checkoutItems();
    this.confirmationPage.submitFormDetails('India');
    this.confirmationPage.getAlertText().should(
        'contain.text',
        'Success! Thank you! Your order will be delivered in next few weeks :-).'
    );
});
