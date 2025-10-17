///<reference types="cypress" />
import Homepage from '../../support/pageObjects/HomePage'
describe('End to end ecommerce', () => {
   //submit the order
   before(function () {
      // runs once before all tests in the block
      cy.fixture('example').then(function (data) {
         this.data = data  //this data is now global and can be used in other places
         this.homepage = new Homepage()
      })
   })
   it('Submit Order', function () {

      const productName = this.data.productName
      cy.visit(Cypress.env('url')+"/loginpagePractise/#/")
      const productpage = this.homepage.login(this.data.username, this.data.password)
      cy.log('Logged in successfully')
      productpage.pageValidation()
      productpage.getCardCount().should('have.length', 4)
      productpage.selectProducts(productName)
      productpage.selectFirstProduct()
      const cartPage = productpage.goToCart()
      cartPage.sumOfProducts().then(function (sum)
      {
         expect(sum).to.be.lessThan(2000000);
      })
      const confirmationPage = cartPage.checkoutItems()
      confirmationPage.submitFormDetails('India')
      confirmationPage.getAlertText().should('contain.text', 'Success! Thank you! Your order will be delivered in next few weeks :-).')

   })
   it('Login Fail', function () {
      cy.visit(Cypress.env('url')+"/loginpagePractise/#/")
      this.homepage.getUserName().type(this.data.username)
      this.homepage.getPassword().type(this.data.password)
      this.homepage.getSignInButton().click()
      this.homepage.getAlertMessage().then(function (element) {
         const actualText = element.text()
         expect(actualText.includes('Incorrect')).to.be.true
      })
   })
   
})