import { useState, useMemo, useCallback } from "react"
import { Modal, Fade } from "@mui/material"

export default function ModalProvider({
  children,
  modals = {},
  zIndex = 1600,
  Ctx = null,
}) {
  if (!Ctx) {
    throw new Error("ModalProvider requires Ctx prop")
  }
  const [modal, setModal] = useState({ open: false, type: null, props: null })

  const openModal = useCallback(
    (type, props = {}) => {
      if (!modals[type]) {
        console.warn(`No modal type "${type}" found`)
        return
      }
      setModal({ open: true, type, props })
    },
    [modals]
  )

  const closeModal = useCallback(() => {
    setModal({ open: false, type: null, props: null })
  }, [])

  const value = useMemo(() => ({
    openModal,
    closeModal,
    modal,
    isModalOpen: Boolean(modal.open),
    modalType: modal.type,
    modalProps: modal.props,
  }), [closeModal, modal, openModal])
  const ModalComponent = modal.type ? modals[modal.type] : null

  return (
    <Ctx.Provider value={value}>
      {children}
      <Modal open={modal.open} sx={{ zIndex }} onClose={closeModal} closeAfterTransition>
        <Fade in={modal.open}>
          <div>
            {ModalComponent && <ModalComponent {...modal.props} onClose={closeModal} />}
          </div>
        </Fade>
      </Modal>
    </Ctx.Provider>
  )
}
