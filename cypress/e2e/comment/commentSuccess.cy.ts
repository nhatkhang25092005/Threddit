/// <reference types="cypress" />

describe("commentSuccess", () => {
  const comment: string = `oh this post is really cool =D (at ${new Date().toLocaleString()})`;

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

  it("Should create a text only comment successfully", () => {
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

        // --- ĐẾM SỐ LƯỢNG COMMENT BAN ĐẦU ---
        cy.get('[data-testid="comment-list"]').then(($list) => {
          const comments = $list.find('[data-testid^="comment-"]');
          const initNumber = comments.length > 0 ? comments.length : 0;
          cy.wrap(initNumber).as("commentNumberTextOnly"); // Dùng tên alias riêng biệt để tránh nhầm lẫn
        });

        // Enter the comment content
        cy.get('[data-testid="comment-creator"]')
          .click()
          .type(comment)
          .should("have.value", comment);
        cy.wait(4000);

        // Find the post comment button then click
        cy.get('[data-testid="post-comment-button"]').then(($submit_btn) => {
          cy.wrap($submit_btn).should("be.visible").should("be.enabled");
          cy.wrap($submit_btn).click();
          cy.wrap($submit_btn).should("be.disabled");
          cy.wait("@createComment", { timeout: 30000 })
            .its("response.statusCode")
            .should("eq", 200);
        });

        // create post completed
        cy.get('[data-testid="comment-creator"]').should("not.have.value");

        // --- KIỂM TRA SỐ LƯỢNG TĂNG LÊN ---
        cy.get('[data-testid="comment-list"]').within(() => {
          cy.get("@commentNumberTextOnly").then((initNumber) => {
            const expectedLength = Number(initNumber) + 1;
            cy.get('[data-testid^="comment-"]').should(
              "have.length",
              expectedLength,
            );
          });
        });
      });

    // See the snackbar
    cy.get('[data-testid="snackbar"]').should("exist");
    cy.get('[data-testid="snackbar"]', { timeout: 5000 }).should("not.exist");
  });

  it("Should create a media only comment successfully", () => {
    cy.visit("http://localhost:5000/app/profile");
    cy.intercept("POST", "**/api/content/**/comment").as("createComment");
    cy.wait(2000);

    cy.get("[data-testid^=comment-button-]")
      .first()
      .then(($btn) => {
        cy.wrap($btn).click();
        cy.wait(2000);

        // --- ĐẾM SỐ LƯỢNG COMMENT BAN ĐẦU ---
        cy.get('[data-testid="comment-list"]').then(($list) => {
          const comments = $list.find('[data-testid^="comment-"]');
          const initNumber = comments.length > 0 ? comments.length : 0;
          cy.wrap(initNumber).as("commentNumberMediaOnly");
        });

        // Enter the comment content
        cy.get('[data-testid="comment-image-input"]')
          .first()
          .selectFile("cypress/fixtures/sample_image.jpg", { force: true });
        cy.wait(3000);

        // Find the post comment button then click
        cy.get('[data-testid="post-comment-button"]').then(($submit_btn) => {
          cy.wrap($submit_btn).should("be.enabled");
          cy.wrap($submit_btn).click({ force: true });
          cy.wrap($submit_btn).should("be.disabled");
          cy.wait("@createComment", { timeout: 30000 })
            .its("response.statusCode")
            .should("eq", 200);
        });

        // create post completed
        cy.get('[data-testid="comment-creator"]').should("not.have.value");

        // --- KIỂM TRA SỐ LƯỢNG TĂNG LÊN ---
        cy.get('[data-testid="comment-list"]').within(() => {
          cy.get("@commentNumberMediaOnly").then((initNumber) => {
            const expectedLength = Number(initNumber) + 1;
            cy.get('[data-testid^="comment-"]').should(
              "have.length",
              expectedLength,
            );
          });
        });
      });
  });

  it("Should create a comment with media and text together", () => {
    // 1. Arrange
    const postUrl = "http://localhost:5000/app/profile";
    const fixturePath = "cypress/fixtures/sample_image.jpg";

    const selectors = {
      commentBtn: "[data-testid^=comment-button-]",
      commentList: '[data-testid="comment-list"]',
      commentItem: '[data-testid^="comment-"]',
      commentInput: '[data-testid="comment-creator"]',
      imageInput: '[data-testid="comment-image-input"]',
      submitBtn: '[data-testid="post-comment-button"]',
    };

    cy.intercept("POST", "**/api/content/**/comment").as("createComment");

    // 2. Act
    cy.visit(postUrl);
    cy.wait(2000);

    cy.get(selectors.commentBtn)
      .first()
      .then(($btn) => {
        cy.wrap($btn).click();
        cy.wait(2000);

        // Count the init comment list length
        cy.get(selectors.commentList).then(($list) => {
          const comments = $list.find(selectors.commentItem);
          const initNumber = comments.length > 0 ? comments.length : 0;
          cy.wrap(initNumber).as("commentNumber");
        });

        // Enter text & upload media
        cy.get(selectors.commentInput)
          .click()
          .type(comment)
          .should("have.value", comment);
        cy.wait(2000);

        cy.get(selectors.imageInput)
          .first()
          .selectFile(fixturePath, { force: true });
        cy.wait(2000);

        // Submit comment
        cy.get(selectors.submitBtn).then(($submit_btn) => {
          cy.wrap($submit_btn).should("be.enabled");
          cy.wrap($submit_btn).click({ force: true });
          cy.wrap($submit_btn).should("be.disabled");
        });

        // 3. Assert
        cy.wait("@createComment", { timeout: 30000 })
          .its("response.statusCode")
          .should("eq", 200);
        cy.get(selectors.commentInput).should("not.have.value");

        // Check if the comment count increases
        cy.get(selectors.commentList).within(() => {
          cy.get("@commentNumber").then((initNumber) => {
            const expectedLength = Number(initNumber) + 1;
            cy.get(selectors.commentItem).should("have.length", expectedLength);
          });
        });
      });
  });
});
