/// <reference types="cypress" />
describe("post deletion", () => {
  beforeEach(() => {
    cy.session("user-session", () => {
      cy.visit("http://localhost:5000/auth");
      cy.get('[data-testid="email-input"]')
        .type("nhatkhang25092005@gmail.com")
        .should("have.value", "nhatkhang25092005@gmail.com");
      cy.get('[data-testid="password-input"]')
        .type("@Minedash13579")
        .should("have.value", "@Minedash13579");
      cy.get('[data-testid="login-submit-btn"]').click();
      cy.url().should("include", "/app/home");
    });
  });

  it("Should delete post successfully", () => {
    cy.intercept("DELETE", "**/api/content/*").as("deletePostRequest");
    cy.visit("http://localhost:5000/app/profile");
    cy.wait(1000);
    cy.get("[data-testid^='post-button-menu-']")
      .first()
      .then(($btn) => {
        const exactTestId = $btn.attr("data-testid");
        cy.wrap($btn).click();
        cy.wait(1000);
        cy.get('[data-testid$=".menu-item-3"]').first().click();
        cy.get('[data-testid="snackbar-loading"]').should("be.visible");

        cy.wait("@deletePostRequest", { timeout: 30000 })
          .its("response.statusCode")
          .should("eq", 200);

        cy.get('[data-testid="snackbar-loading"]').should("not.exist");
        cy.get('[data-testid="snackbar"]').should("be.visible");
        cy.get('[data-testid="snackbar"]', { timeout: 5000 }).should(
          "not.exist",
        );

        // 3. Assert that THIS specific post ID is gone from the DOM
        cy.get(`[data-testid="${exactTestId}"]`).should("not.exist");
      });
  });
});
