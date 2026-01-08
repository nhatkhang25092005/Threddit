import { useReducer, useState } from "react"
import { initState, reducer } from "../reducer"
import { AccountContext } from "./context"
import DeleteAccount from '../../deleteaccount/DeleteAccount'
export default function Provider({children}) {
  const [state, dispatch] = useReducer(reducer, initState())
  const [openDelete, setOpenDelete] = useState(false)

  const value = {
    state,
    dispatch,
    openDeleteModal : () => setOpenDelete(true),
    closeDeleteModal : () => setOpenDelete(false)
  }
  return(
    <AccountContext.Provider value = {value}>
      {children}
      <DeleteAccount open={openDelete} onClose={()=>setOpenDelete(false)}/>
    </AccountContext.Provider>
  )
}