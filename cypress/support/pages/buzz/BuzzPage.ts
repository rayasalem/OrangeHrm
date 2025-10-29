class BuzzPage {
  
  openBuzzPage() {
    cy.contains('Buzz').should('be.visible').click();
  }

  addPost(postText) {
    cy.get('.oxd-buzz-post-input')
      .clear()
      .type(postText);

    cy.get('.oxd-button').contains('Post').click();
    cy.contains('Successfully Saved').should('be.visible');
  }

  verifyLastPost(postText) {
    cy.get('.orangehrm-buzz-post-body-text')
      .first()
      .should('be.visible')
      .and('contain.text', postText);
  }

  deleteAllPostsIfExist() {
    cy.get('body').then(($body) => {
      if ($body.find('.orangehrm-buzz-post-body-text').length > 0) {
        cy.get('.orangehrm-buzz-post').each(() => {
          cy.get('.bi-trash').first().click({ force: true });
          cy.contains('Yes, Delete').click();
          cy.contains('Successfully Deleted').should('be.visible');
        });
      }
    });
  }
}

export default new BuzzPage();
