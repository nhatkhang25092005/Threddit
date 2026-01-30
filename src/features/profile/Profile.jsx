import Provider from "./provider/Provider"
import {Box} from '@mui/material'
import { style } from "./style"
import Header from "./components/Header"
import { useParams } from "react-router-dom"
import { memo } from "react"
import MainProfile from "./components/MainProfile"
import TabsController from "../../components/layout/TabsController"
import Follow from "../follow/Follow"

const Content = memo(function Content() {
  return (
    <Box sx={style.container}>
      <Header/>
      <TabsController sx={style.body.tabs_controller}>
        <MainProfile label="Profile"/>
        <Follow label='Follow'/>
      </TabsController>
    </Box>
  )
})


export default function Profile(){
  const {username} = useParams()
  return(
    <Provider username={username}>
      <Content/>
    </Provider>
  )
}