describe("Book an appointment (via payment)", () => {
  beforeEach(() => {
    cy.loginAsUser();
    cy.viewport(1280, 900);

    // Visit and wait for appointments page
    cy.visit("/appointments");
    
    // Wait for a key element like a heading or table
    cy.get("[data-test='appointments-heading']", { timeout: 10000 }).should("contain", "My Appointments");
  });

  it("should allow a user to pay for a pending appointment", () => {
    // Find the first appointment row with "Pending" status
    cy.contains("td", "Pending")
      .parents("tr")
      .within(() => {
        cy.contains("button", "Pay Now").click();
      });

    // Payment modal should appear
    cy.get("#pay_modal").should("be.visible");

    // Fill in phone number
    cy.get("#pay_modal input[placeholder='Enter M-Pesa phone number']")
      .clear()
      .type("0712345678");

    // Click the Pay button
    cy.get("#pay_modal").contains("button", "Pay Now").click();

    // Wait for success message
    cy.get("#pay_modal").contains(/STK Push sent|Check your phone|success/i, {
      timeout: 10000,
    }).should("be.visible");
  });
});
