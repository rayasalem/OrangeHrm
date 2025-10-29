import BuzzPage from 'cypress/support/pages/buzz/BuzzPage';
import BuzzLikePage from 'cypress/support/pages/buzz/BuzzLikePage';
import BuzzComment from 'cypress/support/pages/buzz/BuzzComment';

describe('OrangeHRM - Buzz actions (Post, Like, Comment)', () => {

  it('should add a post, like it, and comment on it', () => {
    cy.loginWithAdmin();

    const postText = "Testing Buzz actions 💬👍";
    const commentText = "Nice post! 🚀";

    BuzzPage.openBuzzPage();

    BuzzPage.addPost(postText);
    BuzzPage.verifyLastPost(postText);

    BuzzLikePage.addLikeToFirstPost();

    BuzzComment.addCommentToFirstPost(commentText);
  });
});
