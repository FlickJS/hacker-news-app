describe("Feedback Form", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get('[data-testid="feedback-submit-button"]').click();
  });

  it("should submit feedback form correctly", () => {
    cy.url().should("include", "/feedback");
    cy.get('input[name="name"]').type("John Doe");
    cy.get('input[name="email"]').type("johndoe@example.com");
    cy.get('textarea[name="feedback"]').type("This is a feedback message.");
    cy.get('button[type="submit"]').click();
    cy.contains("Feedback received").should("be.visible");
  });

  it("should show validation errors on invalid form submission", () => {
    cy.get('button[type="submit"]').click();
    cy.contains("Name is required").should("be.visible");
    cy.contains("Email is required").should("be.visible");
    cy.contains("Feedback is required").should("be.visible");
  });

  it("should show error message when submission fails due to network error", () => {
    cy.intercept("POST", "/feedback", {
      forceNetworkError: true,
    }).as("submitFeedback");

    cy.get('input[name="name"]').type("John Doe");
    cy.get('input[name="email"]').type("johndoe@example.com");
    cy.get('textarea[name="feedback"]').type("This is a feedback message.");
    cy.get('button[type="submit"]').click();

    cy.wait("@submitFeedback");
    cy.contains("Error submitting feedback").should("be.visible");
  });
});
