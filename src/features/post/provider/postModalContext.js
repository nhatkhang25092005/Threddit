import { createModalSystem } from "../../../core/modal/createModalSystem"

export const { ModalContext: PostModalContext, useModal: usePostModal } =
  createModalSystem("PostModal")