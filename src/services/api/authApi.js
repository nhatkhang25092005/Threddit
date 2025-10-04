import axiosClient from "../axiosClient";

const authApi = {
  login: () => axiosClient.post(import.meta.env.VITE_API_LOGIN), // this is example

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
};

export default authApi;
