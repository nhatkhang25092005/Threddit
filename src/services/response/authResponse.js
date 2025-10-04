import {DISPLAY} from "../../constant"
export function handleRegisterResponse(response){
    if(response.isOk()) return {}
    else{
        switch(response.displayType){
            case DISPLAY.POPUP : return {}
        }
    }
}