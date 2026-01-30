import {Box, List, ListItem, Typography, Button, Link, CircularProgress} from '@mui/material'
import Notification from './Notification'
import { notification } from '../../../constant/text/vi/notification.text'
import useInfiniteScroll from '../../../hooks/useInfiniteScroll'
import { routes } from '../../../constant'
import { useNavigate } from 'react-router-dom'
export default function NotificationList({getAll,notifications = [], fetch, loading, setGetAll, hasMore, isPage = false}){
  const scrollRef = useInfiniteScroll({
    hasMore:hasMore,
    loading:loading,
    onLoadMore:fetch
  })

  const navigate = useNavigate()

  return(
  <Box sx={{display:'flex', flexDirection:'column', alignItes:'flex-end',}}>
    {!isPage && <Link onClick={()=>navigate(routes.notification,{replace:true})} variant='primary' sx={{textAlign:'right'}}>{notification.popover.button.see_all}</Link>}
    <List sx={{display:'flex', flexDirection:'column', p:0}}>
    {notifications.length > 0
      ? <Box sx={{display:'flex', flexDirection:'column'}}>
        {notifications.map(
          item => (
            <ListItem sx={{p:0}} key={item.id}>
              <Notification data={item}/>
            </ListItem>
          )
        )}
        {getAll && <div ref={scrollRef}/>}
        {!getAll && hasMore && <Button onClick={()=>setGetAll(true)} variant='secondary' sx={{mx:'auto', mt:'1rem'}}>{notification.popover.button.more}</Button>}
        {loading && <CircularProgress size={24} sx={{mx:'auto', mt:'1rem', mb:'0.5rem'}} color='white'/>}
      </Box>
      : <Typography sx={{mx:"auto", mt:'4rem', mb:'4rem'}}>{notification.popover.no_content}</Typography>
    }
    </List>
  </Box>
  )
}