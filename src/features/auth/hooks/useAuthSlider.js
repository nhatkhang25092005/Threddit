// hooks/useAuthSlider.js
import { useState } from 'react';
const getDirection = (current, form) => {

}

export const useAuthSlider = () => {
  const [direction, setDirection] = useState('left');
  const [current, setCurrent] = useState('login')
  const [next, setNext] = useState(null)
  const [prev, setPrev] = useState(null)


  const navigateTo = (form) => {
    if(form===current) return
    switch(form){
      case 'register':{
        setDirection('left')
        break
      }
      case 'login':{
        setDirection('right')
        break
      }
      case 'forgot':{
        setDirection('up')
        break
      }
      case 'verify':{
        setDirection('up')
        break
      }
    }

    setPrev(current)
    setNext(form)
    
    requestAnimationFrame(()=>setCurrent(form))

    setTimeout(()=>{
      setNext(null)
      setPrev(null)
    },400)
  };

  /**
   * Return the style of the component after render or re-render
   * @param {*} formType
   * @returns
   */
  const getSlideStyle = (form) => {
    // Check the form
    const isCurrent = form === current;
    const isNext = form === next
    const isPrev = form === prev

    // Init the position
    let translateX = '0%';
    let translateY = '0%'

    if(isNext){
      if (direction === 'left') translateX = '100%'
      else if(direction ==='right') translateX = '-100%'
      else if(direction === 'up') translateY = '100%'
    }

    if(isPrev){
      if(direction === 'left') translateX = '-100%'
    }

    console.log({
      formType: form,
      position: 'absolute',
      width: '87%',
      transform: `translate(${translateX}, ${translateY})`,
      transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      opacity: isCurrent ? 1 : 0,
      pointerEvents: isCurrent ? 'auto' : 'none',
      willChange: 'transform',
      display:'flex',
      flexDirection:'column'
    })

    return {
      position: 'absolute',
      width: '87%',
      transform: `translate(${translateX}, ${translateY})`,
      transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      pointerEvents: isCurrent ? 'auto' : 'none',
      willChange: 'transform',
      display:'flex',
      flexDirection:'column'
    };
  };

  return {
    navigateTo,
    getSlideStyle
  };
};