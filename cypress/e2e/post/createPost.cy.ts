/// <reference types="cypress" />
import { EMOJI } from "../../../src/constant/emoji";

describe("post creation", () => {
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

  // create post with text only
  it("should create post with text only successfully", () => {
    // 1. Arrange
    const postUrl = "http://localhost:5000/app/profile";
    const postTextContent = `text content of post creation at ${Date.now()}`;

    const selectors = {
      inputBtn: '[data-testid="create-post-input-button"]',
      modal: '[data-testid="create-post-modal"]',
      submitBtn: '[data-testid="create-post-button"]',
      textarea: '[data-testid="post-editor-textarea"]',
      loading: '[data-testid="create-post-loading"]',
      snackbar: '[data-testid="snackbar"]',
    };

    cy.intercept("POST", "**/api/content").as("createPostRequest");

    // 2. Act
    cy.visit(postUrl);
    cy.get(selectors.inputBtn).click();

    cy.get(selectors.modal).should("be.visible");
    cy.get(selectors.submitBtn).should("be.disabled");

    cy.get(selectors.textarea)
      .type(postTextContent)
      .should("have.value", postTextContent);
    cy.get(selectors.submitBtn).should("be.enabled").click();

    // 3. Assert
    cy.get(selectors.submitBtn).should("be.disabled");
    cy.get(selectors.loading).should("be.visible");

    cy.wait("@createPostRequest", { timeout: 30000 })
      .its("response.statusCode")
      .should("eq", 201);

    cy.get(selectors.modal).should("not.exist");
    cy.get(selectors.snackbar).should("be.visible");
    cy.get(selectors.snackbar, { timeout: 5000 }).should("not.exist");
    cy.contains(postTextContent).should("be.visible");
  });

  // create post with media only
  it("should create post with media only successfully", () => {
    // 1. Arrange
    const postUrl = "http://localhost:5000/app/profile";
    const fixturePath = "cypress/fixtures/sample_image.jpg";

    const selectors = {
      inputBtn: '[data-testid="create-post-input-button"]',
      modal: '[data-testid="create-post-modal"]',
      submitBtn: '[data-testid="create-post-button"]',
      textarea: '[data-testid="post-editor-textarea"]',
      uploadInput: '[data-testid="image-upload-input-to-post"]',
      previewImage: '[data-testid="preview-image-0"]',
      loading: '[data-testid="create-post-loading"]',
      snackbar: '[data-testid="snackbar"]',
    };

    cy.intercept("POST", "**/api/content").as("createPostRequest");

    // 2. Act
    cy.visit(postUrl);
    cy.get(selectors.inputBtn).click();

    cy.get(selectors.modal).should("be.visible");
    cy.get(selectors.submitBtn).should("be.disabled");
    cy.get(selectors.textarea).should("have.value", "");

    cy.get(selectors.uploadInput).selectFile(fixturePath, { force: true });

    // 3. Assert
    cy.get(selectors.previewImage).should("be.visible");
    cy.get(selectors.submitBtn).should("be.enabled").click();

    cy.get(selectors.loading).should("be.visible");
    cy.wait("@createPostRequest", { timeout: 30000 })
      .its("response.statusCode")
      .should("eq", 201);

    cy.get(selectors.modal).should("not.exist");
    cy.get(selectors.snackbar).should("be.visible");
    cy.get(selectors.snackbar, { timeout: 5000 }).should("not.exist");
  });

  it("should create post with content mixing successfully", () => {
    // 1. Arrange
    const postUrl = "http://localhost:5000/app/profile";
    const postTextContent = `mixing content of post creation at ${Date.now()}`;

    const fixtures = {
      image: "cypress/fixtures/sample_image.jpg",
      sound: "cypress/fixtures/sample_sound.mp3",
      video: "cypress/fixtures/sample_video.mp4",
    };

    const selectors = {
      inputBtn: '[data-testid="create-post-input-button"]',
      modal: '[data-testid="create-post-modal"]',
      submitBtn: '[data-testid="create-post-button"]',
      textarea: '[data-testid="post-editor-textarea"]',
      imageInput: '[data-testid="image-upload-input-to-post"]',
      soundInput: '[data-testid="sound-upload-input-to-post"]',
      videoInput: '[data-testid="video-upload-input-to-post"]',
      modalBody: '[data-testid="create-post-body"]',
      loading: '[data-testid="create-post-loading"]',
      snackbar: '[data-testid="snackbar"]',
    };

    cy.intercept("POST", "**/api/content").as("createPostRequest");

    // 2. Act
    cy.visit(postUrl);
    cy.get(selectors.inputBtn).click();

    cy.get(selectors.modal).should("be.visible");
    cy.get(selectors.submitBtn).should("be.disabled");
    cy.get(selectors.textarea).should("have.value", "");

    cy.get(selectors.textarea)
      .type(postTextContent)
      .should("have.value", postTextContent);
    cy.get(selectors.imageInput).selectFile(fixtures.image, { force: true });
    cy.get(selectors.soundInput).selectFile(fixtures.sound, { force: true });
    cy.get(selectors.videoInput).selectFile(fixtures.video, { force: true });

    cy.get(selectors.modalBody).scrollTo("bottom", { duration: 500 });
    cy.get(selectors.submitBtn).should("be.enabled").click();

    // 3. Assert
    cy.get(selectors.loading).should("be.visible");
    cy.wait("@createPostRequest", { timeout: 30000 })
      .its("response.statusCode")
      .should("eq", 201);

    cy.get(selectors.modal).should("not.exist");
    cy.get(selectors.snackbar).should("be.visible");
    cy.get(selectors.snackbar, { timeout: 5000 }).should("not.exist");
  });

  // blank input protection
  it("Should disable the button if there are no content provided", () => {
    cy.visit("http://localhost:5000/app/profile");
    cy.get('[data-testid="create-post-input-button"]').click();
    cy.get('[data-testid="create-post-button"]').should("be.disabled");
    cy.wait(1500);
  });

  // Alert protect editing content
  it("Should appear the notification if click close the modal", () => {
    cy.visit("http://localhost:5000/app/profile");
    cy.get('[data-testid="create-post-input-button"]').click();
    cy.get('[data-testid="close-modal-button"]').click();
    cy.get('[data-testid="close-modal-alert"]').should("be.visible");
    cy.wait(1500);
  });

  // Safety close modal
  it("Should close the modal if clicking on the close modal button", () => {
    cy.visit("http://localhost:5000/app/profile");
    cy.get('[data-testid="create-post-input-button"]').click();
    cy.wait(800);
    cy.get('[data-testid="close-modal-button"]').click();
    cy.wait(800);
    cy.get('[data-testid="close-confirm-button"]').click();
  });

  // Error occurs notify using a popup
  it("Should appear popup to notify the error", () => {
    // 1. Arrange
    const postUrl = "http://localhost:5000/app/profile";
    const toxicContent = "fuck";

    const selectors = {
      inputBtn: '[data-testid="create-post-input-button"]',
      modal: '[data-testid="create-post-modal"]',
      submitBtn: '[data-testid="create-post-button"]',
      textarea: '[data-testid="post-editor-textarea"]',
      loading: '[data-testid="create-post-loading"]',
      popup: '[data-testid="popup"]',
    };

    cy.intercept("POST", "**/api/content").as("createPostRequest");

    // 2. Act
    cy.visit(postUrl);
    cy.get(selectors.inputBtn).click();

    cy.get(selectors.modal).should("be.visible");
    cy.get(selectors.submitBtn).should("be.disabled");

    cy.get(selectors.textarea)
      .type(toxicContent)
      .should("have.value", toxicContent);
    cy.get(selectors.submitBtn).should("be.enabled").click();

    // 3. Assert
    cy.get(selectors.loading).should("be.visible");
    cy.wait("@createPostRequest", { timeout: 30000 })
      .its("response.statusCode")
      .should("eq", 400);
    cy.get(selectors.popup).should("be.visible");
  });

  // Emoji input
  it("Should type emoji correctly", () => {
    // 1. Arrange
    const postUrl = "http://localhost:5000/app/profile";

    const selectors = {
      inputBtn: '[data-testid="create-post-input-button"]',
      modal: '[data-testid="create-post-modal"]',
      emojiBtn: '[data-testid="emoji-popup-button"]',
      popoverEmoji: '[data-testid="popover-emoji"]',
      submitBtn: '[data-testid="create-post-button"]',
      loading: '[data-testid="create-post-loading"]',
    };

    cy.intercept("POST", "**/api/content").as("createPostRequest");

    // Helper function to pick a random emoji
    const getRandomEmoji = () => {
      const categories = Object.keys(EMOJI) as Array<keyof typeof EMOJI>;
      const randomCategory =
        categories[Math.floor(Math.random() * categories.length)];
      const emojiList = EMOJI[randomCategory];
      const randomEntry =
        emojiList[Math.floor(Math.random() * emojiList.length)];
      return randomEntry.char;
    };

    // 2. Act
    cy.visit(postUrl);
    cy.get(selectors.inputBtn).click();
    cy.get(selectors.modal).should("be.visible");
    cy.get(selectors.emojiBtn).click();

    // Enter 5 random emojis one by one
    for (let i = 0; i < 5; i++) {
      const randomEmoji = getRandomEmoji();
      cy.get(`[data-testid="${randomEmoji}"]`).click();
      cy.wait(500);
    }

    cy.get(selectors.popoverEmoji).click();
    cy.get(selectors.submitBtn).should("be.enabled").click();

    // 3. Assert
    cy.get(selectors.loading).should("be.visible");
    cy.wait("@createPostRequest", { timeout: 30000 })
      .its("response.statusCode")
      .should("eq", 201);
  });
});
