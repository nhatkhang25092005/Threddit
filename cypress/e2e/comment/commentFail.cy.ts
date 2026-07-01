/// <reference types="cypress" />

describe("commentFail", () => {
  const comment: string = `cc (at ${new Date().toLocaleString()})`;
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

  it("It should create a comment successfully", () => {
    // visit the profile page
    cy.visit("http://localhost:5000/app/profile");
    cy.intercept("POST", "**/api/content/**/comment").as("createComment");
    cy.wait(3000);

    // Find the comment button
    cy.get("[data-testid^=comment-button-]")
      .first()
      .then(($btn) => {
        // Click to open the post modal
        cy.wrap($btn).click();
        cy.wait(2000);

        // Enter the comment content
        cy.get('[data-testid = "comment-creator"]')
          .click()
          .type(comment)
          .should("have.value", comment);
        cy.wait(4000);

        // Find the post comment button then click
        cy.get('[data-testid = "post-comment-button"]').then(($submit_btn) => {
          cy.wrap($submit_btn).should("be.visible").should("be.enabled");
          cy.wrap($submit_btn).click();
          cy.wrap($submit_btn).should("be.disabled");
          cy.wait("@createComment", { timeout: 30000 })
            .its("response.statusCode")
            .should("eq", 400);
        });

        // create post completed
        cy.get('[data-testid = "comment-creator"]').should("not.have.value");
      });

    // See the snackbar
    cy.get('[data-testid="popup"]').should("exist");
  });
});
