export const AUTH_TEXT = {
  login: {
    title: "Log in",
    email_field: "Email",
    password_field: "Password",
    submit: "Log in",
    forgot_password: "Forgot password",
    register_ask: "Don't have an account?",
    register_path: "Register",
    error: {
      pattern_email: "Email is invalid",
      pattern_password:
        "Password must include uppercase, lowercase, number, and special character, minimum 8 characters",
    },
  },

  register: {
    title: "Register",
    submit: "Register",
    login_ask: "Already have an account?",
    login_path: "Log in",
    label: {
      username: "Username",
      email: "Email",
      display_name: "Display name",
      password: "Password: uppercase, lowercase, number, special character, minimum 8 characters",
      repass: "Re-enter password",
      gender: "Gender",
      male: "Male",
      female: "Female",
      other: "Other",
      date_of_birth: "Date of birth",
    },
    name: {
      username: "username",
      email: "email",
      display_name: "display_name",
      password: "password",
      repass: "repass",
      gender: "gender",
      date_of_birth: "date_of_birth",
    },
    error: {
      not_match: "Passwords do not match",
      pattern_email: "Email is invalid",
      pattern_password:
        "Password must include uppercase, lowercase, number, and special character, minimum 8 characters",
      username_space: "Username cannot contain spaces",
    },
  },

  verify_account: {
    title: "Verify account",
    description:
      "Please enter the code we sent to your email. After successful verification, this account will be officially registered",
    submit: "Verify",
    resend_ask: "Didn't receive the code?",
    resend_send: "Resend code",
    resend_countdown: (second) => `Code sent! Resend after ${second}s`,
    error: {
      pattern_email: "Email is invalid",
      pattern_otp:"OTP is invalid"
    },
  },

  resent:{
    error:{
      pattern_email:"Email is invalid"
    }
  },

  forgot: {
    title: "Forgot password",
    message: "Please provide your email. A verification code will be sent to this email",
    email_field: "Email",
    submit: "Send request",
    error: {
      pattern_email: "Email is invalid",
    },
  },

  verify: {
    title: "Set a new password",
    description:
      "Please set a new password and enter the verification code we sent to your email",
    submit: "Verify",
    label: {
      new_pass: "New password",
      confirm: "Confirm new password",
    },
    name: {
      new_pass: "newPassword",
      confirm: "confirmPassword",
    },
    error: {
      pattern_password:
        "Password must include uppercase, lowercase, number, and special character, minimum 8 characters",
      not_match: "Passwords do not match",
    },
  },

  branding: {
    welcome_title: "Welcome to Threddit",
  },

  reset_password: {
    back_to_forgot_password_page: "Back to forgot password page",
    go_to_login_page: "Go to login page",
  },
}
