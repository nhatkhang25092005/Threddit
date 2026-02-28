import { useReducer, useMemo, useEffect } from "react"

import { ProfileContext } from "./context"
import { reducer, initState } from "../reducer"
import { profileOrchestrateActions } from "../actions"

import { services } from "../services"

import {MODALS} from '../modals'

import useAuth from "../../../core/auth/useAuth"
import {
  useGetProfile,
  useBackground,
  useAvatar,
  useEditProfile,
} from "../hooks"

import ProfileModalProvider from "./ProfileModalProvider"
import { useOrchestrate } from "../../../core/orchestrate/useOrchestrate"

export default function ProfileProvider({ children, username = null }) {
  /* ---------------- state ---------------- */
  const [state, dispatch] = useReducer(reducer, initState)
  const { registerDispatch, unregisterDispatch } = useOrchestrate()

  /* ---------------- auth / owner ---------------- */
  const { isOwner, isOwnerByUsername, updateAvatar, updateDisplayname } = useAuth()
  const owner = username ? isOwnerByUsername(username) : isOwner

  /* ---------------- follow sync API ---------------- */
  const profileSync = useMemo(
    () => services.createFollowSync(dispatch),
    [dispatch]
  )

  const friendSync = useMemo(
    () => services.createFriendSync(dispatch),
    [dispatch]
  )

  useEffect(() => {
    registerDispatch('profile', dispatch, profileOrchestrateActions)
    return () => { unregisterDispatch('profile') }
  }, [registerDispatch, unregisterDispatch, dispatch])


  /* ---------------- side-effect hooks ---------------- */
  useGetProfile(dispatch, username)
  const { presignBackgroundImage, confirmBackgroundImage } = useBackground(dispatch)
  const { presignAvatar, confirmAvatar } = useAvatar(dispatch)
  const { editBio, editDisplayname } = useEditProfile(dispatch)

  /* ---------------- wrapped actions ---------------- */
  const avatarActions = useMemo(
    () => ({
      presignAvatar,
      confirmAvatar: async (...args) => {
        const avatarUrl = await confirmAvatar(...args)
        if (owner && avatarUrl) updateAvatar(avatarUrl)
      },
    }),
    [presignAvatar, confirmAvatar, owner, updateAvatar]
  )

  const infoActions = useMemo(
    () => ({
      editBio,
      editDisplayname: async (...args) => {
        const newName = await editDisplayname(...args)
        if (owner && newName) updateDisplayname(newName)
      },
    }),
    [editBio, editDisplayname, owner, updateDisplayname]
  )

  /* ---------------- provider value ---------------- */
  const value = useMemo(
    () => ({
      isOwner: owner,
      state,
      actions: {
        friendSync,
        profileSync,
        background: {
          presignBackgroundImage,
          confirmBackgroundImage,
        },
        avatar: avatarActions,
        info: infoActions,
        // modalManager,
      },
    }),
    [
      owner,
      state,
      profileSync,
      friendSync,
      presignBackgroundImage,
      confirmBackgroundImage,
      avatarActions,
      infoActions,
    ]
  )

  return (
    <ProfileContext.Provider value={value}>
      <ProfileModalProvider modals={MODALS}>
        {children}
      </ProfileModalProvider>
    </ProfileContext.Provider>
  )
}
