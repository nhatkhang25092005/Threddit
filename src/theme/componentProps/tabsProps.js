import { COLOR } from "../color";

export const tabsProps = {
  MuiTabs: {
    styleOverrides: {
      root: ({ theme }) => ({
        '& .MuiTabs-indicator': {
          backgroundColor: COLOR.tabs.indicator[theme.palette.mode]
        },
        '& .MuiTab-root':{
          color:COLOR.tabs.text[theme.palette.mode],
          textTransform:'none',
          '&.Mui-selected': {
            color: COLOR.tabs.text[theme.palette.mode]
          }
        }
      })
    }
  }
}