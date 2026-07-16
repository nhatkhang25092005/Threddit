/// <reference types="cypress" />
describe("friend", () => {
  const timeoutApi: number = 300000;

  it("Should delete friend successfully", () => {
    cy.session("session-chicken", () => {
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
    cy.visit("http://localhost:5000/app/profile");
    cy.intercept("GET", "**/api/profile").as("getProfile");
    cy.intercept("DELETE", "**/api/friendship/**").as("deleteFriend");
    cy.wait("@getProfile", { timeout: timeoutApi })
      .its("response.statusCode")
      .should("eq", 200);
    cy.get('[role="tab"]').eq(2).click();
    cy.get('[data-testid = "friend-list"]')
      .should("be.visible")
      .within(() => {
        cy.get("[role='tab']").eq(0).click();
        cy.wait(3000);
        cy.get("[data-testid = 'delete-friend']").click();
      });
    cy.wait("@deleteFriend", { timeout: timeoutApi })
      .its("response.statusCode")
      .should("eq", 200);
    cy.get("[data-testid='snackbar']").should("be.visible");
    cy.get("[data-testid='snackbar']", { timeout: 5000 }).should("not.exist");
  });
});
