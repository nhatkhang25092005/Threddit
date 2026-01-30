const   createCustomModal = (setNotif, component, containerId) => {
  containerId
  setNotif(null)
  setNotif({
    type:'customModal',
    open:true,
    containerId:containerId,
    props:{
      children:component
    }
  })
}

export default createCustomModal