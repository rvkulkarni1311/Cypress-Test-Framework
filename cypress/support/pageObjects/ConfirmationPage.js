class ConfirmationPage {
    submitFormDetails(country) {
       cy.submitFormDetails(country);
    }
    getAlertText() {
        return cy.get('.alert-success')
    }
}
export default ConfirmationPage;