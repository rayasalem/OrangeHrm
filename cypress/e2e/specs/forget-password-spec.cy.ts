describe('OrangeHRM - Forgot / Reset Password', () => {
  it('Submit username and verify reset password message', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.contains(/forgot your password/i).click({ force: true });
    cy.get('input[placeholder="Type for hints..."], input[name="username"], input[name="email"]')
      .first()
      .clear()
      .type('rayas.user');
    cy.contains('button', /Reset/i)
      .first()
      .click({ force: true });
    cy.contains('Reset Password link sent successfully').should('be.visible');
    cy.contains('A reset password link has been sent to you via email.').should('be.visible');
    cy.contains('You can follow that link and select a new password.').should('be.visible');
    cy.contains('Note:').should('be.visible');
    cy.contains('If the email does not arrive, please contact your OrangeHRM Administrator.').should('be.visible');
  });
});