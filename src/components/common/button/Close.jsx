import CloseIcon from '@mui/icons-material/Close';
export default function Close({sx, onClick}){
  return(
    <CloseIcon
      sx={{
        cursor:'pointer',
        transition:'ease-in-out 0.2s',
        '&:hover':{
          transform:'scale(1.2)'
        },
        ...sx}}
      onClick = {onClick}
    />
  )
}