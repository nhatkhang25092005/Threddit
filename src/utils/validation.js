import nullChecker from "./nullChecker";
import { ERRORS } from "../constant";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
const otpPattern = /^\d{6}$/

/**
 * Creates an object that maps each field name to a "null field" error message.
 *
 * @function wrapField
 * @param {string[]} fields - An array of field names to check for null or missing values.
 * @returns {Object} An object where each key is a field name, and each value is the constant error message `ERRORS.NULL_FIELD`.
 *
 * @example
 * // Example usage:
 * const missingFields = wrapField(["email", "password"]);
 * console.log(missingFields);
 * // Output:
 * // {
 * //   email: "Field cannot be null",
 * //   password: "Field cannot be null"
 * // }
 *
 * @description
 * This helper function is useful for generating standardized error objects
 * when validating form data. It takes an array of field names and returns
 * a corresponding object mapping each field to a shared error message,
 * allowing for consistent and centralized error handling.
 */
function wrapField(fields){
  let nullFields = {}
  fields.forEach((field)=>{
    nullFields[field] = ERRORS.NULL_FIELD
  })
  return nullFields
}
/**
 * Validate registration form data.
 *
 * This function performs two levels of validation:
 * 
 * 1. **Null/empty check** (delegated to `nullChecker`):
 *    - If any field is `null`, `undefined`, or an empty string, an error is returned for each missing field.
 *
 * 2. **Format and business rules validation**:
 *    - `displayName`: Must be between 8 and 32 characters (inclusive).
 *    - `email`: Must match a valid email format.
 *    - `password`: Must be at least 8 characters and contain at least one lowercase, one uppercase,
 *       one number, and one special character.
 *    - `confirmPassword`: Must exactly match `password`.
 *
 * @param {object} data - The registration data object to validate.
 * @param {string} data.displayName - The user’s chosen display name.
 * @param {string} data.email - The user’s email address.
 * @param {string} data.password - The user’s password.
 * @param {string} data.confirmPassword - Confirmation of the password.
 *
 * @returns {boolean | object}
 * - Returns `true` if all validations pass.
 * - Returns an object mapping field names to error messages if any validations fail.
 *
 * @example
 * validRegister({
 *   displayName: "NguyenVanA",
 *   email: "user@example.com",
 *   password: "Abc@1234",
 *   confirmPassword: "Abc@1234"
 * });
 * // => true
 *
 * @example
 * validRegister({
 *   displayName: "abc",
 *   email: "invalidEmail",
 *   password: "123",
 *   confirmPassword: "321"
 * });
 * // => {
 * //   displayName: "Tên người dùng phải từ 8 đến 32 ký tự",
 * //   email: "Email không hợp lệ",
 * //   password: "Mật khẩu phải bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt, tối thiểu 8 ký tự",
 * //   confirmPassword: "Mật khẩu không khớp"
 * // }
 *
 * @example
 * validRegister({
 *   displayName: "",
 *   email: "",
 *   password: "",
 *   confirmPassword: ""
 * });
 * // => {
 * //   displayName: "displayName không được phép rỗng",
 * //   email: "email không được phép rỗng",
 * //   password: "password không được phép rỗng",
 * //   confirmPassword: "confirmPassword không được phép rỗng"
 * // }
 */
export function validRegister(data) {
  const nullCheck = nullChecker(data);
  const errorFields = {}

  if (nullCheck===true) {
    const { displayName, email, password, confirmPassword } = data;
    // display name
    if (displayName.trim().length < 8 || displayName.trim().length > 32) 
        errorFields.displayName = ERRORS.DISPLAYNAME_FORMAT
    
    // email
    if (!emailPattern.test(email.trim())) 
        errorFields.email = ERRORS.EMAIL_FORMAT

    // password
    if (!passwordPattern.test(password.trim())) 
        errorFields.password = ERRORS.PASSWORD_FORMAT

    // confirmPassword
    if (!(password.trim() === confirmPassword.trim()))
         errorFields.confirmPassword = ERRORS.PASSWORD_MATCH

    return !Object.keys(errorFields).length ? true : errorFields
  }

  nullCheck.forEach((field)=>{
    errorFields[field] = `Trường không được phép rỗng`
  })

  return errorFields
}

