class BuzzLikePage {

    // إضافة لايك لأول بوست
    addLikeToFirstPost() {
        // انتظر حتى تظهر البوستات
        cy.get('.orangehrm-buzz-post', { timeout: 10000 }).should('have.length.at.least', 1);

        cy.get('.orangehrm-buzz-post').first().within(() => {
            // انتظر ظهور زر اللايك داخل الفوتر
            cy.get('.orangehrm-buzz-post-footer .orangehrm-buzz-post-actions', { timeout: 10000 })
              .should('be.visible')
              .within(() => {
                  // اضغط على زر اللايك
                  cy.get('.orangehrm-heart-icon').first().click({ force: true });

                  // تحقق من أن اللايك تم
                  cy.get('.orangehrm-heart-icon').first().should('have.class', 'liked');
              });
        });
    }

    // إزالة اللايك من أول بوست
    removeLikeFromFirstPost() {
        cy.get('.orangehrm-buzz-post').first().within(() => {
            cy.get('.orangehrm-buzz-post-footer .orangehrm-buzz-post-actions')
              .within(() => {
                  cy.get('.orangehrm-heart-icon').first().click({ force: true });
              });
        });
    }
}

export default new BuzzLikePage();
