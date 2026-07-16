/// <reference types="cypress" />

describe("rejectFriend", () => {
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
    requestBtn: "[data-testid='request-friend-button']",
    popup: "[data-testid='popup']",
    snackbar: "[data-testid='snackbar']",
    tab: '[role="tab"]',
    friendList: "[data-testid='friend-list']",
    rejectBtn: "[data-testid='reject-request']",
  };

  const loginUrl = "http://localhost:5000/auth";
  const myProfileUrl = "http://localhost:5000/app/profile";

  before(() => {
    // Gửi yêu cầu kết bạn từ tài khoản target sang tài khoản hiện tại trước khi bắt đầu test suite
    cy.request(
      "POST",
      "https://threddit.site/api/auth/signin",
      targetCredentials,
    ).then(() => {
      cy.request("POST", "https://threddit.site/api/friendship/request/zeskkk");
    });
  });

  beforeEach(() => {
    // Khởi tạo session đăng nhập cho tài khoản nhận lời mời (zeskkk)
    cy.session("session-zeskkk", () => {
      cy.visit(loginUrl);
      cy.get(selectors.emailInput).type(credentials.email);
      cy.get(selectors.passwordInput).type(credentials.password);
      cy.get(selectors.loginBtn).click();
      cy.url().should("include", "/app/home");
    });
  });

  it("Should reject friend fail", () => {
    // Mock API trả về lỗi 400 khi từ chối kết bạn
    cy.intercept("GET", "**/api/profile").as("getMyProfile");
    cy.intercept("POST", "**/api/friendship/request/**/reject", {
      statusCode: 400,
      body: { message: "Từ chối kết bạn thất bại" },
    }).as("rejectFriendFail");

    cy.visit(myProfileUrl);
    cy.wait("@getMyProfile", { timeout: timeoutApi })
      .its("response.statusCode")
      .should("eq", 200);

    // Vào tab Bạn bè -> Lời mời kết bạn và click Từ chối
    cy.get(selectors.tab).eq(2).click();
    cy.get(selectors.friendList)
      .should("be.visible")
      .within(() => {
        cy.get(selectors.tab).eq(1).click();
        cy.wait(3000);
        cy.get(selectors.rejectBtn).click();
      });

    cy.wait("@rejectFriendFail", { timeout: timeoutApi })
      .its("response.statusCode")
      .should("eq", 400);

    // Kiểm tra popup lỗi xuất hiện
    cy.get(selectors.popup).should("be.visible");
    cy.wait(2000);
  });

  it("Should reject friend successfully", () => {
    // Lắng nghe API lấy profile và API từ chối kết bạn thực tế từ hệ thống
    cy.intercept("GET", "**/api/profile").as("getMyProfile");
    cy.intercept("POST", "**/api/friendship/request/**/reject").as(
      "rejectFriendSuccess",
    );

    // 2. Act
    cy.visit(myProfileUrl);
    cy.wait("@getMyProfile", { timeout: timeoutApi })
      .its("response.statusCode")
      .should("eq", 200);

    // Click vào tab Bạn bè -> Click sub-tab Lời mời -> Click Từ chối
    cy.get(selectors.tab).eq(2).click();
    cy.get(selectors.friendList)
      .should("be.visible")
      .within(() => {
        cy.get(selectors.tab).eq(1).click(); // Chuyển sang tab Lời mời kết bạn
        cy.wait(3000);
        cy.get(selectors.rejectBtn).click();
      });

    // 3. Assert
    // Kiểm tra API phản hồi thành công status 200
    cy.wait("@rejectFriendSuccess", { timeout: timeoutApi })
      .its("response.statusCode")
      .should("eq", 200);

    // Kiểm tra snackbar thông báo thành công hiển thị và biến mất
    cy.get(selectors.snackbar).should("be.visible");
    cy.get(selectors.snackbar, { timeout: 5000 }).should("not.exist");
  });
});
