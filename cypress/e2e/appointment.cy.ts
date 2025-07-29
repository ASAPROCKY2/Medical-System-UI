describe("Appointments functionality", () => {
  beforeEach(() => {
    cy.loginAsUser(); // custom command
    cy.visit("/user");
    cy.viewport(1280, 920);

    // Instead of strict text match, just check if something expected is visible
    cy.contains("Dashboard Overview", { timeout: 5000 }).should("be.visible");
  });

  it("should navigate to appointments page and list appointments", () => {
    cy.get('[data-test="nav-appointments-link"]').click();

    cy.url().should("include", "/appointments");
    cy.contains("My Appointments").should("be.visible");

    // Make sure at least one appointment card exists
    cy.get('[data-test="appointment-card"]').should("exist");

    // Check visible content of the first appointment
    cy.get('[data-test="appointment-card"]').first().within(() => {
      cy.contains(/Pending|Confirmed|Cancelled/);
    });
  });
});
