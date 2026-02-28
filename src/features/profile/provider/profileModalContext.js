import { createModalSystem } from "../../../core/modal/createModalSystem"

export const {
  ModalContext: ProfileModalContext,
  useModal: useProfileModal,
} = createModalSystem("ProfileModal")