/// <reference types="cypress" />

// Custom command: Select element by data-test attribute
Cypress.Commands.add('getDataTest', (selector: string) => {
  return cy.get(`[data-test="${selector}"]`, { timeout: 10000 }).should('exist');
});

// Command: Login as normal user
Cypress.Commands.add('loginAsUser', (email = 'c3125024@gmail.com', password = '11111111') => {
  cy.visit('/login');

  cy.getDataTest('login-email-input').should('be.visible').type(email);
  cy.getDataTest('login-password-input').should('be.visible').type(password);
  cy.getDataTest('login-submit-button').click();

  // Confirm navigation to user dashboard
  cy.url().should('include', '/user');

  // Wait for dashboard data and ensure it's visible
  cy.intercept('GET', '**/user/dashboard-stats').as('getDashboardStats');
  cy.wait('@getDashboardStats');
  cy.contains('Dashboard Overview', { timeout: 10000 }).scrollIntoView().should('be.visible');
});

// Command: Login as admin user
Cypress.Commands.add('loginAsAdmin', (email = 'admin@example.com', password = 'adminpass') => {
  cy.visit('/login');

  cy.getDataTest('login-email-input').should('be.visible').type(email);
  cy.getDataTest('login-password-input').should('be.visible').type(password);
  cy.getDataTest('login-submit-button').click();

  // Confirm navigation to admin dashboard
  cy.url().should('include', '/admin');

  cy.contains('Admin Dashboard', { timeout: 10000 }).scrollIntoView().should('be.visible');
});

// Type declaration for custom commands
export {};

declare global {
  namespace Cypress {
    interface Chainable {
      getDataTest(selector: string): Chainable<JQuery<HTMLElement>>;
      loginAsUser(email?: string, password?: string): Chainable<void>;
      loginAsAdmin(email?: string, password?: string): Chainable<void>;
    }
  }
}
