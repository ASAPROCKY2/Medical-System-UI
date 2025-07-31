/// <reference types="cypress" />

describe("Book an appointment (via payment)", () => {
  beforeEach(() => {
    // Log in as normal user
    cy.loginAsUser();
    cy.viewport(1280, 900);

    // Visit the appointments page
    cy.visit("/appointments");

    // Confirm the appointments page loaded
    cy.get("[data-test='appointments-heading']", { timeout: 10000 })
      .should("be.visible")
      .and("contain", "My Appointments");
  });

  it("should allow a user to pay for a pending appointment", () => {
    // Locate the first 'Pending' appointment row and click 'Pay Now'
    cy.get("table")
      .contains("td", "Pending")
      .parents("tr")
      .within(() => {
        cy.contains("button", "Pay Now").click();
      });

    // Ensure the payment modal appears
    cy.get("#pay_modal").should("be.visible");

    // Enter phone number
    cy.get("#pay_modal input[placeholder='Enter M-Pesa phone number']")
      .should("be.visible")
      .clear()
      .type("0712345678");

    // Submit payment
    cy.get("#pay_modal").contains("button", "Pay Now").click();

    // Verify success message appears
    cy.get("#pay_modal")
      .contains(/STK Push sent|Check your phone|success/i, {
        timeout: 10000,
      })
      .should("be.visible");
  });
});
