export default function createLoading(open, setNotif){
  if(!open){
    setNotif(null)
    return
  }
  setNotif({type:'loading'})
}