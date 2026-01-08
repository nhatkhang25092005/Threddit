export const mapUpdateUsername = (payload) => ({
  username:payload.username
})

export const mapUpdatePassword = (payload) => ({
  oldPassword:payload.old,
  newPassword:payload.new,
  confirmedNewPassword:payload.confirm
})

export const mapDeleteAccountVerify = (payload) => ({
  verificationCode:payload.code
})