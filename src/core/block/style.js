export const style = {
  surface: {
    width: '100%'
  },
  tabs_controller: {
    bgcolor: 'transparent',
    border: 'none',
    boxShadow: 'none',
    pt: 0
  },
  user_card: {
    icon: {
      cursor: 'pointer',
      transition: 'transform 0.2s ease-in-out',
      '&:hover': {
        transform: 'scale(1.2)'
      }
    }
  },
  container_for_list: {
    box: { position: 'relative' },
    text: { position: 'absolute', top: '-3.5rem', right: 0 }
  }
}
