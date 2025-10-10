import LoginPage from "cypress/support/pages/LoginPage";
<<<<<<< HEAD
import { CREDENTIALS, EMPLOYEE } from "cypress/support/helper/Constant";

const login = new LoginPage();

describe('OrangeHRM - Search by Employee ID, delete if exists then add new employee', () => {
=======
import AddEmployee from "cypress/support/pages/PIM/AddEmployee";
import { CREDENTIALS, EMPLOYEE } from "cypress/support/helper/Constant";

const login = new LoginPage();
const addEmployee = new AddEmployee();

describe('OrangeHRM - Delete second employee then add a new one', () => {
>>>>>>> c0fb6725698cfb274b85ca4619446d7c20bc759c
  beforeEach(() => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  });

<<<<<<< HEAD
  it('should search by Employee ID, delete if exists, then add new employee', () => {
=======
  it('should delete second employee if exists, then add a new employee with login details', () => {
>>>>>>> c0fb6725698cfb274b85ca4619446d7c20bc759c
    login.login(CREDENTIALS.valid.username, CREDENTIALS.valid.password);
    cy.url().should('include', '/dashboard');
    cy.contains('PIM').should('be.visible');

<<<<<<< HEAD
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
=======
    addEmployee.addNewEmployee(
      EMPLOYEE.username,
      EMPLOYEE.password,
      EMPLOYEE.firstName,
      EMPLOYEE.lastName,
      EMPLOYEE.employeeId,
      EMPLOYEE.fullName
    );
>>>>>>> c0fb6725698cfb274b85ca4619446d7c20bc759c
  });
});
