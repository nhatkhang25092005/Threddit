import { useContext } from 'react'
import { BlockContext } from '../context'


export function useBlockContext() {
  const context = useContext(BlockContext)
  
  if (!context) {
    throw new Error(
      'useBlockContext phải được sử dụng trong BlockProvider'
    )
  }
  
  return context
}
