import BuzzPage from "cypress/support/pages/buzz/BuzzPage";

describe('OrangeHRM - Add and verify 5 multilingual posts in Buzz', () => {

  it('should add 5 posts with the same meaning in different languages and verify them', () => {
    cy.loginWithAdmin();

    const posts = [
      "Hello everyone! Have a great day! 🌞",
      "مرحباً بالجميع! أتمنى لكم يوماً رائعاً! 🌞",
      "Bonjour à tous ! Passez une excellente journée ! 🌞",
      "¡Hola a todos! ¡Que tengan un gran día! 🌞",
      "Hallo zusammen! Einen schönen Tag noch! 🌞"
    ];

    BuzzPage.openBuzzPage();

    posts.forEach((post) => {
      BuzzPage.addPost(post);
      BuzzPage.verifyLastPost(post);
      cy.wait(1000);
    });
  });
});
