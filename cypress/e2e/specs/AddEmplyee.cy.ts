import LoginPage from "cypress/support/pages/LoginPage";
import AddEmployee from "cypress/support/pages/PIM/AddEmployee";
import { CREDENTIALS, EMPLOYEE } from "cypress/support/helper/Constant";

const login = new LoginPage();
const addEmployee = new AddEmployee();

describe('OrangeHRM - Delete second employee then add a new one', () => {
  beforeEach(() => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  });

  it('should delete second employee if exists, then add a new employee with login details', () => {
    login.login(CREDENTIALS.valid.username, CREDENTIALS.valid.password);
    cy.url().should('include', '/dashboard');
    cy.contains('PIM').should('be.visible');

    addEmployee.addNewEmployee(
      EMPLOYEE.username,
      EMPLOYEE.password,
      EMPLOYEE.firstName,
      EMPLOYEE.lastName,
      EMPLOYEE.employeeId,
      EMPLOYEE.fullName
    );
  });
});
