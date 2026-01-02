import { Children, useEffect, useState } from "react";
import {Box} from "@mui/material"
export default function AuthSwitch({active, children}){
  const [prev, setPrev] = useState(null)
  const [current, setCurrent] = useState(active)
  const [direction, setDirection] = useState('left')

  const transitionMap = {
    // Format: 'from->to': 'direction'
    'login->register': 'left',
    'register->login': 'right',
    'login->forgot': 'up',
    'forgot->login': 'down',
    'register->verify': 'left',
    'verify->register': 'right',
  };

  useEffect(()=>{
    console.log(active)
    console.log(current)
    // If a new form come
    if(active !== current){
      const transitionKey = `${current}->${active}`
      const newDirection = transitionMap[transitionKey] || 'left'
      console.log(newDirection)
      setDirection(newDirection)
      setCurrent(active)
      setPrev(current)
    }
  },[active, current])

  const getTransform = (name, isActive,isExit) => {
    if(isActive) return 'translate(0,0)'

    if(isExit){
      switch(direction){
        case 'left': return 'translateX(-100%)'
        case 'right':return 'translateX(100%)'
        case 'up':return 'translateY(-100%)'
        case 'down': return 'translateY(100%)'
        default:return 'translateX(-100%)'
      }
    }

    // Init position
    switch (name) {
      case 'register':return 'translateX(100%)'
      case 'right':return 'translateX(-100%)'
      case 'forgot':return 'translateY(100%)'
      case 'down':return 'translateY(-100%)'
      default:return 'translateX(100%)'
    }
  }

  return(
    <Box sx={{position:'relative', overflow:'hidden',height:'100%', width:'100%'}}>
      {Children.map(children, (child) => {
        const name = child.props.name
        const isActive = name === current
        const isExit = name === prev
        return(
          <Box
            key={name}
            sx={{
              height:"100%",
              display:'flex',
              position:'absolute',
              top:'0',
              left:0,
              right:0,
              bottom:0,
              flexDirection:'column',
              transform:getTransform(name, isActive, isExit),
              opacity:isActive ? 1 : 0,
              transition: "transform 0.4s cubic-bezier(0.4,0,0.2,1), opacity 0.25s ease",
              pointerEvents: isActive ? 'auto' : 'none',
              willChange : 'transform, opacity'
            }}
          >
            {child}
          </Box>
        )})
      }
    </Box>
  )
}