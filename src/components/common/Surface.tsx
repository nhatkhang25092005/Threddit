import {Paper} from '@mui/material'

const variantList = ['auth', 'default', 'modal', 'card']
type SurfaceProps = {
  variant?: 'auth' | 'default' | 'modal' | 'card'
  children: React.ReactNode
  sx?: object
  onClick?: React.MouseEventHandler<HTMLDivElement>,
  "data-testid"?:string
}
const resolveVariant = (v) => {
  if(!variantList.includes(v)){
    console.warn(`variant ${v} is not defined`)
    return 'default'
  }
  else return v
}

export default function Surface({"data-testid": dataTestId = null, variant = 'default', children, sx = {}, onClick=undefined}: SurfaceProps){
  const variantKey = resolveVariant(variant)
  return(
    <Paper
      variant={variantKey}
      sx={sx}
      onClick = {onClick}
      data-testid = {dataTestId}
    >
      {children}
    </Paper>
  )
}