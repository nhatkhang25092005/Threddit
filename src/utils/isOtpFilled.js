export const isOtpFilled = (otp) => {
  return typeof otp==='string' &&  otp.trim().length === 6
}