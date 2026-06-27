/// <reference types="cypress" />

describe("post edition", () => {
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

  it("Should edit text post successfully", () => {
    cy.intercept("PATCH", "**/api/content/*").as("editPostRequest");
    cy.visit("http://localhost:5000/app/profile");
    cy.wait(1000);
    cy.get("[data-testid^=text-content-of-]")
      .first()
      .then(($textContent) => {
        cy.get("[data-testid^='post-button-menu-']")
          .first()
          .then(($btn) => {
            cy.wrap($btn).click();
            cy.wait(1000);
            cy.get('[data-testid$=".menu-item-2"]').first().click();
            cy.get('[data-testid="create-post-modal"]').should("be.visible");
            cy.get('[data-testid="create-post-button"]').should("be.enabled");
            cy.wait(2000);
            cy.get('[data-testid="post-editor-textarea"]')
              .should("have.value", $textContent.text().trim())
              .type("added text");
            cy.get('[data-testid="create-post-button"]').click();
            cy.get('[data-testid="create-post-loading"]').should("be.visible");
            cy.wait("@editPostRequest", { timeout: 30000 })
              .its("response.statusCode")
              .should("eq", 200);
            cy.get('[data-testid="create-post-loading"]').should("not.exist");
            cy.get('[data-testid="create-post-modal"]').should("not.exist");
            cy.get('[data-testid="snackbar"]').should("be.visible");
          });
      });
    cy.wait(3000);
  });

  it("Should add media into text only post successfully", () => {
    cy.intercept("PATCH", "**/api/content/*").as("editPostRequest");
    cy.visit("http://localhost:5000/app/profile");
    cy.wait(2000);
    cy.get("[data-testid^='post-button-menu-']")
      .first()
      .then(($btn) => {
        cy.wrap($btn).click();
        cy.wait(1000);
        cy.get('[data-testid$=".menu-item-2"]').first().click();
        cy.get('[data-testid = "image-upload-input-to-post"]').selectFile(
          "cypress/fixtures/sample_image.jpg",
          { force: true },
        );
        cy.get('[data-testid = "sound-upload-input-to-post"]').selectFile(
          "cypress/fixtures/sample_sound.mp3",
          { force: true },
        );
        cy.get('[data-testid = "video-upload-input-to-post"]').selectFile(
          "cypress/fixtures/sample_video.mp4",
          { force: true },
        );

        cy.wait(1000);

        cy.get('[data-testid="create-post-body"]').scrollTo("bottom", {
          duration: 500,
        });

        cy.get('[data-testid="create-post-button"]')
          .should("be.enabled")
          .click();

        cy.wait("@editPostRequest", { timeout: 30000 })
          .its("response.statusCode")
          .should("eq", 200);
        cy.get('[data-testid="create-post-modal"]').should("not.exist");
        cy.get('[data-testid="create-post-modal"]').should("not.exist");
        cy.get('[data-testid="snackbar"]').should("be.visible");
        cy.get('[data-testid="snackbar"]', { timeout: 5000 }).should(
          "not.exist",
        );
      });
  });

  it("Should switch the media file successfully", () => {
    cy.visit("http://localhost:5000/app/profile");
    // Phase 1: create post first
    cy.intercept("POST", "**/api/content").as("createPostRequest");
    // open the modal
    cy.get('[data-testid="create-post-input-button"]').click();
    cy.get('[data-testid="create-post-modal"]').should("be.visible");
    cy.get('[data-testid="create-post-button"]').should("be.disabled");
    cy.get('[data-testid="post-editor-textarea"]').should("have.value", "");
    cy.get('[data-testid="create-post-button"]').should("be.disabled");
    // click the upload media button
    cy.get('[data-testid = "image-upload-input-to-post"]').selectFile(
      "cypress/fixtures/sample_image.jpg",
      { force: true },
    );
    cy.get('[data-testid="preview-image-0"]').should("be.visible");
    cy.get('[data-testid="create-post-button"]').should("be.enabled").click();
    cy.get('[data-testid="create-post-loading"]').should("be.visible");
    cy.wait("@createPostRequest", { timeout: 30000 })
      .its("response.statusCode")
      .should("eq", 201);
    // Phase 2: Change the media file
    cy.intercept("PATCH", "**/api/content/*").as("editPostRequest");
    cy.get('[data-testid ^= "post-button-menu-"]')
      .first()
      .then(($btn) => {
        cy.wrap($btn).click();
        cy.wait(1000);
        cy.get('[data-testid$=".menu-item-2"]').first().click();
        cy.get('[data-testid="create-post-modal"]').should("be.visible");
        cy.get('[data-testid="create-post-button"]').should("be.enabled");
        cy.wait(2000);
        cy.get('[data-testid = "image-remove"]').click();
        cy.get('[data-testid="create-post-button"]').should("be.disabled");

        cy.get('[data-testid = "video-upload-input-to-post"]').selectFile(
          "cypress/fixtures/sample_video.mp4",
          { force: true },
        );
        cy.get('[data-testid="create-post-button"]')
          .should("be.enabled")
          .click();

        cy.wait("@editPostRequest", { timeout: 30000 })
          .its("response.statusCode")
          .should("eq", 200);
        cy.get('[data-testid="create-post-loading"]').should("not.exist");
        cy.get('[data-testid="create-post-modal"]').should("not.exist");
        cy.get('[data-testid="snackbar"]').should("be.visible");
      });
  });

  it("Should add text into media post successfully", () => {
    cy.visit("http://localhost:5000/app/profile");
    // Phase 1: create post first
    cy.intercept("POST", "**/api/content").as("createPostRequest");
    // open the modal
    cy.get('[data-testid="create-post-input-button"]').click();
    cy.get('[data-testid="create-post-modal"]').should("be.visible");
    cy.get('[data-testid="create-post-button"]').should("be.disabled");
    cy.get('[data-testid="post-editor-textarea"]').should("have.value", "");
    cy.get('[data-testid="create-post-button"]').should("be.disabled");
    // click the upload media button
    cy.get('[data-testid = "image-upload-input-to-post"]').selectFile(
      "cypress/fixtures/sample_image.jpg",
      { force: true },
    );
    cy.get('[data-testid="preview-image-0"]').should("be.visible");
    cy.get('[data-testid="create-post-button"]').should("be.enabled").click();
    cy.get('[data-testid="create-post-loading"]').should("be.visible");
    cy.wait("@createPostRequest", { timeout: 30000 })
      .its("response.statusCode")
      .should("eq", 201);

    // Phase 2: Input text into media post
    cy.intercept("PATCH", "**/api/content/*").as("editPostRequest");
    cy.get("[data-testid^='post-button-menu-']")
      .first()
      .then(($btn) => {
        cy.wrap($btn).click();
        cy.wait(1000);
        cy.get('[data-testid$=".menu-item-2"]').first().click();
        cy.get('[data-testid="create-post-modal"]').should("be.visible");
        cy.get('[data-testid="create-post-button"]').should("be.enabled");
        cy.wait(2000);
        cy.get('[data-testid="post-editor-textarea"]')
          .should("have.value", "")
          .type("added text");
        cy.get('[data-testid="create-post-button"]').click();
        cy.get('[data-testid="create-post-loading"]').should("be.visible");
        cy.wait("@editPostRequest", { timeout: 30000 })
          .its("response.statusCode")
          .should("eq", 200);
        cy.get('[data-testid="create-post-loading"]').should("not.exist");
        cy.get('[data-testid="create-post-modal"]').should("not.exist");
        cy.get('[data-testid="snackbar"]').should("be.visible");
      });
  });
});
