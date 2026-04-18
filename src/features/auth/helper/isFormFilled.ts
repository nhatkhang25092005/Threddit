export const isFormFilled = <T extends Record<string, unknown>>(form: T): boolean => {
  return Object.values(form).every(
    (value) => value !== "" && value !== null && value !== undefined
  )
}
