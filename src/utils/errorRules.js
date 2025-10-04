export const errorRules = {
  email: {
    keywords: [/Email/i],
    priority: 1,
  },

  displayName: {
    keywords: [/Tên người dùng/i],
    priority: 2,
  },
  password: {
    keywords: [/Mật khẩu/i],
    priority: 1,
  },
  confirmPassword: {
    keywords: [/Mật khẩu/i, /khớp/i], 
    priority: 2,
    validator: (msg) => msg.includes("khớp"), 
  },
};
