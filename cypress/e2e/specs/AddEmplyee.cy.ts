import LoginPage from "cypress/support/pages/LoginPage";
import { CREDENTIALS, EMPLOYEE } from "cypress/support/helper/Constant";

const login = new LoginPage();

describe('OrangeHRM - Search by Employee ID, delete if exists then add new employee', () => {
  beforeEach(() => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  });

  it('should search by Employee ID, delete if exists, then add new employee', () => {
    login.login(CREDENTIALS.valid.username, CREDENTIALS.valid.password);
    cy.url().should('include', '/dashboard');
    cy.contains('PIM').should('be.visible');

    cy.contains('PIM').click();
    cy.contains('Employee List').click();

    cy.get('input.oxd-input.oxd-input--active').eq(1).clear().type(EMPLOYEE.employeeId);
    cy.get('button[type="submit"]').filter(':visible').first().click();

    cy.get('div.oxd-table-body').then($body => {
      const rows = $body.find('.oxd-table-row');
      if (rows.length > 0) {
        cy.wrap(rows.eq(0)).find('.oxd-icon.bi-trash').click({ force: true });
        cy.get('button.oxd-button--label-danger').contains('Yes, Delete').click();
        cy.contains('Successfully Deleted').should('be.visible');
      }
    });

    cy.contains('button', 'Add').click();
    cy.get('input[placeholder="First Name"]').type(EMPLOYEE.firstName);
    cy.get('input[placeholder="Last Name"]').type(EMPLOYEE.lastName);
    cy.get('input.oxd-input.oxd-input--active').eq(3).clear().type(EMPLOYEE.employeeId);

    cy.get('input[type="checkbox"]').first().check({ force: true });
    cy.get('.oxd-input[autocomplete="off"]').eq(0).type(EMPLOYEE.username);
    cy.get('.oxd-input[autocomplete="off"]').eq(1).type(EMPLOYEE.password);
    cy.get('.oxd-input[autocomplete="off"]').eq(2).type(EMPLOYEE.password);

    cy.contains('button', 'Save').click();
    cy.contains(`${EMPLOYEE.firstName} ${EMPLOYEE.lastName}`, { timeout: 10000 }).should('be.visible');
  });
});
