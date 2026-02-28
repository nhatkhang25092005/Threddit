import ModalProvider from "../../../core/modal/ModalProvider"
import { PostModalContext } from "./postModalContext"

export default function PostModalProvider(props) {
  return <ModalProvider {...props} Ctx={PostModalContext} />
}