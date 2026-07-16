/// <reference types="cypress" />

describe("commentSuccess", () => {
  const comment: string = `oh this post is really cool =D (at ${new Date().toLocaleString()})`;
  const email = "email@gmail.com";
  const password = "password";
  beforeEach(() => {
    cy.session("user-session", () => {
      cy.visit("http://localhost:5000/auth");
      cy.get('[data-testid="email-input"]')
        .type(email)
        .should("have.value", email);
      cy.get('[data-testid="password-input"]')
        .type(password)
        .should("have.value", password);
      cy.get('[data-testid="login-submit-btn"]').click();
      cy.url().should("include", "/app/home");
    });
  });

  it("Should create a comment with media and text together", () => {
    // 1. Arrange
    const postUrl = "http://localhost:5000/app/profile";
    const fixturePath = "cypress/fixtures/sample_image.jpg";

    const selectors = {
      commentPostModal: '[data-testid="comment-post-modal"]',
      commentBtn: "[data-testid^=comment-button-]",
      commentList: '[data-testid="comment-list"]',
      commentItem: '[data-testid^="comment-item-"]',
      commentInput: '[data-testid="comment-creator"]',
      imageInput: '[data-testid="comment-image-input"]',
      submitBtn: '[data-testid="post-comment-button"]',
    };

    cy.intercept("POST", "**/api/content/**/comment").as("createComment");

    // 2. Act
    cy.visit(postUrl);
    cy.wait(2000); // Giữ nguyên cách wait gốc của bạn[cite: 3]

    cy.get(selectors.commentBtn)
      .first()
      .then(($btn) => {
        cy.wrap($btn).click();
        cy.wait(2000); // Giữ nguyên cách wait gốc của bạn[cite: 3]

        // Đảm bảo modal hiển thị hoàn chỉnh trước khi check điều kiện nhằm tránh lỗi bất đồng bộ[cite: 3]
        cy.get(selectors.commentInput).should("be.visible");

        // --- ĐẾM SỐ LƯỢNG COMMENT BAN ĐẦU ---
        // Nhắm trực tiếp vào modal để JQuery giới hạn đúng vùng tìm kiếm nội bộ
        cy.get(selectors.commentPostModal).then(($modal) => {
          const currentComments = $modal.find(selectors.commentItem);
          // Nếu tìm thấy comment-item bên trong modal thì gán số lượng tính được
          if (currentComments.length > 0) {
            cy.wrap(currentComments.length).as("commentNumberBoth");
          } else {
            // Nếu không get được thì để số lượng comment = 0[cite: 3]
            cy.wrap(0).as("commentNumberBoth");
          }
        });

        // Enter text & upload media (Giữ nguyên bản gốc)[cite: 3]
        cy.get(selectors.commentInput)
          .click()
          .type(comment)
          .should("have.value", comment);
        cy.wait(2000);

        cy.get(selectors.imageInput)
          .first()
          .selectFile(fixturePath, { force: true });
        cy.wait(2000);

        // Submit comment (Giữ nguyên bản gốc)[cite: 3]
        cy.get(selectors.submitBtn).then(($submit_btn) => {
          cy.wrap($submit_btn).should("be.enabled");
          cy.wrap($submit_btn).click({ force: true });
          cy.wrap($submit_btn).should("be.disabled");
        });

        // 3. Assert (Giữ nguyên bản gốc)[cite: 3]
        cy.wait("@createComment", { timeout: 30000 })
          .its("response.statusCode")
          .should("eq", 200);
        cy.get(selectors.commentInput).should("not.have.value");

        // Check if the comment count increases (Sử dụng đúng cấu trúc .within gốc của bạn)[cite: 3]
        cy.get(selectors.commentList).within(() => {
          cy.get("@commentNumberBoth").then((initNumber) => {
            const expectedLength = Number(initNumber) + 1;
            cy.get(selectors.commentItem).should("have.length", expectedLength);
          });
        });
      });
  });
});
