export const account = {
  title: "Account information",
  label: {
    username: "Username:",
    login_username: "Login username",
    email: "Email:",
    method: "Login method:",
  },
  name: {
    username: "username",
    email: "email",
    method: "method",
  },
  button: "Delete account",
  default_data: {
    username: "No information yet",
    email: "No information yet",
    method: "No information yet",
  },

  update_password: {
    title: "Change password",
    label: {
      old: "Old password",
      new: "New password",
      confirm: "Confirm password",
    },
    name: {
      old: "old",
      new: "new",
      confirm: "confirm",
    },
    button: "Confirm",
    error: {
      not_match: "Passwords do not match",
      pattern_password:
        "Password must include uppercase, lowercase, number, and special character, minimum 8 characters",
    },
  },

  delete_request: {
    title: "Delete account",
    message:
      "All of your activity history on Threddit will be lost. Are you sure you want to delete this account?",
    button: "Yes, I want to delete it",
  },

  delete_verify: {
    title: "Verify account deletion",
    message:
      "We have sent a confirmation code to your email. If you are sure you want to delete the account, please enter the code here",
    button: "Confirm",
  },
}
