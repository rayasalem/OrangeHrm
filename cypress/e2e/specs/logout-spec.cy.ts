describe('OrangeHRM - Logout Test', () => {
  it('Login and then logout', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/dashboard/index');

    cy.get('.oxd-icon.bi-caret-down-fill.oxd-userdropdown-icon').click();
    cy.contains('Logout').click();
    cy.url().should('include', '/auth/login');
  });
});
