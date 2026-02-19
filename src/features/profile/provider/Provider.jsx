import { useReducer, useMemo } from "react"

import { ProfileContext } from "./context"
import { reducer, initState } from "../reducer"

import { services } from "../services"

import {MODALS} from '../modals'

import useAuth from "../../../core/auth/useAuth"
import {
  useGetProfile,
  useBackground,
  useAvatar,
  useEditProfile,
} from "../hooks"

import { ModalProvider } from "../../../core/modal"

export default function ProfileProvider({ children, username = null }) {
  /* ---------------- state ---------------- */
  const [state, dispatch] = useReducer(reducer, initState)

  /* ---------------- auth / owner ---------------- */
  const { isOwner, updateAvatar, updateDisplayname } = useAuth()
  const owner = username ? isOwner(username) : true

  /* ---------------- follow sync API ---------------- */
  const profileSync = useMemo(
    () => services.createFollowSync(dispatch),
    [dispatch]
  )

  const friendSync = useMemo(
    () => services.createFriendSync(dispatch),
    [dispatch]
  )

  // const modalManager = useMemo(() => createModalManager(setModal),[])

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
      <ModalProvider modals={MODALS}>
        {children}
      </ModalProvider>
    </ProfileContext.Provider>
  )
}
