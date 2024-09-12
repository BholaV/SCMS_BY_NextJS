// cypress/e2e/signin.spec.ts

describe("Sign In Form", () => {
  beforeEach(() => {
    // Visit the sign-in page before each test
    cy.visit("http://localhost:3000/users/sign-in"); // Adjust the path if needed
  });

  it("should display validation errors when fields are empty", () => {
    // Try to submit the form without filling out any fields
    cy.get('[data-testid="submit-button"]').click();

    // Check if validation errors are displayed
    cy.get('[data-testid="email-error"]')
      .should("be.visible")
      .and("contain.text", "Email is required");
    cy.get('[data-testid="password-error"]')
      .should("be.visible")
      .and("contain.text", "Password is required");
  });

  it("should display validation error for invalid email", () => {
    // Fill in invalid email
    cy.get('input[name="email"]').type("invalid-email");
    cy.get('input[name="password"]').type("password123");
    cy.get("form").submit();

    // Check if email validation error is displayed
    cy.get("div").contains("Invalid email address").should("be.visible");
  });

  it("should display validation error for short password", () => {
    // Fill in short password
    cy.get('input[name="email"]').type("rahul@gmail.com");
    cy.get('input[name="password"]').type("short");
    cy.get("form").submit();

    // Check if password validation error is displayed
    cy.get("div")
      .contains("Password must be at least 6 characters")
      .should("be.visible");
  });

  it("should successfully submit the form with valid inputs", () => {
    cy.get('input[name="email"]').type("rahul@gmail.com");
    cy.get('input[name="password"]').type("123456");
    cy.get("form").submit();

    // Check for success alert
    cy.get(".swal2-popup").should("contain.text", "Sign In Successfully..");
    cy.get(".swal2-confirm").click();

    // Verify form fields are cleared
    cy.get('input[name="email"]').should("have.value", "");
    cy.get('input[name="password"]').should("have.value", "");

    // Verify navigation to dashboard
    cy.url().should("include", "/");
  });

  
  it("should navigate to sign-up page when link is clicked", () => {
    // Click the sign-up link
    cy.get('a[href="/users/sign-up"]').click();
    
    // Verify navigation to sign-up page
    cy.url().should("include", "/users/sign-up");
  });

  it("should display error alert Unathorized User", () => {
    cy.get('input[name="email"]').type("rahul@example.com");
    cy.get('input[name="password"]').type("password123");
    cy.get("form").submit();

    cy.get(".swal2-popup").should("contain.text", "Unauthorized user");
    cy.get(".swal2-confirm").click();
  });
});
