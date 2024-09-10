// cypress/e2e/signup.spec.ts

describe("Sign Up Form", () => {
  beforeEach(() => {
    // Visit the sign-up page before each test
    cy.visit("http://localhost:3000/users/sign-up"); // Adjust the URL if needed
  });

  it("should display validation errors when fields are empty", () => {
    // Try to submit the form without filling out any fields
    cy.get('[data-testid="submit-button"]').click();

    // Check if validation errors are displayed
    cy.get('[data-testid="username-error"]')
      .should("be.visible")
      .and("contain.text", "Username is required");
    cy.get('[data-testid="email-error"]')
      .should("be.visible")
      .and("contain.text", "Email is required");
    cy.get('[data-testid="password-error"]')
      .should("be.visible")
      .and("contain.text", "Password is required");
  });

  it("should display validation error for invalid email", () => {
    // Fill in invalid email
    cy.get('[data-testid="username-input"]').type("raja");
    cy.get('[data-testid="email-input"]').type("invalid-email");
    cy.get('[data-testid="password-input"]').type("1234556");
    cy.get('[data-testid="submit-button"]').click();

    // Check if email validation error is displayed
    cy.get('[data-testid="email-error"]')
      .should("be.visible")
      .and("contain.text", "Invalid email address");
  });

  it("should display validation error for short password", () => {
    // Fill in short password
    cy.get('[data-testid="username-input"]').type("raja");
    cy.get('[data-testid="email-input"]').type("raja@example.com");
    cy.get('[data-testid="password-input"]').type("short");
    cy.get('[data-testid="submit-button"]').click();

    // Check if password validation error is displayed
    cy.get('[data-testid="password-error"]')
      .should("be.visible")
      .and("contain.text", "Password must be at least 6 characters long");
  });

  it("should successfully submit the form with valid inputs", () => {
    cy.intercept("POST", `${Cypress.env("NEXT_PUBLIC_USER_SIGN_UP")}`, {
        statusCode: 201,
        body: {
            user: {
                username: "raja",
                email: "raja@example.com",
            },
            message: "User created successfully",
        },
    }).as("signUpRequest");

    // Fill in valid data
    cy.get('[data-testid="username-input"]').type("raja");
    cy.get('[data-testid="email-input"]').type("raja@example.com");
    cy.get('[data-testid="password-input"]').type("123456");
    cy.get('[data-testid="submit-button"]').click();

    // Wait for the API response with an increased timeout
    cy.wait("@signUpRequest", { timeout: 10000 }).then(({ response }) => {
        // Log the response for debugging purposes
        cy.log('Response:', response);
        expect(response.statusCode).to.eq(201);
        expect(response.body.message).to.eq("User created successfully");
    });

    // Check for success alert
    cy.get(".swal2-popup").should("be.visible").and("contain.text", "Sign Up Successful");
    cy.get(".swal2-confirm").click();

    // Verify form fields are cleared
    cy.get('[data-testid="username-input"]').should("have.value", "");
    cy.get('[data-testid="email-input"]').should("have.value", "");
    cy.get('[data-testid="password-input"]').should("have.value", "");
});

it("should display error alert on API failure", () => {
    cy.intercept("POST", `${Cypress.env("NEXT_PUBLIC_USER_SIGN_UP")}`, {
        statusCode: 400,
        body: {
            message: "Sign up failed",
        },
    }).as("signUpRequest");

    // Fill in valid data
    cy.get('[data-testid="username-input"]').type("raja");
    cy.get('[data-testid="email-input"]').type("raja@example.com");
    cy.get('[data-testid="password-input"]').type("password123");
    cy.get('[data-testid="submit-button"]').click();

    // Wait for the API response with an increased timeout
    cy.wait("@signUpRequest", { timeout: 10000 }).then(({ response }) => {
        // Log the response for debugging purposes
        cy.log('Response:', response);
        expect(response.statusCode).to.eq(400);
        expect(response.body.message).to.eq("Sign up failed");
    });

    // Check for error alert
    cy.get(".swal2-popup").should("contain.text", "Sign Up Failed");
    cy.get(".swal2-confirm").click();
});


  it("should navigate to sign-in page when link is clicked", () => {
    // Click the sign-in link
    cy.get('a[href="/users/sign-in"]').click();

    // Verify navigation to sign-in page
    cy.url().should("include", "/users/sign-in");
  });
});
