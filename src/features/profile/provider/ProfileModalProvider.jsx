import ModalProvider from "../../../core/modal/ModalProvider"
import { ProfileModalContext } from "./profileModalContext"

export default function ProfileModalProvider(props) {
  return <ModalProvider {...props} Ctx={ProfileModalContext} />
}