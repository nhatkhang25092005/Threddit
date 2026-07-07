/// <reference types="cypress" />
describe("friend", () => {
  const timeoutApi: number = 300000;

  it("Should accept friend successfully", () => {
    // 1. Arrange
    const loginUrl = "http://localhost:5000/auth";
    const profileUrl = "http://localhost:5000/app/profile";

    const credentials = {
      email: "nhatkhang2592005@gmail.com",
      password: "@Minedash13579",
    };

    const selectors = {
      emailInput: '[data-testid="email-input"]',
      passwordInput: '[data-testid="password-input"]',
      loginBtn: '[data-testid="login-submit-btn"]',
      tab: '[role="tab"]',
      friendList: "[data-testid='friend-list']",
      acceptBtn: "[data-testid='accept-request']",
      snackbar: "[data-testid='snackbar']",
    };

    // Login session setup
    cy.session("session-chicken", () => {
      cy.visit(loginUrl);
      cy.get(selectors.emailInput)
        .type(credentials.email)
        .should("have.value", credentials.email);
      cy.get(selectors.passwordInput)
        .type(credentials.password)
        .should("have.value", credentials.password);
      cy.get(selectors.loginBtn).click();
      cy.url().should("include", "/app/home");
    });

    cy.intercept("GET", "**/api/profile").as("getProfile");
    cy.intercept("POST", "**/api/friendship/request/**/accept").as(
      "acceptFriend",
    );

    // 2. Act
    cy.visit(profileUrl);
    cy.wait("@getProfile", { timeout: timeoutApi })
      .its("response.statusCode")
      .should("eq", 200);

    cy.get(selectors.tab).eq(2).click();
    cy.get(selectors.friendList)
      .should("be.visible")
      .within(() => {
        cy.get(selectors.tab).eq(1).click();
        cy.wait(3000);
        cy.get(selectors.acceptBtn).click();
      });

    // 3. Assert
    cy.wait("@acceptFriend", { timeout: timeoutApi })
      .its("response.statusCode")
      .should("eq", 200);
    cy.get(selectors.snackbar).should("be.visible");
    cy.get(selectors.snackbar, { timeout: 5000 }).should("not.exist");
  });

  it("Should reject friend request successfully", () => {
    // 1. Arrange
    const loginUrl = "http://localhost:5000/auth";
    const userProfileUrl = "http://localhost:5000/app/profile/zeskkk";
    const myProfileUrl = "http://localhost:5000/app/profile";

    const userCredentials = {
      email: "2331540085@vaa.edu.vn",
      password: "@Minedash13579",
    };

    const myCredentials = {
      email: "nhatkhang25092005@gmail.com",
      password: "@Minedash13579",
    };

    const selectors = {
      emailInput: '[data-testid="email-input"]',
      passwordInput: '[data-testid="password-input"]',
      loginBtn: '[data-testid="login-submit-btn"]',
      requestBtn: "[data-testid='request-friend-button']",
      tab: '[role="tab"]',
      friendList: '[data-testid="friend-list"]',
      rejectBtn: "[data-testid='reject-request']",
      snackbar: "[data-testid='snackbar']",
    };

    // --- PHASE 1: Send Friend Request ---
    cy.session("session-murad", () => {
      cy.visit(loginUrl);
      cy.get(selectors.emailInput)
        .type(userCredentials.email)
        .should("have.value", userCredentials.email);
      cy.get(selectors.passwordInput)
        .type(userCredentials.password)
        .should("have.value", userCredentials.password);
      cy.get(selectors.loginBtn).click();
      cy.url().should("include", "/app/home");
    });

    cy.intercept("GET", "**/api/profile/**").as("getProfile");
    cy.intercept("POST", "**/api/friendship/request/**").as("requestFriend");

    cy.visit(userProfileUrl);
    cy.wait("@getProfile", { timeout: timeoutApi })
      .its("response.statusCode")
      .should("eq", 200);

    cy.get(selectors.requestBtn).click();
    cy.wait("@requestFriend", { timeout: timeoutApi })
      .its("response.statusCode")
      .should("eq", 200);
    cy.get(selectors.snackbar).should("be.visible");
    cy.get(selectors.snackbar, { timeout: 5000 }).should("not.exist");

    // --- PHASE 2: Reject Friend Request ---
    cy.session("session-zeskkk", () => {
      cy.visit(loginUrl);
      cy.get(selectors.emailInput)
        .type(myCredentials.email)
        .should("have.value", myCredentials.email);
      cy.get(selectors.passwordInput)
        .type(myCredentials.password)
        .should("have.value", myCredentials.password);
      cy.get(selectors.loginBtn).click();
      cy.url().should("include", "/app/home");
    });

    cy.intercept("POST", "**/api/friendship/request/**/reject").as(
      "rejectFriend",
    );
    cy.intercept("GET", "**/api/profile").as("getMyProfile");

    cy.visit(myProfileUrl);
    cy.wait("@getMyProfile", { timeout: timeoutApi })
      .its("response.statusCode")
      .should("eq", 200);

    cy.get(selectors.tab).eq(2).click();
    cy.get(selectors.friendList)
      .should("be.visible")
      .within(() => {
        cy.get(selectors.tab).eq(1).click();
        cy.wait(3000);
        cy.get(selectors.rejectBtn).click();
      });

    // 3. Assert
    cy.wait("@rejectFriend", { timeout: timeoutApi })
      .its("response.statusCode")
      .should("eq", 200);
    cy.get(selectors.snackbar).should("be.visible");
    cy.get(selectors.snackbar, { timeout: 5000 }).should("not.exist");
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
