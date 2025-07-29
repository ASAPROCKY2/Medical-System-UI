describe("signup tests", () => {
  beforeEach(() => {
    cy.visit("/register");
    cy.viewport(1280, 920);
  });

  it("should signup with valid credentials", () => {
    cy.intercept("POST", "**/auth/register", {
      statusCode: 201,
      body: {
        message: "Registration successful! Please check your email to verify your account.",
        user: {
          id: 123,
          firstName: "TestUser",
          lastName: "AdminTester",
          email: "kemboi.brian@teach2give.com",
          role: "user",
          isVerified: false,
        },
      },
    }).as("signup");

    cy.get("[data-testid=signup-firstname]").type("TestUser");
    cy.get("[data-testid=signup-lastname]").type("AdminTester");
    cy.get("[data-testid=signup-email]").type("kemboi.brian@teach2give.com");
    cy.get("[data-testid=signup-password]").type("mypass123");
    cy.get("[data-testid=signup-confirmpassword]").type("mypass123");
    cy.get("[data-testid=signup-submitbtn]").click();

    cy.wait("@signup").then((interception) => {
      expect(interception.response.statusCode).to.eq(201);
      expect(interception.request.body).to.deep.include({
        firstName: "TestUser",
        lastName: "AdminTester",
        email: "kemboi.brian@teach2give.com",
        password: "mypass123",
        confirmPassword: "mypass123",
      });
    });

    cy.contains(/Registration successful/i);
    cy.url({ timeout: 10000 }).should("include", "/auth/verify");
  });

  it("should show validation errors for empty fields", () => {
    cy.get("[data-testid=signup-submitbtn]").click();
    cy.contains(/First name is required/i);
    cy.contains(/Last name is required/i);
    cy.contains(/Email is required/i);
    cy.contains(/Password is required/i);
    cy.contains(/Confirm your password/i);
  });

  it("should show error if passwords do not match", () => {
    cy.get("[data-testid=signup-firstname]").type("TestUser");
    cy.get("[data-testid=signup-lastname]").type("AdminTester");
    cy.get("[data-testid=signup-email]").type("kemboi.brian@teach2give.com");
    cy.get("[data-testid=signup-password]").type("mypass123");
    cy.get("[data-testid=signup-confirmpassword]").type("wrongpass");
    cy.get("[data-testid=signup-submitbtn]").click();
    cy.contains(/Passwords must match/i);
  });

  it("should show error for invalid email format", () => {
    cy.get("[data-testid=signup-firstname]").type("TestUser");
    cy.get("[data-testid=signup-lastname]").type("AdminTester");
    cy.get("[data-testid=signup-email]").type("invalidemail"); 
    cy.get("[data-testid=signup-password]").type("mypass123");
    cy.get("[data-testid=signup-confirmpassword]").type("mypass123");
    cy.get("[data-testid=signup-submitbtn]").click();

    cy.contains(/Enter a valid email/i);
  });

  it("should show API error if email already exists", () => {
    cy.intercept("POST", "**/auth/register", {
      statusCode: 400,
      body: {
        message: "Email already exists",
      },
    }).as("signupError");

    cy.get("[data-testid=signup-firstname]").type("TestUser");
    cy.get("[data-testid=signup-lastname]").type("AdminTester");
    cy.get("[data-testid=signup-email]").type("existinguser@example.com");
    cy.get("[data-testid=signup-password]").type("mypass123");
    cy.get("[data-testid=signup-confirmpassword]").type("mypass123");
    cy.get("[data-testid=signup-submitbtn]").click();

    cy.wait("@signupError");
    cy.contains(/Email already exists/i);
  });
});
