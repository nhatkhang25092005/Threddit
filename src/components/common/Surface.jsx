import {Paper} from '@mui/material'

const variantList = ['auth', 'default', 'modal', 'card']

const resolveVariant = (v) => {
  if(!variantList.includes(v)){
    console.warn(`variant ${v} is not defined`)
    return 'default'
  }
  else return v
}

export default function Surface({variant = 'default', children, sx = {}}){
  let variantKey = resolveVariant(variant)
  return(
    <Paper variant={variantKey} sx={sx}>
      {children}
    </Paper>
  )
}