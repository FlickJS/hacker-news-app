describe("Story page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("should display the correct story details and comments", () => {
    cy.get('[datatest-id="story-element"]', { timeout: 10000 }).first().click();

    cy.url().should("include", "/story/");
    cy.get("h2").should("contain.text", "Hacker news");
    cy.get("h1").should("not.be.empty");
    cy.get("p").contains("🔥 Score:").should("not.be.empty");
    cy.get("p").contains("🧑‍💻 By:").should("not.be.empty");

    cy.get("p")
      .contains("Link to:")
      .find("a")
      .should("have.attr", "href")
      .and("not.be.empty");

    cy.get('[data-testid="comments-list"] > li', { timeout: 10000 }).should(
      "have.length.at.least",
      1
    );
  });
});
