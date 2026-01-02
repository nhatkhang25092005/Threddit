import {LABEL} from "@/provider/notify/const"
export default function createPopup(props, setNotif){
  setNotif(null)
  if(props.message === LABEL.NO_CONTENT) console.warn('notify.popup(title, message, buttonLabel): message is unexpected to be empty')
  if(props.title === LABEL.NO_TITLE) console.warn('notify.popup(title, message, buttonLabel): title is unexpected to be empty')
  setNotif({
    open:true,
    type:'popup',
    props:{
      title: props.title,
      content:props.message,
      btnTitle:props.buttonLabel,
      onConfirm:props.callback
    }
  })
}