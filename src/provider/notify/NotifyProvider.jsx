import { useState, createContext, useMemo } from "react";
import { NOTIFY_MAP, LABEL } from "./const";
import createPopup from "./handlers/createPopup";
import createSnackbar from './handlers/createSnackbar'
import  createWithLoading from './handlers/createWithLoading'
import createLoading from './handlers/createLoading'
const NotifyContext = createContext(null)
function NotifyProvider({children}){

  const [notif, setNotif] = useState(null)

  const notify = useMemo(()=>({
    /**
     * Show a snackbar at the left bottom of the screen
     * @param {*} message
     * @param {*} duration
     */
    snackbar : (message = LABEL.NO_CONTENT, duration = 3000) =>
      createSnackbar({message,duration}, setNotif)
    ,
    /**
     * Show a Popup modal onto the screen
     * @param {*} title
     * @param {*} message
     * @param {*} buttonLabel
     */
    popup: (title = LABEL.NO_TITLE, message = LABEL.NO_CONTENT, buttonLabel = LABEL.NO_BTN_LABEL, callback = null) =>
      createPopup({title,message,buttonLabel,callback}, setNotif)
    ,
    /**
     * Activate the loading screen on to the screen
     * @param {*} open
     * @returns
     */
    loading: (open = false) => createLoading(open, setNotif),

    /**
     *
     * @param {function} task
     * @param {function} plugin
     * @returns
     */
    withLoading: async (task, plugin = notify.loading)=> await createWithLoading(task, plugin)
  }),[])

  const close = () => setNotif(prev => prev ? {...prev, open:false} : null)

  const NotifyComponent = notif && NOTIFY_MAP[notif.type]
  return(
    <NotifyContext.Provider value={{notify}}>
      {children}
      {notif && NotifyComponent &&
        <NotifyComponent
          open = {notif.open}
          {...notif.props}
          onClose={close}
        />
      }
    </NotifyContext.Provider>
  )
}

export {NotifyContext, NotifyProvider}