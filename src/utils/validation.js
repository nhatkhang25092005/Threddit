import nullChecker from "./nullChecker";
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
        errorFields.displayName = "Tên người dùng phải từ 8 đến 32 ký tự"
    
    // email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.trim())) 
        errorFields.email = "Email không hợp lệ"

    // password
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
    if (!passwordPattern.test(password.trim())) 
        errorFields.password = "Mật khẩu phải bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt, tối thiểu 8 ký tự"

    // confirmPassword
    if (!(password.trim() === confirmPassword.trim()))
         errorFields.confirmPassword = "Mật khẩu không khớp"

    return !Object.keys(errorFields).length ? true : errorFields
  }

  nullCheck.forEach((field)=>{
    errorFields[field] = `Trường không được phép rỗng`
  })

  return errorFields
}
