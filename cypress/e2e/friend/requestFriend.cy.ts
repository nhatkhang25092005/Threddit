/// <reference types="cypress" />
describe("friendRequest", () => {
  const timeoutApi: number = 300000;
  const selectors = {
    emailInput: '[data-testid="email-input"]',
    passwordInput: '[data-testid="password-input"]',
    loginBtn: '[data-testid="login-submit-btn"]',
    requestBtn: "[data-testid='request-friend-button']",
    popup: "[data-testid='popup']",
    snackbar: "[data-testid='snackbar']",
  };
  const loginUrl = "http://localhost:5000/auth";
  const profileUrl = "http://localhost:5000/app/profile/chicken";
  beforeEach(() => {
    // 1. Arrange

    const credentials = {
      email: "nhatkhang25092005@gmail.com",
      password: "@Minedash13579",
    };
    cy.session("session-zeskkk", () => {
      cy.visit(loginUrl);
      cy.get(selectors.emailInput).type(credentials.email);
      cy.get(selectors.passwordInput).type(credentials.password);
      cy.get(selectors.loginBtn).click();
      cy.url().should("include", "/app/home");
    });
  });
  it("Should show error message when friend request fails", () => {
    // Login session setup (giữ nguyên)

    // Intercept profile (vẫn cần thành công để vào được trang profile)
    cy.intercept("GET", "**/api/profile/chicken").as("getProfile");

    // CHỈNH SỬA Ở ĐÂY: Ép API kết bạn trả về lỗi 400
    cy.intercept("POST", "**/api/friendship/request/**", {
      statusCode: 400,
      body: { message: "Yêu cầu kết bạn thất bại" },
    }).as("requestFriendFail");

    // 2. Act
    cy.visit(profileUrl);
    cy.wait("@getProfile", { timeout: timeoutApi });

    cy.get(selectors.requestBtn).click();

    // 3. Assert
    // Chờ API fail trả về đúng mã 400
    cy.wait("@requestFriendFail", { timeout: timeoutApi })
      .its("response.statusCode")
      .should("eq", 400);

    // Kiểm tra UI hiển thị thông báo lỗi (Ví dụ: snackbar chứa text lỗi)
    cy.get(selectors.popup).should("be.visible");
    cy.wait(2000);
  });
  it("Should request friend successfully", () => {
    cy.intercept("GET", "**/api/profile/chicken").as("getProfile");
    cy.intercept("POST", "**/api/friendship/request/**").as("requestFriend");

    // 2. Act
    cy.visit(profileUrl);
    cy.wait("@getProfile", { timeout: timeoutApi })
      .its("response.statusCode")
      .should("eq", 200);

    cy.get(selectors.requestBtn).click();

    // 3. Assert
    cy.wait("@requestFriend", { timeout: timeoutApi })
      .its("response.statusCode")
      .should("eq", 200);
    cy.get(selectors.snackbar).should("be.visible");
    cy.get(selectors.snackbar, { timeout: 5000 }).should("not.exist");
    cy.request(
      "POST",
      "https://threddit.site/api/friendship/request/chicken/cancel",
    );
  });
});
