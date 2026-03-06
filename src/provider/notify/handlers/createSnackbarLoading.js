export const createSnackbarLoading = (message, isLoading, setNotif) => {
  if(!message) console.warn('message is null in createSnackbarLoading')
  setNotif({
    type:'snackbar_loading',
    props:{
      message,
      isLoading
    }
  })
}