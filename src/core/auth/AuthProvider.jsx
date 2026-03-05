import { createContext, useState, useMemo } from "react"
import { matchPath, useLocation } from "react-router-dom"

const AuthContext = createContext()
const AUTH_KEY = 'actor'

function AuthProvider({ children }) {
  const location = useLocation()

  // ===== state =====
  const [user, setUserState] = useState(() => {
    const saved = localStorage.getItem(AUTH_KEY)
    return saved ? JSON.parse(saved) : null
  })

  // ===== actions =====
  const setUser = (profile) => {
    console.log(`${profile.avatarUrl}?t=${Date.now()}`)
    if (!profile) return
    setUserState({...profile, avatarUrl:`${profile.avatarUrl}?t=${Date.now()}`})
    localStorage.setItem(AUTH_KEY, JSON.stringify(profile))
  }

  // clear on logout
  const clearUser = () => {
    setUserState(null)
    localStorage.removeItem(AUTH_KEY)
  }

  const profileRouteMatch = useMemo(
    () => (
      matchPath('/app/profile/:username', location.pathname)
      ?? matchPath('/app/profile', location.pathname)
    ),
    [location.pathname]
  )

  const paramsUsername = profileRouteMatch?.params?.username ?? null
  const profileUsername = profileRouteMatch
    ? (paramsUsername ?? user?.username ?? null)
    : null

  // check owner by any username
  const isOwnerByUsername = (username) => user?.username === username

  // owner state for current profile route
  const isOwner = profileRouteMatch
    ? (paramsUsername ? isOwnerByUsername(paramsUsername) : true)
    : false

  // update username only
  const updateDisplayname = (displayName) => {
    setUserState(prev => {
      if (!prev) return prev
      const next = { ...prev, displayName }
      localStorage.setItem(AUTH_KEY, JSON.stringify(next))
      return next
    })
  }

  // update avatar only
  const updateAvatar = (avatarUrl) => {
    setUserState(prev => {
      if (!prev) return prev
      const next = { ...prev, avatarUrl:`${avatarUrl}?t=${Date.now()}`}
      localStorage.setItem(AUTH_KEY, JSON.stringify(next))
      return next
    })
  }

  // ===== value =====
  const value = useMemo(() => ({
    user,
    profileUsername,
    setUser,
    clearUser,
    isOwnerByUsername,
    isOwner,
    updateDisplayname,
    updateAvatar
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [user, profileUsername, isOwner])

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }
