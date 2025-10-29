/* ==== Test Created with Cypress Studio ==== */
it('tt', function() {
  /* ==== Generated with Cypress Studio ==== */
  cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').click();
  cy.get('.oxd-sheet > :nth-child(1)').click();
  cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').clear('Admin');
  cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').type('Admin');
  cy.get('.oxd-sheet > :nth-child(2)').click();
  cy.get(':nth-child(3) > .oxd-input-group > :nth-child(2) > .oxd-input').clear('admin123');
  cy.get(':nth-child(3) > .oxd-input-group > :nth-child(2) > .oxd-input').type('admin123');
  cy.get('.oxd-button').click();
  cy.get(':nth-child(12) > .oxd-main-menu-item').click();
  cy.get('.oxd-buzz-post-input').click();
  cy.get('.oxd-buzz-post-slot > .oxd-button').click();
  cy.get(':nth-child(1) > .oxd-sheet > .orangehrm-buzz-post-footer > .orangehrm-buzz-post-actions > div > #heart-svg > #Group > #heart').click();
  cy.get(':nth-child(1) > .oxd-sheet > .orangehrm-buzz-post-footer > .orangehrm-buzz-post-actions > :nth-child(2)').click();
  cy.get(':nth-child(2) > .oxd-input').clear('fg');
  cy.get(':nth-child(2) > .oxd-input').type('fggfggfdfgd{enter}');
  cy.get(':nth-child(2) > .oxd-input').clear('df');
  cy.get(':nth-child(2) > .oxd-input').type('dfddsffsdf{enter}');
  cy.get('.orangehrm-like-animation > #heart-svg').click();
  cy.get(':nth-child(1) > .oxd-sheet > .orangehrm-buzz-post-footer > .orangehrm-buzz-post-actions > div > #heart-svg').click();
  cy.get(':nth-child(3) > .orangehrm-post-comment > .orangehrm-post-comment-area').should('have.text', 'Raneem m name AlmousafggfggfdfgdRead More2025-29-10 01:59 PM');
  /* ==== End Cypress Studio ==== */
});