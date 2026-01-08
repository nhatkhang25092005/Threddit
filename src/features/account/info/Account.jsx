import Surface from '../../../components/common/Surface.jsx'
import {Typography, Box,Button, Skeleton} from '@mui/material'
import {account} from '../../../constant/text/vi/account.text.js'
import { style } from './style'
import useAccount from './hooks/useAccount.js'
import {Username, Method, Email} from './components/index.js'
import Provider  from './provider/Provider.jsx'
import useAccountContext from './hooks/useAccountContext.js'
const fields = {
  username:Username,
  email:Email,
  method:Method
}

function AccountContent() {
  const {data, loading} = useAccount()
  const {openDeleteModal} = useAccountContext()
  return(
    <Surface sx={style.surface}>
      <Typography variant='title' sx={style.title}>{account.title}</Typography>
      {
        Object.entries(fields).map(([field, component])=>{
          const FieldComponent = component
          return(
            <Box
              key = {field}
              sx = {style.field_block}
            >
              {loading
                ? <Skeleton variant='text' width={'100%'}/>
                : <FieldComponent sx={style.label} value={data?.[field.toLowerCase()]}/>
              }
            </Box>
          )
        })
      }
      <Button variant='warning' sx={style.button} onClick={openDeleteModal}>{account.button}</Button>
    </Surface>
  )
}

export default function Account(){
  return(
    <Provider>
      <AccountContent/>
    </Provider>
  )
}
