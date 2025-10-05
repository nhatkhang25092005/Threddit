import { handleSignoutRequest } from "../../../services/request/authRequest"

export default function useProfile(){

    const signout = () => {
        const response = handleSignoutRequest()
        console.log(response)
    }

    return{signout}
}