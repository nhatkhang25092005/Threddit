// utils/modalManager.js
import ConfirmBackground from "../components/ConfirmBackground"
import ConfirmAvatar from "../components/ConfirmAvatar"
import EditBio from "../components/EditBio"
import ConfirmBlockModal from "../components/ConfirmBlockModal"

export const MODALS = Object.freeze({
  confirm_background: ConfirmBackground,
  confirm_avatar: ConfirmAvatar,
  edit_bio: EditBio,
  confirm_block: ConfirmBlockModal
})

export function createModalManager(setModal) {
  return {
    openModal(type, props = {}) {
      if (!MODALS[type]) {
        console.warn(`No modal type "${type}" found`)
        return
      }
      setModal({ open: true, type, props })
    },
    closeModal() {
      setModal({ open: false, type: null, props: null })
    },
  }
}
