import { faker } from '@faker-js/faker';
import LoginPage from "cypress/support/pages/LoginPage";
import { CREDENTIALS } from "cypress/support/helper/Constant";
import AddEmployee from "cypress/support/pages/PIM/AddEmployee";
import EmployeeManager from 'cypress/support/pages/PIM/emplyeeManger';
const  addNewEmployee=new AddEmployee();

const login = new LoginPage();
const Leave=new  EmployeeManager();

describe('OrangeHRM - Delete by Employee ID if exists then add new employee', () => {

  const employees = [];

  before(() => {
    for (let i = 0; i < 5; i++) {
      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();
      const employeeId = faker.number.int({ min: 1000, max: 9999 }).toString();
      const username = faker.internet.username({ firstName, lastName });
      const password = faker.internet.password({ length: 12 });
      employees.push({ firstName, lastName, employeeId, username, password });
    }
  });

  beforeEach(() => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  });

  it('should delete employee by ID if exists then add new employee', () => {
    cy.loginWithAdmin();
        const emp = employees[0];


    cy.contains('PIM').should('be.visible').click();

    cy.contains('Employee List').click();


      
   

        addNewEmployee.addEmployeeViaApi(emp.firstName,emp.lastName,emp.employeeId);
addNewEmployee.addMultipleEmployees(5);
        Leave.addEmployeeAndAssignLeave();
        Leave.addMultipleEmployees();


  });
});