import Provider from "./provider/Provider"
import {Box} from '@mui/material'
import { style } from "./style"
import Header from "./components/Header"
import { useParams } from "react-router-dom"
import { memo } from "react"
import MainProfile from "./components/MainProfile"
import TabsController from "../../components/layout/TabsController"
import Follow from "../follow/Follow"
import FollowProvider from '../follow/provider/FollowProvider'
import {profile} from '../../constant/text/vi/profile.text'

const Content = memo(function Content() {
  return (
    <Box sx={style.container}>
      <Header/>
      <TabsController sx={style.body.tabs_controller}>
        <MainProfile label={profile.tab_label.profile}/>
        <Follow label={profile.tab_label.follow}/>
      </TabsController>
    </Box>
  )
})


export default function Profile(){
  const {username} = useParams()
  return(
    <Provider username={username}>
      <FollowProvider>
        <Content/>
      </FollowProvider>
    </Provider>
  )
}