/**
 * Validates login form data, including null checks and format checks for email and password.
 *
 * @function validLogin
 * @param {Object} data - The login form data to validate.
 * @param {string} data.email - The user's email address.
 * @param {string} data.password - The user's password.
 * @returns {true | Object} 
 * - Returns `true` if all fields are valid.  
 * - Returns an object containing field-specific error messages if validation fails.
 *
 * @example
 * // Example usage:
 * const result = validLogin({ email: "user@example.com", password: "Pass123!" });
 * if (result === true) {
 *   console.log("Login data is valid!");
 * } else {
 *   console.log("Errors:", result);
 * }
 * 
 * @description
 * This function performs two layers of validation:
 * 1. **Null Check:** Uses `nullChecker()` to detect missing fields.  
 *    - If any required fields are missing, it calls `wrapField(nullCheck)` to generate standardized error messages.
 * 2. **Format Validation:**  
 *    - `email` must match `emailPattern` (valid email format).  
 *    - `password` must match `passwordPattern` (e.g., contains letters, numbers, or special characters depending on your rule).
 *
 * It returns `true` if validation passes, or an object mapping invalid fields to error messages if it fails.
 */
export function validLogin(data){
  const nullCheck = nullChecker(data)

  if(nullCheck === true){
    const {email, password} = data
    const errorFields = {}
    //email
    if(!emailPattern.test(email.trim()))
      errorFields.email = ERRORS.EMAIL_FORMAT

    //password
    if(!passwordPattern.test(password.trim()))
      errorFields.password = ERRORS.PASSWORD_FORMAT

    return !Object.keys(errorFields).length ? true : errorFields
  }
  
  return wrapField(nullCheck)
}

/**
 * Validates the email field for a password reset request.
 *
 * @function validResetRequest
 * @param {string} email - The user's email address to validate.
 * @returns {true | Object}
 * - Returns `true` if the email is valid.  
 * - Returns an object `{ email: errorMessage }` if the email is null, empty, or invalid in format.
 *
 * @example
 * // Example usage:
 * const result = validResetRequest("user@example.com");
 * if (result === true) {
 *   console.log("Email is valid!");
 * } else {
 *   console.log("Error:", result);
 *   // e.g. { email: "Invalid email format" }
 * }
 *
 * @description
 * This function is used in the **"Forgot Password"** or **"Reset Password Request"** form
 * to ensure the email field is not empty and follows a valid format.
 *
 * Validation rules:
 * 1. The email must not be `null`, `undefined`, or an empty string.
 * 2. The email must match the regular expression `emailPattern`.
 *
 * It returns a standardized error object using `ERRORS.NULL_FIELD` or `ERRORS.EMAIL_FORMAT`
 * for consistent error handling across forms.
 */
export function validResetRequest(email){
  if(!email || email === "" || email === null) return ({email : ERRORS.NULL_FIELD})
  if(!emailPattern.test(email.trim())) return ({email : ERRORS.EMAIL_FORMAT })
  return true
}

