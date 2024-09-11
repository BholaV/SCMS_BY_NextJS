describe("Sign Up Form", () => {
  beforeEach(() => {
    // Visit the sign-up page before each test
    cy.visit("http://localhost:3000/users/sign-up"); // Adjust the URL if needed
  });

  it("should display validation errors when fields are empty", () => {
    // Try to submit the form without filling out any fields
    cy.get('[data-testid="submit-button"]').click();

    // Check if validation errors are displayed
    cy.get('[data-testid="username-error"]').should("be.visible");
    cy.get('[data-testid="email-error"]').should("be.visible");
    cy.get('[data-testid="password-error"]').should("be.visible");
  });

  it("should display validation error for invalid email", () => {
    // Fill in invalid email
    cy.get('[data-testid="username-input"]').type("ro");
    cy.get('[data-testid="email-input"]').type("invalid-email");
    cy.get('[data-testid="password-input"]').type("1234556");
    cy.get('[data-testid="submit-button"]').click();

    // Check if email validation error is displayed
    cy.get('[data-testid="email-error"]').should("be.visible");
  });

  it("should display validation error for short password", () => {
    // Fill in short password
    cy.get('[data-testid="username-input"]').type("ro");
    cy.get('[data-testid="email-input"]').type("ro@example.com");
    cy.get('[data-testid="password-input"]').type("short");
    cy.get('[data-testid="submit-button"]').click();

    // Check if password validation error is displayed
    cy.get('[data-testid="password-error"]').should("be.visible");
  });

  it("should successfully submit the form with valid inputs", () => {
    cy.get('[data-testid="username-input"]').type("abcd");
    cy.get('[data-testid="email-input"]').type(`ro${Date.now()}@example.com`);
    cy.get('[data-testid="password-input"]').type("123456");
    cy.get('[data-testid="submit-button"]').click();

    // Check for success alert
    cy.get(".swal2-popup")
      .should("be.visible")
      .and("contain.text", "Sign Up Successfully");
    cy.get(".swal2-confirm").click();

    cy.wait(2000);

    // Verify form fields are cleared
    cy.get('[data-testid="username-input"]').should("have.value", "");
    cy.get('[data-testid="email-input"]').should("have.value", "");
    cy.get('[data-testid="password-input"]').should("have.value", "");
  });

  it("should display error alert for exiting User", () => {
    //   // Fill in valid data
    cy.get('[data-testid="username-input"]').type("ro");
    cy.get('[data-testid="email-input"]').type("ro@example.com");
    cy.get('[data-testid="password-input"]').type("password123");
    cy.get('[data-testid="submit-button"]').click();

    cy.get(".swal2-popup").should("contain.text", "User already exists");
    cy.get(".swal2-confirm").click();
  });

  it("should navigate to sign-in page when link is clicked", () => {
    // Click the sign-in link
    cy.get('a[href="/users/sign-in"]').click();

    // Verify navigation to sign-in page
    cy.url().should("include", "/users/sign-in");
  });
});
