import { faker } from '@faker-js/faker';

class EmployeeManager {

  addEmployeeAndAssignLeave(leaveType: string = 'CAN - Bereavement', leaveDays: number = 14) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const employeeId = faker.string.alphanumeric(6).toUpperCase();
    const fullName = `${firstName} ${lastName}`;

    return cy.api({
      method: "POST",
      url: "/web/index.php/api/v2/pim/employees",
      body: { firstName, lastName, employeeId },
    }).then((response) => {
      expect(response.status).to.eq(200);
      cy.log(`Employee added via API: ${fullName} (${employeeId})`);

      cy.contains('a.oxd-main-menu-item', 'Leave').click({ force: true });
      cy.contains('Entitlements').click();
      cy.contains('Add Entitlements').click();

      cy.get('input[placeholder="Type for hints..."]', { timeout: 10000 })
        .type(fullName, { delay: 100 });

      cy.get('.oxd-autocomplete-dropdown', { timeout: 10000 })
        .should('be.visible')
        .within(() => {
          cy.get('.oxd-autocomplete-option').contains(fullName).click({ force: true });
        });

      cy.get('.oxd-icon.bi-caret-down-fill.oxd-select-text--arrow', { timeout: 10000 })
        .first()
        .click({ force: true });

      cy.get('.oxd-select-dropdown', { timeout: 10000 }).should('be.visible');
      cy.get('.oxd-select-option', { timeout: 10000 })
        .contains(leaveType)
        .should('be.visible')
        .click({ force: true });

      cy.get('input.oxd-input.oxd-input--active', { timeout: 10000 })
        .eq(1)
        .should('be.visible')
        .clear()
        .type(leaveDays.toString());

      cy.contains('button', 'Save')
        .should('be.visible')
        .click();

      cy.get('button.oxd-button.oxd-button--medium.oxd-button--secondary.orangehrm-button-margin', { timeout: 10000 })
        .contains('Confirm')
        .should('be.visible')
        .click();

      cy.contains('Successfully Saved', { timeout: 10000 }).should('be.visible');
    });
  }

  addMultipleEmployees(count: number = 5, leaveType: string = 'CAN - Bereavement', leaveDays: number = 14) {
    for (let i = 0; i < count; i++) {
      this.addEmployeeAndAssignLeave(leaveType, leaveDays);
    }
  }
}

export default EmployeeManager;
