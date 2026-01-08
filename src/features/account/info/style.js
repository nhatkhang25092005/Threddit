import { responsive } from "../../../utils/responsive";

export const style = {
  surface:{
    ...responsive.px(1,2,3),
    display:'flex',
    flexDirection:'column',
    ...responsive.width()
  },
  title:{
    mx:'auto',
    fontStyle:'italic',
    mb:'1rem',
    fontSize:responsive.fontSize()
  },
  field_block:{
    display:'flex',
    flexDirection:'row',
    gap:1,
    alignItems:'center'
  },
  label:{
    fontStyle:'italic',
    fontWeight:'bold',
    fontSize:'14px'
  },
  button:{
    width:'fit-content',
    mx:'auto',
    mt:'2rem',
    transition:'transform 0.1s ease-in-out',
    '&:hover':{
      transform:'scale(1.02)'
    }
  },
}