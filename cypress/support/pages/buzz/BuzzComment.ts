class BuzzCommentPage {

  // إضافة تعليق لأول بوست في الصفحة
  addCommentToFirstPost(commentText) {
    cy.get('.orangehrm-buzz-post')
      .first()
      .within(() => {
        cy.get('.oxd-input') // حقل إدخال الكومنت
          .should('be.visible')
          .type(commentText);

        cy.contains('Comment').click({ force: true });
      });

    // تحقق من أن الكومنت انضاف فعلاً
    cy.get('.orangehrm-buzz-post')
      .first()
      .within(() => {
        cy.get('.orangehrm-buzz-comment')
          .should('contain.text', commentText);
      });
  }
}

export default new BuzzCommentPage();
