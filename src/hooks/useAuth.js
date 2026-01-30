import { useContext } from "react";
import {AuthContext} from '../provider/AuthProvider'

/**
 * Custom hook to access authentication context.
 *
 * Provides access to the current user's authentication state and related actions.
 * Must be used within an AuthProvider component.
 *
 * @returns {Object} Auth context object
 * @returns {string|null} returns.currUsername - The current logged-in username, or null if not authenticated
 * @returns {Function} returns.setUser - Function to set the current user and persist to localStorage
 * @returns {Function} returns.clearUser - Function to clear the current user and remove from localStorage
 * @returns {Function} returns.isOwner - Function to check if a given username matches the current user
 *
 * @throws {Error} Throws an error if used outside of AuthProvider
 *
 * @example
 * function Profile() {
 *   const { currUsername, isOwner, clearUser } = useAuth()
 *
 *   return (
 *     <div>
 *       <h1>Welcome, {currUsername}</h1>
 *       {isOwner('john') && <button>Edit Profile</button>}
 *       <button onClick={clearUser}>Logout</button>
 *     </div>
 *   )
 * }
 *
 * @example
 * // Check if viewing own profile
 * function UserProfile({ username }) {
 *   const { isOwner } = useAuth()
 *
 *   return (
 *     <div>
 *       {isOwner(username) ? 'This is your profile' : `Viewing ${username}'s profile`}
 *     </div>
 *   )
 * }
 */
export default function useAuth() {
  const ctx = useContext(AuthContext)
  if(!ctx) throw new Error('AuthContext must be in a AuthProvider')
  return ctx
}
