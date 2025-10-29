import BuzzActionsPage from "cypress/support/pages/buzz/BuzzActionsPage";
import BuzzPage from "cypress/support/pages/buzz/BuzzPage";
describe('OrangeHRM - Buzz Actions', () => {

  it('should create post, add comment, like and remove like', () => {
    cy.loginWithAdmin(); // تسجيل الدخول
 BuzzPage.openBuzzPage();
    const postText = "Hello everyone! Have a great day! 🌞";
    const commentText = "Nice post! 👍";

    // إنشاء بوست جديد
    BuzzActionsPage.createNewPost(postText);

    // إضافة تعليق لأول بوست (index = 0)
    BuzzActionsPage.addCommentToPost(0, commentText);

    // إضافة لايك لأول بوست
    BuzzActionsPage.addLikeToPost(0);

    // إزالة اللايك لأول بوست
    BuzzActionsPage.removeLikeFromPost(0);
  });
});
