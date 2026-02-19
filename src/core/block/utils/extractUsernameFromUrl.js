export function extractUsernameFromUrl(url) {
  if (!url || typeof url !== 'string') return null

  try {
    let pathname = url
    if (url.startsWith('http://') || url.startsWith('https://')) {
      const parsed = new URL(url)
      pathname = parsed.pathname
    } else {
      /**
       * Nếu là relative → bỏ query + hash thủ công
       */
      pathname = url.split('?')[0].split('#')[0]
    }

    /**
     * Tách segments và loại bỏ empty
     */
    const segments = pathname.split('/').filter(Boolean)

    if (!segments.length) return null

    /**
     * Username là segment cuối
     */
    const username = segments[segments.length - 1]

    return username || null
  } catch (err) {
    console.error('extractUsernameFromUrl error:', err)
    return null
  }
}