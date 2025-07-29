describe('Login Functionality', () => {
  beforeEach(() => {
    cy.visit('/login');
    cy.viewport(1280, 920);
  });

  it('should render login form properly', () => {
    cy.contains(/Login to Your Account/i).should('be.visible');
    cy.get('input#email').should('exist');
    cy.get('input#password').should('exist');
    cy.get('button[type="submit"]').should('contain', 'Login');
  });

  // it('should show validation errors for empty fields', () => {
  //   cy.get('button[type="submit"]').click();

  //   // Wait for both validation messages to appear
  //   cy.contains('Email is required', { timeout: 5000 }).should('be.visible');
  //   cy.contains('Password is required', { timeout: 5000 }).should('be.visible');
  // });

  it('should show validation error for invalid email', () => {
    cy.get('input#email').type('invalidemail');
    cy.get('input#password').type('12345678');
    cy.get('button[type="submit"]').click();

    cy.contains('Invalid email', { timeout: 5000 }).should('be.visible');
  });

  it('should login with valid credentials and redirect based on role', () => {
    cy.intercept('POST', '**/login', {
      statusCode: 200,
      body: {
        token: 'mocked_token',
        user: {
          user_id: '123',
          firstname: 'John',
          lastname: 'Doe',
          email: 'john@example.com',
          role: 'user',
          image_url: 'https://example.com/avatar.jpg',
          doctor_id: null,
        },
      },
    }).as('loginRequest');

    cy.get('input#email').type('john@example.com');
    cy.get('input#password').type('password123');
    cy.get('button[type="submit"]').click();

    cy.wait('@loginRequest');
    cy.url().should('include', '/user');
    cy.contains('Login successful!').should('exist');
  });

  it('should show error toast on failed login', () => {
    cy.intercept('POST', '**/login', {
      statusCode: 401,
      body: { message: 'Invalid credentials' },
    }).as('failedLogin');

    cy.get('input#email').type('wrong@example.com');
    cy.get('input#password').type('wrongpassword');
    cy.get('button[type="submit"]').click();

    cy.wait('@failedLogin');
    cy.contains('Login failed. Please check your credentials.').should('be.visible');
  });
});
