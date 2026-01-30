import { createContext, useState, useMemo } from "react"
const AuthContext = createContext()

function AuthProvider({children}){

  const [currUsername, setCurrUsername] = useState(()=>localStorage.getItem('username'))

  const setUser = (name) => {
    setCurrUsername(name)
    localStorage.setItem('username',name)
  }

  const clearUser = () => {
    setCurrUsername(null)
    localStorage.removeItem('username')
  }

  const isOwner = (name) => ( name === currUsername )

  const value = useMemo(() => ({
    setUser,
    clearUser,
    isOwner,
    currUsername
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [currUsername])

  return(
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export {AuthContext, AuthProvider}