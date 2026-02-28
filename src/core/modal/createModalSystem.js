import { createContext, useContext } from "react";
export function createModalSystem(name = 'Modal'){
  const Ctx = createContext()
  function useModal(){
    const value = useContext(Ctx)
    if (!value) {
      throw new Error(`${name}: useModal must be used within ${name}Provider`)
    }
    return value
  }
  return {ModalContext:Ctx, useModal}
}