export const shouldRetry = (response) => {
  if (response.code === 'ERR_CANCELED') return false
  if (response.status >= 500) return true
  if (!navigator.onLine) return true
  return false
}
