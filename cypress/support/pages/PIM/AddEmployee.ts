
import { faker } from '@faker-js/faker';
class AddEmployee {
  elements = {
    searchSide: {
      searchInput: () => cy.get('input[placeholder="Type for hints..."]').first(),
      searchButton: () => cy.get('button[type="submit"]').filter(':visible').first(),
      tableBody: () => cy.get('div.oxd-table-body'),
      secondRowTrashIcon: () => cy.get('.oxd-table-row').eq(1).find('.oxd-icon.bi-trash'),
      confirmDeleteBtn: () => cy.get('button.oxd-button--label-danger').contains('Yes, Delete'),
    },
    addSide: {
      addButton: () => cy.contains('button', 'Add'),
      firstNameInput: () => cy.get('input[placeholder="First Name"]'),
      lastNameInput: () => cy.get('input[placeholder="Last Name"]'),
      employeeIdInput: () => cy.get('input.oxd-input.oxd-input--active').eq(3),
      createLoginDetailsCheckbox: () => cy.get('input[type="checkbox"]').first(),
      usernameInput: () => cy.get('.oxd-input[autocomplete="off"]').eq(0),
      passwordInput: () => cy.get('.oxd-input[autocomplete="off"]').eq(1),
      confirmPasswordInput: () => cy.get('.oxd-input[autocomplete="off"]').eq(2),
      saveButton: () => cy.contains('button', 'Save'),
      employeeFullNameLabel: (fullName: string) => cy.contains(fullName, { timeout: 10000 }),
    },
  };

 addNewEmployee(
  firstName: string,
  lastName: string,
  employeeId: string
) {
  cy.contains('PIM').click();
  cy.contains('Employee List').click();

  cy.get('input.oxd-input.oxd-input--active').eq(1).clear().type(employeeId);
  cy.get('button[type="submit"]').filter(':visible').first().click();

  function deleteRow(index: number) {
    if (index >= 3) return;
    cy.get('div.oxd-table-body').then($body => {
      const rows = $body.find('.oxd-table-row');
      if (rows.length === 0) return;
      if (index >= rows.length) return;

      cy.wrap(rows.eq(index)).within(() => {
        cy.get('.oxd-icon.bi-trash').click({ force: true });
      });

      cy.get('button.oxd-button--label-danger').contains('Yes, Delete').click();
      cy.contains('Successfully Deleted').should('be.visible');
      cy.wait(1000);
      deleteRow(index);
    });
  }

  deleteRow(0);

  this.elements.addSide.addButton().click();

  this.elements.addSide.firstNameInput().type(firstName);
  this.elements.addSide.lastNameInput().type(lastName);
  this.elements.addSide.employeeIdInput().clear().type(employeeId);

  this.elements.addSide.saveButton().click();

  this.elements.addSide.employeeFullNameLabel(`${firstName} ${lastName}`).should('be.visible');
}

  addEmployeeViaApi(firstName, lastName, employeeId) {
    return cy.api({
      method: "POST",
      url: "/web/index.php/api/v2/pim/employees",
      body: { firstName, lastName, employeeId },
    }).then((response) => {
      expect(response.status).to.eq(200);

      const empNumber = response.body.data.empNumber;
      cy.log(` Employee added successfully via API`);
      cy.log(`Name: ${firstName} ${lastName}`);
      cy.log(`Employee ID: ${employeeId}`);
      cy.log(`empNumber: ${empNumber}`);

     
      return this.deleteEmployeeViaApi(empNumber);
    });
  }

  deleteEmployeeViaApi(empNumber) {
    return cy.api({
      method: "DELETE",
      url: `/web/index.php/api/v2/pim/employees`,
      body: { ids: [empNumber] },
    }).then((response) => {
      expect(response.status).to.eq(200);
      cy.log(" Employee deleted successfully via API");
    });
  }
  
addMultipleEmployees(count: number) {
  for (let i = 1; i <= count; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const employeeId = faker.string.alphanumeric(6).toUpperCase();

    this.addEmployeeViaApi(firstName, lastName, employeeId);

  }
}


  
}


export default AddEmployee;