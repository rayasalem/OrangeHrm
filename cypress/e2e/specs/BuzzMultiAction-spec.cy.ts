import AddEmployee from "cypress/support/pages/PIM/AddEmployee";
import BuzzPage from "cypress/support/pages/buzz/BuzzPage";
import BuzzLikePage from "cypress/support/pages/buzz/BuzzLikePage";
import BuzzComment from "cypress/support/pages/buzz/BuzzComment";
import { faker } from "@faker-js/faker";

describe('OrangeHRM - 5 Employees Like & Comment on Same Post', () => {
const addNewEmployee = new AddEmployee();
  const employees = [];
  const adminPost = "Team synergy brings success! 💪🚀";

  it('should add 5 employees via API, post as admin, and let all like & comment', () => {

    cy.loginWithAdmin();
    BuzzPage.openBuzzPage();
    BuzzPage.addPost(adminPost);
    BuzzPage.verifyLastPost(adminPost);

    const employeePromises = [];
    for (let i = 1; i <= 5; i++) {
      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();
      const employeeId = faker.string.alphanumeric(6).toUpperCase();

      const promise = addNewEmployee.addEmployeeViaApi(firstName, lastName, employeeId)
        .then(() => {
          employees.push({
            username: `${firstName}.${lastName}`,
            password: "Emp@12345",
            firstName,
            lastName
          });
        });

      employeePromises.push(promise);
    }

    cy.wrap(Promise.all(employeePromises)).then(() => {
      cy.log("✅ All 5 employees created successfully");

      employees.forEach(emp => {
        cy.log(`👤 Logging in as ${emp.username}`);

        cy.visit('/web/index.php/auth/login');
        cy.get('input[name="username"]').type(emp.username);
        cy.get('input[name="password"]').type(emp.password);
        cy.get('button[type="submit"]').click();

        BuzzPage.openBuzzPage();

        BuzzLikePage.addLikeToFirstPost();
        const commentText = `Great post! - ${emp.firstName}`;
        BuzzComment.addCommentToFirstPost(commentText);

        cy.get('.oxd-userdropdown-tab').click();
        cy.contains('Logout').click();
      });

      cy.loginWithAdmin();
      BuzzPage.openBuzzPage();

      cy.get('.orangehrm-buzz-post').first().within(() => {
        cy.get('.oxd-icon-button').first().invoke('text').then((likesText) => {
          const likesCount = parseInt(likesText);
          expect(likesCount).to.eq(5);
        });
        cy.get('.orangehrm-buzz-comment').should('have.length.at.least', 5);
      });
    });

  });
});
