import { useNotify } from "../../../../hooks/useNotify";
import { services } from "../../account.service";
import { updateUsernameLoading } from "../actions";
import { modal } from "../../../../constant/text/vi/modal";
import {syncUsername} from '../actions.js'
import useAccountContext from "./useAccountContext.js";

const isChange = (before, after) => {
  return before === after ? false : true
}

export default function useUpdateName () {
  const notify = useNotify()
  const {state, dispatch} = useAccountContext()
  const update = async (username) => {

    if(!isChange(state.username, username)) return

    const response = await notify.withLoading(
      ()=>services.updateUsername(username),
      (bool)=>dispatch(updateUsernameLoading(bool))
    )
    if(!response.success){
      notify.popup(modal.title.error, response.message)
      return
    }
    dispatch(syncUsername(username))
    notify.snackbar(response.message, 3000)
  }
  return {
    update,
    username:state.username,
    loading:state.loading.update_username
  }
}