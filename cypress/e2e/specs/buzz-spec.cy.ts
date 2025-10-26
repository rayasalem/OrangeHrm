/* ==== Test Created with Cypress Studio ==== */
it('invalid', function() {
  /* ==== Generated with Cypress Studio ==== */
  cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').clear('s');
  cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').type('sss');
  cy.get(':nth-child(3) > .oxd-input-group > :nth-child(2) > .oxd-input').clear('s');
  cy.get(':nth-child(3) > .oxd-input-group > :nth-child(2) > .oxd-input').type('sss');
  cy.get('.oxd-button').click();
  cy.get('.oxd-alert-content > .oxd-text').should('have.text', 'Invalid credentials');
  
  cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').type('sss');
  cy.get(':nth-child(3) > .oxd-input-group > :nth-child(2) > .oxd-input').clear('s');
  cy.get(':nth-child(3) > .oxd-input-group > :nth-child(2) > .oxd-input').type('sss');
  cy.get('.oxd-button').click();
  /* ==== End Cypress Studio ==== */
});