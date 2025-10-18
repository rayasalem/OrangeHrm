// pages/VacationPage.ts
class VacationPage {
  assignLeave(fullName: string, leaveType: string = 'CAN - Vacation', leaveDays: number = 10) {
    cy.contains('Leave').click();
    cy.contains('Entitlements').click();
    cy.contains('Add Entitlements').click();

    cy.get('input[placeholder="Type for hints..."]').clear().type(fullName);
    cy.get('.oxd-autocomplete-option').first().click({ force: true });

    cy.get('.oxd-select-text-input').first().click({ force: true });
    cy.get('.oxd-select-text-input').first().type(`${leaveType}{enter}`);

    cy.get('input.oxd-input.oxd-input--active[type="number"]').clear().type(leaveDays.toString());

    cy.contains('button', 'Save').click();
    cy.contains('.oxd-toast', 'Successfully Saved', { timeout: 10000 }).should('be.visible');
  }

  applyLeave(fullName: string, leaveType: string = 'CAN - Vacation') {
    cy.contains('Leave').click();
    cy.contains('Apply').click();

    cy.get('.oxd-select-text-input').first().click({ force: true });
    cy.get('.oxd-select-text-input').first().type(`${leaveType}{enter}`);

    // اختيار تاريخ البداية والنهاية بشكل عشوائي
    cy.get('input[placeholder="yyyy-mm-dd"]').first().click();
    cy.get('div[role="option"]').eq(1).click();
    cy.get('input[placeholder="yyyy-mm-dd"]').last().click();
    cy.get('div[role="option"]').eq(2).click();

    cy.get('textarea').type('Automated leave request');
    cy.contains('button', 'Submit').click();
    cy.contains('.oxd-toast', 'Successfully Saved', { timeout: 10000 }).should('be.visible');
  }
}

export default VacationPage;
