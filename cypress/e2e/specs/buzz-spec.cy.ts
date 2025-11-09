import LoginPage from "../../support/pages/LoginPage";
import { BuzzSelectors } from "cypress/support/pages/buzz/BuzzSelectores";

const login = new LoginPage();

describe("Filter and Like Specific Buzz Post", () => {

  const postText = "raya";

  beforeEach(() => {
     cy.loginWithAdmin();

    cy.get(BuzzSelectors.TAB).click();
  });

  it(`Should create, filter, and like the post: "${postText}"`, () => {
    cy.get(BuzzSelectors.POST_CONTAINER, { timeout: 10000 })
      .should("be.visible")
      .click();

    cy.get(BuzzSelectors.POST_INPUT, { timeout: 10000 })
      .should("be.visible")
      .type(postText, { force: true });

    cy.get(BuzzSelectors.POST_SUBMIT).click({ force: true });

    cy.contains(postText, { timeout: 20000 }).should("exist");

    cy.contains(postText)
      .closest(".orangehrm-buzz")
      .as("targetPost");

    cy.get("@targetPost")
      .find("#heart-svg")
      .scrollIntoView()
      .click({ force: true });

    cy.get("@targetPost")
      .find("#heart-svg")
      .should(($svg) => {
        const isActive =
          $svg.hasClass("active") ||
          $svg.css("fill") !== "rgb(204, 204, 204)";
        expect(isActive, "Heart icon should be active or colored").to.be.true;
      });

    cy.get("@targetPost").should("contain.text", postText);
  });
});
