import axiosClient from "../axiosClient";

const authApi = {
  login: (email, password) =>
    axiosClient.post(import.meta.env.VITE_API_LOGIN, { email, password }), // this is example

  register: (email, username, password, confirmedPassword) =>
    axiosClient.post(import.meta.env.VITE_API_REGISTER, {
      email,
      username,
      password,
      confirmedPassword,
    }),

  verify: (email, verificationCode) =>
    axiosClient.post(import.meta.env.VITE_API_VERIFYACCOUNT, {
      email,
      verificationCode,
    }),

  resetRequest : (email)=>
    axiosClient.post(import.meta.env.VITE_API_RESET_PASSWORD,
      {email}
    ),

  verifyResetPassword : (email, verificationCode, newPassword, confirmedNewPassword)=>
    axiosClient.post(import.meta.env.VITE_API_VERIFY_RESET_PASSWORD,
      {email, verificationCode, newPassword, confirmedNewPassword}
    ),
  signout : () => axiosClient.post(import.meta.env.VITE_API_SIGNOUT)

};

export default authApi;
