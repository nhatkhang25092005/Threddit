import {
  useState,
  createContext,
  useMemo,
  createElement,
  useRef,
  type ComponentType,
  type ReactNode
} from "react";
import { NOTIFY_MAP, LABEL } from "./const";
import createPopup from "./handlers/createPopup";
import createSnackbar from './handlers/createSnackbar'
import  createWithLoading from './handlers/createWithLoading'
import createLoading from './handlers/createLoading'
import createCustomModal from './handlers/createCustomModal'
import { createSnackbarLoading } from "./handlers/createSnackbarLoading";

type NotifyPlugin = (open: boolean) => void

export type NotifyApi = {
  snackbar:(message?: string, duration?:number, type?:string) => void
  popup:(
    title?: string,
    message?: string,
    buttonLabel?: string,
    callback?:(()=> void) | null
  ) => void
  loading:(open?:boolean) => void
  withLoading: <T>(task:() => Promise<T>,  plugin?:NotifyPlugin) => Promise<T>
  customModal : <P extends object>(component: ComponentType<P>, props:P) => void
  snackbarLoading: (message:string, isLoading:boolean) => void
}

type NotifyContextValue = {
  notify: NotifyApi;
};

type NotifyProviderProps = {
  children: ReactNode;
};

type NotifyState =
  | null
  | {
      type: keyof typeof NOTIFY_MAP;
      open?: boolean;
      props?: Record<string, unknown>;
      containerId?: string | null;
    };


const NotifyContext = createContext<NotifyContextValue | null>(null)
function NotifyProvider({children}:NotifyProviderProps){

  const [notif, setNotif] = useState<NotifyState>(null)
  const containerRef = useRef<string | null>(null)

  const notify = useMemo<NotifyApi>(()=>({
    /**
     * Show a snackbar at the left bottom of the screen
     * @param {*} message
     * @param {*} duration
     */
    snackbar: (message:string = LABEL.NO_CONTENT, duration:number = 3000, type='success') =>
      createSnackbar({message, duration, type}, setNotif)
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
    withLoading: async <T,>(
      task: () => Promise<T>,
      plugin = notify.loading
    ):Promise<T> =>await createWithLoading(task, plugin),
  
    /**
     * Creates a custom modal with notification handling.
     *
     * @param {React.Component} component - A React component that will be rendered inside the modal.
     * @returns {JSX.Element} The custom modal containing the provided component.
     */
    customModal: (component, props) => {
      const currentContainerId = containerRef.current
      createCustomModal(setNotif, createElement(component, props), currentContainerId)
    },
    
    /**
     * Show a snackbar with a loading indicator.
     * Useful for displaying a loading state while an async task is running.
     *
     * @param {string} message - Message displayed inside the snackbar.
     * @param {boolean} isLoading - Controls whether the loading snackbar is visible.
     * @returns {void}
     */
    snackbarLoading: (message, isLoading) => createSnackbarLoading(message, isLoading, setNotif)
    
  }),[])

  const close = () => setNotif(prev => prev ? {...prev, open:false} : null)

  const NotifyComponent = notif
    ? (NOTIFY_MAP[notif.type] as ComponentType<{
      open:boolean
      onClose:() => void
    } & Record<string, unknown>>)
    : null

  const render = () => {
    if(!notif || !NotifyComponent) return
    const element = (
      <NotifyComponent
        open = {notif.open}
        onClose={close}
        {...notif.props}
      />
    )
    return element
  }

  return(
    <NotifyContext.Provider value={{notify}}>
      {children}
      {render()}
    </NotifyContext.Provider>
  )
}

export {NotifyContext, NotifyProvider}