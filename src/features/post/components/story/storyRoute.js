export function buildStoryRoute(source = 'current', username = null, storyId = null) {
  const storySource = source === 'pinned' ? 'pinned' : 'current'
  const segments = ['/app', 'stories', storySource]

  if (username) {
    segments.push(encodeURIComponent(username))
  }

  if (storyId != null) {
    segments.push(String(storyId))
  }

  return segments.join('/')
}

export function buildProfileRoute(username = null) {
  return username
    ? `/app/profile/${encodeURIComponent(username)}`
    : '/app/profile'
}
