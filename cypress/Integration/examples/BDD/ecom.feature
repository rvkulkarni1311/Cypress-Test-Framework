Feature: End to end ecom validation

  Scenario: Ecom Products Delivery
    Given I am on Ecom page
    When I login to the application
    When I add items to the cart and checkout
    When validate the total price limit
    Then select the country, submit, and verify Thank you

