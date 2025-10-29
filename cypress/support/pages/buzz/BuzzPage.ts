class BuzzPage {

  openBuzzPage() {
    cy.contains('Buzz', { timeout: 10000 }).should('be.visible').click();
  }

  deleteAllPostsIfExist() {
    cy.get('body').then(($body) => {
      if ($body.find('.orangehrm-buzz-post-header').length > 0) {
        cy.get('.orangehrm-buzz-post-header').each(() => {
          cy.get('.bi-trash').first().click({ force: true });
          cy.contains('Yes, Delete').click();
          cy.contains('Successfully Deleted', { timeout: 10000 }).should('be.visible');
        });
      } else {
        cy.log('No posts found to delete');
      }
    });
  }

  addPost(postText: string) {
    cy.get('.oxd-buzz-post-input', { timeout: 15000 })
      .should('be.visible')
      .clear()
      .type(postText);

    cy.get('.oxd-button').contains('Post').click();

    // ✅ انتظر حتى تظهر رسالة الحفظ
    cy.contains('Successfully Saved', { timeout: 15000 }).should('be.visible');

    // ✅ انتظر قليلاً بعد الحفظ حتى يظهر البوست الجديد فعلياً
    cy.wait(2000);
  }

  verifyLastPost(postText: string) {
    // ✅ تحقق من أن أول منشور (الأحدث) يحتوي على النص المطلوب
    cy.get('.orangehrm-buzz-post-body-text', { timeout: 15000 })
      .first()
      .should('be.visible')
      .invoke('text')
      .then((text) => {
        const cleaned = text.trim();
        expect(cleaned).to.include(postText);
      });
  }

  createNewPost(postText: string) {
    this.openBuzzPage();
    this.deleteAllPostsIfExist();
    this.addPost(postText);
    this.verifyLastPost(postText);
  }
}

export default new BuzzPage();
