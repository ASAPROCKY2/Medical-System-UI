// cypress/e2e/multi-page.cy.js

describe("Multi-page navigation via Navbar", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.viewport(1280, 720);
  });

  it("should navigate through Home, About, Dashboard (unauthenticated), Login, and Register pages", () => {
    // Home
    cy.location("pathname").should("eq", "/");
    cy.get('[data-testid="nav-home"]')
      .should("exist")
      .should("be.visible");

    // About
    cy.get('[data-testid="nav-about"]')
      .should("exist")
      .should("be.visible")
      .click({ force: true }); // force in case of animation delays
    cy.location("pathname").should("eq", "/about");
    cy.contains(/About/i).should("be.visible");

    // Dashboard (should redirect to login if unauthenticated)
    cy.get('[data-testid="nav-dashboard"]')
      .should("exist")
      .should("be.visible")
      .click({ force: true });
    cy.location("pathname").should("eq", "/login");
    cy.contains(/Login/i).should("be.visible");

    // Login
    cy.get('[data-testid="nav-login"]')
      .should("exist")
      .should("be.visible")
      .click({ force: true });
    cy.location("pathname").should("eq", "/login");
    cy.contains(/Login/i).should("be.visible");

    // Register
    cy.get('[data-testid="nav-register"]')
      .should("exist")
      .should("be.visible")
      .click({ force: true });
    cy.location("pathname").should("eq", "/register");
    cy.contains(/Register/i).should("be.visible");
  });
});
