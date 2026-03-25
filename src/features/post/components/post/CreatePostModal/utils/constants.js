import { composerText } from "../../../../../../constant/text/vi/post/composer.text"

export const POST_MODAL_MODE = Object.freeze({
  CREATE: "create",
  EDIT: "edit",
})

export const DEFAULT_CLOSE_ALERT = Object.freeze({
  title: composerText.post.closeAlert.create.title,
  message: composerText.post.closeAlert.create.message,
})

export const EDIT_CLOSE_ALERT = Object.freeze({
  title: composerText.post.closeAlert.edit.title,
  message: composerText.post.closeAlert.edit.message,
})
