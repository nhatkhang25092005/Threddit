export const isOtpFilled = (otp: string): boolean => {
  return otp.trim().length === 6
}
