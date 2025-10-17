beforeEach(function () {
    // runs once before all tests in the block
    cy.fixture('example').then(function (data) {
       this.data = data  //this data is now global and can be used in other places
    })
 })