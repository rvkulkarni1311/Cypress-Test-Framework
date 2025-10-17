import ProductPage from '../../support/pageObjects/ProductPage'
class Homepage {
    goTo(url) {
        cy.visit(url)
    }
    login(username, password) {
        cy.get('#username').type(username)
        cy.get('#password').type(password)
        cy.get('#signInBtn').click()
        return new ProductPage()
        
    }
}
export default Homepage;