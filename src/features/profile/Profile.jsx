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
import FriendshipProvider from "../friends/FriendshipProvider"
import Friend from '../friends/Friend'
import BlockList from "./components/BlockList"
import useAuth from "../../core/auth/useAuth"

const Content = memo(function Content(){
  const { isOwner } = useAuth()
  return (
    <Box sx={style.container}>
      <Header/>
      <TabsController
        sx={style.body.tabs_controller}
        urlParams='tab'
        defaultTab='profile'
      >
        <MainProfile label={profile.tab_label.profile} name='profile'/>
        <Follow label={profile.tab_label.follow} name='follow'/>
        <Friend label={profile.tab_label.friend} name='friends'/>
        {isOwner && <BlockList label={profile.tab_label.block} name='block'/>}
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
