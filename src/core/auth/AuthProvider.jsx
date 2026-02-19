import { createContext, useState, useMemo } from "react"

const AuthContext = createContext()
const AUTH_KEY = 'actor'

function AuthProvider({ children }) {

  // ===== state =====
  const [user, setUserState] = useState(() => {
    const saved = localStorage.getItem(AUTH_KEY)
    return saved ? JSON.parse(saved) : null
  })

  // ===== actions =====

  // set full profile (sau login / refetch)
  const setUser = (profile) => {
    if (!profile) return
    setUserState(profile)
    localStorage.setItem(AUTH_KEY, JSON.stringify(profile))
  }

  // clear on logout
  const clearUser = () => {
    setUserState(null)
    localStorage.removeItem(AUTH_KEY)
  }

  // check owner
  const isOwner = (username) =>
    user?.username === username

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
      const next = { ...prev, avatarUrl }
      localStorage.setItem(AUTH_KEY, JSON.stringify(next))
      return next
    })
  }

  // ===== value =====
  const value = useMemo(() => ({
    user,
    setUser,
    clearUser,
    isOwner,
    updateDisplayname,
    updateAvatar
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [user])

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }
