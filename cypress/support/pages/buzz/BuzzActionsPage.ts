class BuzzActionsPage {

    // إضافة تعليق لأي بوست بحسب index (0 = أول بوست)
    addCommentToPost(index: number, commentText: string) {
        // انتظر حتى تظهر البوستات على الصفحة
        cy.get('.orangehrm-buzz-post', { timeout: 20000 })
          .should('have.length.at.least', 1);

        cy.get('.orangehrm-buzz-post').eq(index).within(() => {
            // اضغط زر التعليق بعد التأكد من ظهوره
            cy.contains('button', 'Comment', { timeout: 10000 })
              .should('be.visible')
              .click({ force: true });

            // اكتب التعليق في textarea
            cy.get('textarea[placeholder="Write your comment..."]', { timeout: 10000 })
              .should('be.visible')
              .clear()
              .type(commentText, { delay: 50 }); // كتابة ببطء لتجنب مشاكل JS

            // اضغط زر Comment لإرسال التعليق
            cy.contains('button', 'Comment', { timeout: 10000 })
              .should('be.visible')
              .click({ force: true });

            // تحقق من ظهور التعليق داخل البوست
            cy.contains(commentText, { timeout: 15000 }).should('exist');
        });
    }

    // إضافة لايك لأي بوست بحسب index
    addLikeToPost(index: number) {
        cy.get('.orangehrm-buzz-post', { timeout: 20000 })
          .should('have.length.at.least', 1);

        cy.get('.orangehrm-buzz-post').eq(index).within(() => {
            cy.get('.orangehrm-heart-icon', { timeout: 10000 })
              .first()
              .should('be.visible')
              .click({ force: true })
              .should('have.class', 'liked'); // تحقق أن اللايك تم
        });
    }

    // إزالة اللايك لأي بوست بحسب index
    removeLikeFromPost(index: number) {
        cy.get('.orangehrm-buzz-post', { timeout: 20000 }).eq(index).within(() => {
            cy.get('.orangehrm-heart-icon', { timeout: 10000 })
              .first()
              .should('be.visible')
              .click({ force: true });
        });
    }

    // إنشاء بوست جديد
    createNewPost(postText: string) {
        cy.get('textarea[placeholder="What\'s on your mind?"]', { timeout: 10000 })
          .should('be.visible')
          .clear()
          .type(postText, { delay: 50 });

        cy.contains('button', 'Post', { timeout: 10000 })
          .should('be.visible')
          .click({ force: true });

        // انتظر حتى يظهر البوست الجديد
        cy.contains(postText, { timeout: 15000 }).should('exist');
    }
}

export default new BuzzActionsPage();
