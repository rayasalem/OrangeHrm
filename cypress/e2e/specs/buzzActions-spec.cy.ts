import LoginPage from "../../support/pages/LoginPage";
import { BuzzSelectors } from "cypress/support/pages/buzz/BuzzSelectores";

const login = new LoginPage();
const Posts = require("../../fixtures/post.json");

describe("Buzz Actions", () => {
  beforeEach(() => {
    cy.visit("/web/index.php/auth/login");
    login.login("Admin", "admin123");
    cy.url().should("include", "/dashboard");

    cy.get(BuzzSelectors.TAB).click();
    cy.url().should("include", "/buzz");
  });

  Posts.forEach((item) => {
    it(`Create and Like Buzz Post: ${item.PostNamelang}`, () => {
      cy.intercept("POST", "/web/index.php/api/v2/buzz/posts").as("postCreated");
      cy.intercept("GET", "/web/index.php/api/v2/buzz/feed*").as("feedReload");

      cy.get(BuzzSelectors.POST_CONTAINER, { timeout: 10000 })
        .should("be.visible")
        .click();

      cy.get(BuzzSelectors.POST_INPUT, { timeout: 10000 })
        .should("be.visible")
        .type(item.Puzzpost, { force: true });

      cy.get(BuzzSelectors.POST_SUBMIT).click({ force: true });

      cy.wait("@feedReload", { timeout: 15000 });

      cy.contains(item.Puzzpost, { timeout: 20000 }).should("exist");

      cy.contains(item.Puzzpost)
        .closest("div.orangehrm-buzz")
        .find(".orangehrm-like-button, #heart-svg")
        .scrollIntoView()
        .click({ force: true })
        .should(($el) => {
          const isActive =
            $el.hasClass("active") ||
            $el.css("fill") !== "rgb(204, 204, 204)";
          expect(isActive, "Like button or heart icon should be active").to.be.true;
        });
    });
  });
});
