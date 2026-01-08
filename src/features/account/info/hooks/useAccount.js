import {useEffect } from "react";
import { services } from "../../account.service";
import {useNotify} from '../../../../hooks/useNotify'
import {modal} from '../../../../constant/text/vi/modal'
import { useCallback } from "react";
import { getInfoLoading, setAccountData } from "../actions";
import useAccountContext from "./useAccountContext.js";
export default function useAccount() {

  const notify = useNotify()
  const {state, dispatch} = useAccountContext()

  const getAccountInfo = useCallback(async () => {
    const res = await notify.withLoading(
      () => services.getUserInfo(),
      (bool) => dispatch(getInfoLoading(bool))
    )

    if(!res.success){
      notify.popup(modal.title.error, res.message)
      return
    }

    dispatch(setAccountData(res.data))
  },[notify, dispatch])

  useEffect(()=>{
    getAccountInfo()
  },[getAccountInfo])

  return {
    data: state,
    loading : state.loading.get_info
  }
}
