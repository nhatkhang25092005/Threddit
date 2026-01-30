import { ProfileContext } from "./context"
import { reducer, initState } from "../reducer"
import { useReducer, useMemo, useState } from "react"
import ConfirmBackground from '../components/ConfirmBackground'
import {Modal, Fade} from '@mui/material'
import ConfirmAvatar from "../components/ConfirmAvatar"
import useAuth from "../../../hooks/useAuth"
import EditBio from "../components/EditBio"
import {
  useGetProfile,
  useBackground,
  useAvatar,
  useEditProfile
} from "../hooks"

const content = {
  confirm_background: ConfirmBackground,
  confirm_avatar: ConfirmAvatar,
  edit_bio:EditBio
}
export default function Provider({children, username = null}){

  // state, dispatch, params
  const [state, dispatch] = useReducer(reducer, initState)
  const [open, setOpen] = useState({state:false, type:null, props:null})
  const ModalComponent = open.type ? content[open.type] :null
  const {isOwner} = useAuth()
  const owner = username ? isOwner(username) : true

  // modals
  const modalManager =useMemo(()=>({
    openModal:(type, props = {})=>{
      if(content[type]){setOpen({state:true,type,props})}
      else console.warn(`no modal type ${type} found`)
    },
    closeModal:()=>{
      if(open.state === true){
        setOpen({
          state:false,
          type:null,
          props:null
        })
      }
    }
  }),[open.state])

  // hooks
  useGetProfile(dispatch, username)
  const {presignBackgroundImage, confirmBackgroundImage} = useBackground(dispatch)
  const {presignAvatar, confirmAvatar} = useAvatar(dispatch)
  const {editBio, editDisplayname} = useEditProfile(dispatch)

  // value
  const value = useMemo(()=>({
    isOwner:owner,
    state,
    dispatch,
    actions:{
      background:{
        presignBackgroundImage,
        confirmBackgroundImage
      },
      avatar:{
        presignAvatar,
        confirmAvatar
      },
      info:{
        editBio,
        editDisplayname
      },
      modalManager
    },
  }),[
    state,
    modalManager,
    dispatch,
    presignBackgroundImage,
    confirmBackgroundImage,
    presignAvatar,
    confirmAvatar,
    owner,
    editBio,
    editDisplayname
  ])
  
  return(
    <ProfileContext.Provider value={value}>
      {children}
      <Modal
        open = {open.state}
        sx={{zIndex:1600}}
        onClose={modalManager.closeModal}
        closeAfterTransition
      >
        <Fade in={open.state}>
          <div>
            {ModalComponent && <ModalComponent {...open.props} onClose={modalManager.closeModal}/>}
          </div>
        </Fade>
      </Modal>
    </ProfileContext.Provider>
  )
}