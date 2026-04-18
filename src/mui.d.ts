import '@mui/material/styles'
import '@mui/material/Button'
import '@mui/material/Typography'
import '@mui/material/Divider'
import '@mui/material/CircularProgress'

declare module '@mui/material/styles' {
  interface Palette {
    white: Palette['primary']
  }

  interface PaletteOptions {
    white?: PaletteOptions['primary']
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    primary: true
    secondary: true
    google:true
    warning:true
    dialog:true
    outline:true
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    normal:true
    title:true
    sub:true
    secondary:true
    primary:true
  }
}

declare module '@mui/material/Divider' {
  interface DividerPropsVariantOverrides {
    thick:true
  }
}

declare module '@mui/material/CircularProgress'{
  interface CircularProgressPropsColorOverrides{
    white:true
  }
}
