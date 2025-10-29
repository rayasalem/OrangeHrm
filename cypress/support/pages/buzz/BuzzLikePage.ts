class BuzzLikePage {

  addLikeToFirstPost() {
    cy.get('.orangehrm-buzz-post')
      .first()
      .within(() => {
        cy.get('.oxd-icon-button') 
          .first()
          .click({ force: true });
      });

cy.get('.oxd-icon-button')
  .first()
  .should('have.class', 'liked');

  }

  removeLikeFromFirstPost() {
    cy.get('.orangehrm-buzz-post')
      .first()
      .within(() => {
        cy.get('.oxd-icon-button')
          .first()
          .click({ force: true });
      });
  }
}

export default new BuzzLikePage();
