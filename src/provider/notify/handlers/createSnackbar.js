import {LABEL} from '@/provider/notify/const'
export default function createSnackbar(props, setNotif){
  if(props.message === LABEL.NO_CONTENT) console.warn('notify.snackbar(message, duration): Message is unexpected to be empty')
  setNotif({
    open:true,
    type:'snackbar',
    props:{
      message: props.message,
      duration: props.duration,
      type:props.type
    }
  })
}