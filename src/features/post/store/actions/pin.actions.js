import { createAction } from "../models/action.model"
import { CLASS_TYPE, PIN } from "../type"

const getContentId = (item) => (
  item?.contentId ?? item?.id ?? item
)

export const pinActions = {
  setPinnedList: (username = null, list = []) => (
    createAction(
      CLASS_TYPE.PIN,
      PIN.SET_PIN_LIST,
      {
        username,
        type: "post",
        idList: (Array.isArray(list) ? list : [])
          .map(getContentId)
          .filter((id) => id != null)
      }
    )
  )
}
