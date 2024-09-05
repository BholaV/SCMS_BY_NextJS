// cypress/e2e/signup.spec.ts

describe('Sign Up Form', () => {
    beforeEach(() => {
      // Visit the sign-up page before each test
      cy.visit('/sign-up'); // Adjust the path if needed
    });
  
    it('should display validation errors when fields are empty', () => {
      // Try to submit the form without filling out any fields
      cy.get('form').submit();
  
      // Check if validation errors are displayed
      cy.get('div').contains('Username is required').should('exist');
      cy.get('div').contains('Email is required').should('exist');
      cy.get('div').contains('Password is required').should('exist');
    });
  
    it('should display validation error for invalid email', () => {
      // Fill in invalid email
      cy.get('input[name="username"]').type('testuser');
      cy.get('input[name="email"]').type('invalid-email');
      cy.get('input[name="password"]').type('password123');
      cy.get('form').submit();
  
      // Check if email validation error is displayed
      cy.get('div').contains('Invalid email address').should('exist');
    });
  
    it('should display validation error for short password', () => {
      // Fill in short password
      cy.get('input[name="username"]').type('testuser');
      cy.get('input[name="email"]').type('testuser@example.com');
      cy.get('input[name="password"]').type('short');
      cy.get('form').submit();
  
      // Check if password validation error is displayed
      cy.get('div').contains('Password must be at least 6 characters long').should('exist');
    });
  
    it('should successfully submit the form with valid inputs', () => {
      // Mock API response for successful sign-up
      cy.intercept('POST', `${process.env.NEXT_PUBLIC_USER_SIGN_UP}`, {
        statusCode: 200,
        body: {
          user: {
            username: 'testuser',
            email: 'testuser@example.com',
          },
        },
      }).as('signUpRequest');
  
      // Fill in valid data
      cy.get('input[name="username"]').type('testuser');
      cy.get('input[name="email"]').type('testuser@example.com');
      cy.get('input[name="password"]').type('password123');
      cy.get('form').submit();
  
      // Wait for the API response
      cy.wait('@signUpRequest');
  
      // Check for success alert
      cy.get('.swal2-popup').should('contain', 'Sign Up Successful');
      cy.get('.swal2-confirm').click();
  
      // Verify form fields are cleared
      cy.get('input[name="username"]').should('have.value', '');
      cy.get('input[name="email"]').should('have.value', '');
      cy.get('input[name="password"]').should('have.value', '');
    });
  
    it('should display error alert on API failure', () => {
      // Mock API response for failed sign-up
      cy.intercept('POST', `${process.env.NEXT_PUBLIC_USER_SIGN_UP}`, {
        statusCode: 400,
        body: {
          message: 'Sign up failed',
        },
      }).as('signUpRequest');
  
      // Fill in valid data
      cy.get('input[name="username"]').type('testuser');
      cy.get('input[name="email"]').type('testuser@example.com');
      cy.get('input[name="password"]').type('password123');
      cy.get('form').submit();
  
      // Wait for the API response
      cy.wait('@signUpRequest');
  
      // Check for error alert
      cy.get('.swal2-popup').should('contain', 'Sign Up Failed');
      cy.get('.swal2-confirm').click();
    });
  
    it('should navigate to sign-in page when link is clicked', () => {
      // Click the sign-in link
      cy.get('a[href="/users/sign-in"]').click();
  
      // Verify navigation to sign-in page
      cy.url().should('include', '/users/sign-in');
    });
  });
  