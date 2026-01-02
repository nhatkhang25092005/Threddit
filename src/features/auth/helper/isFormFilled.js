export const isFormFilled = (form) => {
  return Object.values(form).every(
    value => value !== '' && value !== null && value !== undefined
  )
}
