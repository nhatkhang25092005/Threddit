import { useMemo } from "react";
import {createTheme, ThemeProvider} from '@mui/material/styles'
import { paletteTheme } from "./paletteTheme";
import { typographyTheme } from "./typographyTheme";
import { componentsTheme } from "./componentsTheme";
import { ThemeContext }  from "./ThemeContext";
import { CssBaseline } from "@mui/material";
import { useThemeMode } from "./useThemeMode";

export default function MainThemeProvider({children}){
  const {mode, toggleTheme} = useThemeMode()
  
  const theme = useMemo(
    ()=>
      createTheme({
        palette:paletteTheme[mode],
        typography:typographyTheme,
        components:componentsTheme[mode]
      }),[mode]
  )

  return(
    <ThemeContext.Provider value={{mode, toggleTheme}}>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}
/**
  * palette,
    typography,
    components,
    spacing,
    breakpoints,
    shape,
    shadows,
    transitions,
    zIndex,
    direction,
    mixins
 */