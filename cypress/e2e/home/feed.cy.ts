/// <reference types="cypress" />
/// <reference types="cypress-real-events" />

describe("feed", () => {
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

  it("should scroll to the post and trigger loading new posts successfully", () => {
    cy.intercept("GET", "**/api/content/feed").as("loadNewPosts");
    cy.visit("http://localhost:5000/app/home");
    cy.viewport(1366, 768);
    cy.wait("@loadNewPosts", { timeout: 15000 })
      .its("response.statusCode")
      .should("eq", 200);
    cy.wait(5000);
    cy.get("main").scrollTo("bottom", {
      duration: 1000,
      ensureScrollable: true,
    });

    cy.wait("@loadNewPosts").its("response.statusCode").should("eq", 200);
    cy.wait(3000);
  });

  it("should display empty state when there are no posts in the feed", () => {
    cy.viewport(1366, 768);
    cy.intercept("GET", "**/api/content/feed*", {
      statusCode: 200,
      body: {
        data: [],
        hasMore: false,
      },
    }).as("loadEmptyFeed");
    cy.viewport(1366, 768);
    cy.visit("http://localhost:5000/app/home");
    cy.wait("@loadEmptyFeed").its("response.statusCode").should("eq", 200);
    cy.contains("Ở đây có vẻ trống trải").should("be.visible");
    cy.contains("Hiện bảng tin chưa có bài viết nào").should("be.visible");
  });
});
