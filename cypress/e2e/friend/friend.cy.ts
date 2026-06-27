/// <reference types="cypress" />
const timeoutApi: number = 300000;
describe("friend request", () => {
  it("Should request friend successfully", () => {
    // Using Zeskkk account
    cy.session("session-zeskkk", () => {
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
    cy.intercept("GET", "**/api/profile/chicken").as("getProfile");

    cy.intercept("POST", "**/api/friendship/request/**").as("requestFriend");

    cy.visit("http://localhost:5000/app/profile/chicken");

    cy.wait("@getProfile", { timeout: timeoutApi })
      .its("response.statusCode")
      .should("eq", 200);
    cy.get("[data-testid='request-friend-button']").click();
    cy.wait("@requestFriend", { timeout: timeoutApi })
      .its("response.statusCode")
      .should("eq", 200);
    cy.get("[data-testid='snackbar']").should("be.visible");
    cy.get("[data-testid='snackbar']", { timeout: 5000 }).should("not.exist");
  });

  it("Should accept friend successfully", () => {
    // Using chicken Account
    cy.session("session-chicken", () => {
      cy.visit("http://localhost:5000/auth");
      cy.get('[data-testid="email-input"]')
        .type("nhatkhang2592005@gmail.com")
        .should("have.value", "nhatkhang2592005@gmail.com");
      cy.get('[data-testid="password-input"]')
        .type("@Minedash13579")
        .should("have.value", "@Minedash13579");
      cy.get('[data-testid="login-submit-btn"]').click();
      cy.url().should("include", "/app/home");
    });
    cy.visit("http://localhost:5000/app/profile");
    cy.intercept("GET", "**/api/profile").as("getProfile");
    cy.intercept("POST", "**/api/friendship/request/**/accept").as(
      "acceptFriend",
    );
    cy.wait("@getProfile", { timeout: timeoutApi })
      .its("response.statusCode")
      .should("eq", 200);
    cy.get('[role="tab"]').eq(2).click();
    cy.get("[data-testid='friend-list']")
      .should("be.visible")
      .within(() => {
        cy.get("[role='tab']").eq(1).click();
        cy.wait(3000);
        cy.get("[data-testid = 'accept-request']").click();
      });
    cy.wait("@acceptFriend", { timeout: timeoutApi })
      .its("response.statusCode")
      .should("eq", 200);
    cy.get("[data-testid='snackbar']").should("be.visible");
    cy.get("[data-testid='snackbar']", { timeout: 5000 }).should("not.exist");
  });

  it("Should reject friend request successfully", () => {
    cy.session("session-murad", () => {
      cy.visit("http://localhost:5000/auth");
      cy.get('[data-testid="email-input"]')
        .type("2331540085@vaa.edu.vn")
        .should("have.value", "2331540085@vaa.edu.vn");
      cy.get('[data-testid="password-input"]')
        .type("@Minedash13579")
        .should("have.value", "@Minedash13579");
      cy.get('[data-testid="login-submit-btn"]').click();
      cy.url().should("include", "/app/home");
    });

    cy.visit("http://localhost:5000/app/profile/zeskkk");
    cy.intercept("GET", "**/api/profile/**").as("getProfile");
    cy.intercept("POST", "**/api/friendship/request/**").as("requestFriend");

    cy.wait("@getProfile", { timeout: timeoutApi })
      .its("response.statusCode")
      .should("eq", 200);
    cy.get("[data-testid='request-friend-button']").click();
    cy.wait("@requestFriend", { timeout: timeoutApi })
      .its("response.statusCode")
      .should("eq", 200);
    cy.get("[data-testid='snackbar']").should("be.visible");
    cy.get("[data-testid='snackbar']", { timeout: 5000 }).should("not.exist");

    cy.session("session-zeskkk", () => {
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
    cy.intercept("POST", "**/api/friendship/request/**/reject").as(
      "rejectFriend",
    );
    cy.intercept("GET", "**/api/profile").as("getProfile");
    cy.wait("@getProfile", { timeout: timeoutApi })
      .its("response.statusCode")
      .should("eq", 200);
    cy.get('[role="tab"]').eq(2).click();
    cy.get('[data-testid = "friend-list"]')
      .should("be.visible")
      .within(() => {
        cy.get("[role='tab']").eq(1).click();
        cy.wait(3000);
        cy.get("[data-testid = 'reject-request']").click();
      });
    cy.wait("@rejectFriend", { timeout: timeoutApi })
      .its("response.statusCode")
      .should("eq", 200);
    cy.get("[data-testid='snackbar']").should("be.visible");
    cy.get("[data-testid='snackbar']", { timeout: 5000 }).should("not.exist");
  });
  it("Should delete friend successfully", () => {
    cy.session("session-chicken", () => {
      cy.visit("http://localhost:5000/auth");
      cy.get('[data-testid="email-input"]')
        .type("nhatkhang2592005@gmail.com")
        .should("have.value", "nhatkhang2592005@gmail.com");
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
