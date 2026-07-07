describe("acceptFriend", () => {
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
    acceptBtn: "[data-testid='accept-request']",
  };
  const loginUrl = "http://localhost:5000/auth";
  before(() => {
    cy.request(
      "POST",
      "https://threddit.site/api/auth/signin",
      targetCredentials,
    ).then(() => {
      cy.request("POST", "https://threddit.site/api/friendship/request/zeskkk");
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

  it("Should accept friend fail", () => {
    const myProfileUrl = "http://localhost:5000/app/profile";

    cy.intercept("GET", "**/api/profile").as("getMyProfile");
    cy.intercept("POST", "**/api/friendship/request/**/accept", {
      statusCode: 400,
      body: { message: "Chấp nhận kết bạn thất bại" },
    }).as("acceptFriendFail");

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
        cy.get(selectors.acceptBtn).click();
      });

    cy.wait("@acceptFriendFail", { timeout: timeoutApi })
      .its("response.statusCode")
      .should("eq", 400);

    cy.get(selectors.popup).should("be.visible");
  });

  it("Should accept friend successfully", () => {
    const myProfileUrl = "http://localhost:5000/app/profile";

    // Lắng nghe API lấy profile và API chấp nhận kết bạn (mong đợi trả về 200)
    cy.intercept("GET", "**/api/profile").as("getMyProfile");
    cy.intercept("POST", "**/api/friendship/request/**/accept").as(
      "acceptFriendSuccess",
    );

    // 2. Act
    // Truy cập trang cá nhân của mình (nơi chứa danh sách lời mời kết bạn)
    cy.visit(myProfileUrl);
    cy.wait("@getMyProfile", { timeout: timeoutApi })
      .its("response.statusCode")
      .should("eq", 200);

    // Click vào tab Bạn bè -> Click sub-tab Lời mời -> Click Chấp nhận
    cy.get(selectors.tab).eq(2).click();
    cy.get(selectors.friendList)
      .should("be.visible")
      .within(() => {
        cy.get(selectors.tab).eq(1).click(); // Chuyển sang tab Lời mời kết bạn
        cy.wait(3000);
        cy.get(selectors.acceptBtn).click();
      });

    // 3. Assert
    // Kiểm tra API phản hồi thành công 200
    cy.wait("@acceptFriendSuccess", { timeout: timeoutApi })
      .its("response.statusCode")
      .should("eq", 200);

    // Kiểm tra snackbar thông báo thành công xuất hiện rồi biến mất
    cy.get(selectors.snackbar).should("be.visible");
    cy.get(selectors.snackbar, { timeout: 5000 }).should("not.exist");

    cy.request("DELETE", "https://threddit.site/api/friendship/chicken");
  });
});
