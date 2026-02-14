import { useReducer, useMemo, useState } from "react"
import { Modal, Fade } from "@mui/material"

import { ProfileContext } from "./context"
import { reducer, initState } from "../reducer"
// import { followLoading, followSuccess, unfollowSuccess } from "../actions"

import { services } from "../services"

import { createModalManager, MODALS } from "../utils/modalManager"

import useAuth from "../../../hooks/useAuth"
import {
  useGetProfile,
  useBackground,
  useAvatar,
  useEditProfile,
} from "../hooks"

export default function ProfileProvider({ children, username = null }) {
  /* ---------------- state ---------------- */
  const [state, dispatch] = useReducer(reducer, initState)
  const [modal, setModal] = useState({
    open: false,
    type: null,
    props: null,
  })

  const ModalComponent = modal.type ? MODALS[modal.type] : null

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

  const modalManager = useMemo(() => createModalManager(setModal),[])

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
        modalManager,
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
      modalManager,
    ]
  )

  return (
    <ProfileContext.Provider value={value}>
      {children}
      <Modal
        open={modal.open}
        sx={{ zIndex: 1600 }}
        onClose={modalManager.closeModal}
        closeAfterTransition
      >
        <Fade in={modal.open}>
          <div>
            {ModalComponent && (
              <ModalComponent
                {...modal.props}
                onClose={modalManager.closeModal}
              />
            )}
          </div>
        </Fade>
      </Modal>
    </ProfileContext.Provider>
  )
}
