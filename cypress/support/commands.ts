/// <reference types="cypress" />
import 'cypress-plugin-api';
import '@testing-library/cypress/add-commands';
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
 Cypress.Commands.add('loginWithAdmin', () => { 
     cy.visit('/');
cy.get('input[name="username"]').type('Admin');
cy.get('input[name="password"]').type('admin123');
cy.get('button[type="submit"]').click();
 cy.url().should('include', '/dashboard');
    cy.contains('PIM').should('be.visible');

  });
Cypress.Commands.add('loginwith', () => {
  cy.visit('/');

  cy.findByPlaceholderText('Username').type('Admin');
  cy.findByPlaceholderText('Password').type('admin123');

  cy.findByRole('button', { name: /login/i }).click();

 // cy.url().should('include', '/dashboard');
cy.findAllByText('Dashboard').first().should('be.visible');

  cy.findByText('PIM').should('be.visible');
});
Cypress.Commands.add('checkLink', (linkText: string, linkHref: string) => {


  cy.findByText(linkText)
    .should('have.attr', 'href', linkHref)
    .and('be.visible');
});


//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
 declare global {
  namespace Cypress {
   interface Chainable {
     loginWithAdmin(): Chainable<void>
     loginwith() :Chainable<void>
     checkLink ():Chainable<void>
    checkLink(linkText: string, linkHref: string): Chainable<Element>;
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
   }
  }
 }