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

  it("It should create a comment fail", () => {
    // 1. Arrange
    const postUrl = "http://localhost:5000/app/profile";

    const selectors = {
      commentBtn: "[data-testid^=comment-button-]",
      commentInput: '[data-testid="comment-creator"]',
      submitBtn: '[data-testid="post-comment-button"]',
      popup: '[data-testid="popup"]',
    };

    cy.intercept("POST", "**/api/content/**/comment").as("createComment");

    // 2. Act
    cy.visit(postUrl);
    cy.wait(3000);

    cy.get(selectors.commentBtn)
      .first()
      .then(($btn) => {
        cy.wrap($btn).click();
        cy.wait(2000);

        // Enter comment
        cy.get(selectors.commentInput)
          .click()
          .type(comment)
          .should("have.value", comment);
        cy.wait(4000);

        // Submit comment
        cy.get(selectors.submitBtn).then(($submit_btn) => {
          cy.wrap($submit_btn).should("be.visible").should("be.enabled");
          cy.wrap($submit_btn).click();
          cy.wrap($submit_btn).should("be.disabled");
        });

        // 3. Assert
        cy.wait("@createComment", { timeout: 30000 })
          .its("response.statusCode")
          .should("eq", 400);
        cy.get(selectors.commentInput).should("not.have.value");
      });

    cy.get(selectors.popup).should("exist");
    cy.wait(2000);
  });

  it("should can not create a comment with empty content", () => {
    // 1. Arrange
    const postUrl = "http://localhost:5000/app/profile";

    const selectors = {
      commentBtn: "[data-testid^=comment-button-]",
      submitBtn: '[data-testid="post-comment-button"]',
      commentInput: '[data-testid="comment-creator"]',
    };

    // 2. Act
    cy.visit(postUrl);
    cy.wait(3000);

    cy.get(selectors.commentBtn)
      .first()
      .then(($btn) => {
        cy.wrap($btn).click();
        cy.wait(2000);

        // 3. Assert
        cy.get(selectors.submitBtn).should("be.visible").should("be.disabled");
        cy.get(selectors.commentInput).should("not.have.value");
      });
  });
});
