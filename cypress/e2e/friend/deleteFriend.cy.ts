/// <reference types="cypress" />

describe("deleteFriend", () => {
  const timeoutApi: number = 300000;

  // 1. Arrange
  const credentials = {
    email: "nhatkhang25092005@gmail.com",
    password: "@Minedash13579",
  };

  const targetCredentials = {
    email: "nhatkhang2592005@gmail.com",
    password: "@Minedash13579",
  };

  const selectors = {
    emailInput: '[data-testid="email-input"]',
    passwordInput: '[data-testid="password-input"]',
    loginBtn: '[data-testid="login-submit-btn"]',
    popup: "[data-testid='popup']",
    snackbar: "[data-testid='snackbar']",
    tab: '[role="tab"]',
    friendList: "[data-testid='friend-list']",
    deleteBtn: "[data-testid='delete-friend']",
  };

  const loginUrl = "http://localhost:5000/auth";
  const myProfileUrl = "http://localhost:5000/app/profile";

  before(() => {
    // 1. Target gửi lời mời kết bạn đến tài khoản hiện tại
    cy.request(
      "POST",
      "https://threddit.site/api/auth/signin",
      targetCredentials,
    ).then(() => {
      cy.request("POST", "https://threddit.site/api/friendship/request/zeskkk");
    });

    // 2. Tài khoản hiện tại chấp nhận lời mời để chính thức kết bạn
    cy.request(
      "POST",
      "https://threddit.site/api/auth/signin",
      credentials,
    ).then(() => {
      cy.request(
        "POST",
        "https://threddit.site/api/friendship/request/chicken/accept",
      );
    });
  });

  beforeEach(() => {
    cy.session("session-zeskkk", () => {
      cy.visit(loginUrl);
      cy.get(selectors.emailInput).type(credentials.email);
      cy.get(selectors.passwordInput).type(credentials.password);
      cy.get(selectors.loginBtn).click();
      cy.url().should("include", "/app/home");
    });
  });

  it("Should delete friend fail", () => {
    cy.viewport(1366, 768);
    cy.intercept("GET", "**/api/profile").as("getMyProfile");
    cy.intercept("DELETE", "**/api/friendship/**", {
      statusCode: 400,
      body: { message: "Xóa bạn bè thất bại" },
    }).as("deleteFriendFail");

    cy.visit(myProfileUrl);
    cy.wait("@getMyProfile", { timeout: timeoutApi })
      .its("response.statusCode")
      .should("eq", 200);

    cy.get(selectors.tab).eq(2).click();
    cy.get(selectors.friendList)
      .should("be.visible")
      .within(() => {
        cy.get(selectors.tab).eq(0).click();
        cy.wait(3000);
        cy.get(selectors.deleteBtn).click();
      });

    cy.wait("@deleteFriendFail", { timeout: timeoutApi })
      .its("response.statusCode")
      .should("eq", 400);

    cy.get(selectors.popup).should("be.visible");
  });

  it("Should delete friend successfully", () => {
    cy.viewport(1366, 768);
    cy.intercept("GET", "**/api/profile").as("getMyProfile");
    cy.intercept("DELETE", "**/api/friendship/**").as("deleteFriendSuccess");

    // 2. Act
    cy.visit(myProfileUrl);
    cy.wait("@getMyProfile", { timeout: timeoutApi })
      .its("response.statusCode")
      .should("eq", 200);

    cy.get(selectors.tab).eq(2).click();
    cy.get(selectors.friendList)
      .should("be.visible")
      .within(() => {
        cy.get(selectors.tab).eq(0).click();
        cy.wait(3000);
        cy.get(selectors.deleteBtn).click();
      });

    // 3. Assert
    cy.wait("@deleteFriendSuccess", { timeout: timeoutApi })
      .its("response.statusCode")
      .should("eq", 200);

    cy.get(selectors.snackbar).should("be.visible");
    cy.get(selectors.snackbar, { timeout: 5000 }).should("not.exist");
  });
});
