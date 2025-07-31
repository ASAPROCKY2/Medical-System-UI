/// <reference types="cypress" />

// Custom command to select elements by data-test attribute
Cypress.Commands.add('getDataTest', (dataTestSelector: string) => {
  return cy.get(`[data-test="${dataTestSelector}"]`);
});

// Login as normal user
Cypress.Commands.add(
  'loginAsUser',
  (email: string = 'c3125024@gmail.com', password: string = '11111111') => {
    cy.visit('/login');
    cy.get('[data-test="login-email-input"]').type(email);
    cy.get('[data-test="login-password-input"]').type(password);
    cy.get('[data-test="login-submit-button"]').click();

    cy.url().should('include', '/user');

    // Confirm dashboard is loaded
    cy.contains('Dashboard Overview', { timeout: 8000 })
      .scrollIntoView()
      .should('be.visible');
  }
);

// Login as admin user
Cypress.Commands.add(
  'loginAsAdmin',
  (email: string = 'admin@example.com', password: string = 'adminpass') => {
    cy.visit('/login');
    cy.get('[data-test="login-email-input"]').type(email);
    cy.get('[data-test="login-password-input"]').type(password);
    cy.get('[data-test="login-submit-button"]').click();

    cy.url().should('include', '/admin');
    cy.contains('Admin Dashboard', { timeout: 8000 })
      .scrollIntoView()
      .should('be.visible');
  }
);

export {};

declare global {
  namespace Cypress {
    interface Chainable {
      getDataTest(value: string): Chainable<JQuery<HTMLElement>>;
      loginAsUser(email?: string, password?: string): Chainable<void>;
      loginAsAdmin(email?: string, password?: string): Chainable<void>;
    }
  }
}
