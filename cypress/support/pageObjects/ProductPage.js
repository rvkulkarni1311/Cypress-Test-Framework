import CartPage from "./CartPage";
class ProductPage {
    pageValidation() {
        cy.contains('Shop Name').should('be.visible')

    }
    getCardCount() {
       return cy.get('app-card')
    }
    selectProducts(productName) {
        cy.get('app-card').filter(`:contains("${productName}")`)
            .then($element => {
                cy.wrap($element).contains('button', 'Add').click()
                cy.wrap($element).should('have.length', 1)

            })
    }
    selectFirstProduct() {
        cy.get('app-card').eq(0).contains('Add').click()
    }
    goToCart() {
        cy.contains('a', 'Checkout').click()
        return new CartPage()
    }

}
export default ProductPage;