/**
 * Validates the data for verifying a password reset request.
 *
 * @function validVerifyReset
 * @param {Object} data - The form data to validate.
 * @param {string} data.email - The user's email used for password reset.
 * @param {string} data.code - The 6-digit verification code sent to the user.
 * @param {string} data.newPassword - The new password entered by the user.
 * @param {string} data.confirmPassword - The repeated new password for confirmation.
 * @returns {true | Object}
 * - Returns `true` if all fields are valid.  
 * - Returns an object `{ fieldName: errorMessage }` containing validation errors otherwise.
 *
 * @example
 * const result = validVerifyReset({
 *   email: "user@example.com",
 *   code: "123456",
 *   newPassword: "StrongPass123!",
 *   confirmPassword: "StrongPass123!"
 * });
 * 
 * if (result === true) {
 *   console.log("Verification data is valid!");
 * } else {
 *   console.log("Errors:", result);
 *   // Example:
 *   // { code: "OTP must be 6 digits", password: "Invalid password format" }
 * }
 *
 * @description
 * This function validates the **verify reset password** form, ensuring all fields are present and correctly formatted.
 *
 * It performs the following checks:
 * 1. **Null Check:**  
 *    Uses `nullChecker()` to detect missing fields. If any are missing, it returns `wrapField(nullCheck)` to generate uniform "null field" errors.
 * 2. **Email Validation:**  
 *    Checks if `email` matches the `emailPattern`.  
 * 3. **Password Validation:**  
 *    Ensures `newPassword` matches `passwordPattern`.  
 * 4. **OTP (Code) Validation:**  
 *    Ensures `code` matches `otpPattern` — typically `^\d{6}$` for a 6-digit numeric code.  
 * 5. **Password Confirmation:**  
 *    Ensures `confirmPassword` matches `newPassword`.
 *
 * The function returns `true` if all validations pass, otherwise an object mapping invalid fields to specific error messages from `ERRORS`.
 */
export function validVerifyReset(data){
  const nullCheck = nullChecker(data)
  if(nullCheck === true){
    //do something
    const errorFields = {}
    const {email, code, newPassword, confirmPassword} = data

    //email
    if(!emailPattern.test(email.trim()))
      errorFields.email = ERRORS.EMAIL_FORMAT

    // new password
    if (!passwordPattern.test(newPassword.trim())) 
        errorFields.newPassword = ERRORS.PASSWORD_FORMAT
    
    //code
    if (!otpPattern.test(code.trim()))
      errorFields.code = ERRORS.OTP
    
    //confirm password
    if (!(newPassword.trim() === confirmPassword.trim()))
      errorFields.confirmPassword = ERRORS.PASSWORD_MATCH

    return !Object.keys(errorFields).length ? true : errorFields
  }
  return wrapField(nullCheck)
}

/**
 * Validates a username based on specific rules.
 *
 * @function validChangeUsernme
 * @param {string} username - The username to be validated.
 * @returns {true | Object} 
 * - Returns `true` if the username is valid.  
 * - Returns an object `{ username: ERRORS.<TYPE> }` if invalid:
 *   - `ERRORS.NULL_FIELD` → when the username is empty, null, or undefined.
 *   - `ERRORS.DISPLAYNAME_FORMAT` → when the username length is not between 8 and 32 characters.
 *
 * @description
 * This function ensures that the username field meets the following conditions:
 * 1. It must not be null, undefined, or an empty string.
 * 2. It must be between 8 and 32 characters long (after trimming whitespace).
 *
 * @example
 * // Example 1: Valid username
 * validChangeUsernme("JohnDoe123");
 * // → true
 *
 * @example
 * // Example 2: Empty username
 * validChangeUsernme("");
 * // → { username: ERRORS.NULL_FIELD }
 *
 * @example
 * // Example 3: Too short
 * validChangeUsernme("abc");
 * // → { username: ERRORS.DISPLAYNAME_FORMAT }
 */
export function validChangeUsername(username){
  if(!username || username === "" || username === null) return ({username : ERRORS.NULL_FIELD})
  if(username.trim().length < 8 || username.trim().length > 32) return ({username : ERRORS.DISPLAYNAME_FORMAT})
  return true
}

export function validChangePassword(data){
  const nullCheck = nullChecker(data)
  if(nullCheck === true){
    const errorFields = {}
    const {oldPassword, newPassword, confirmPass} = data
    // old password
    if (!passwordPattern.test(oldPassword.trim())) 
        errorFields.oldPassword = ERRORS.PASSWORD_FORMAT
    // new password
    if (!passwordPattern.test(newPassword.trim())) 
        errorFields.newPassword = ERRORS.PASSWORD_FORMAT
    // confirm password
    if (!(newPassword.trim() === confirmPass.trim()))
        errorFields.confirmPass = ERRORS.PASSWORD_MATCH 
    return !Object.keys(errorFields).length ? true : errorFields
  }
  return wrapField(nullCheck)
}
