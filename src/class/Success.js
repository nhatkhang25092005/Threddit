export default class Success{
    constructor(type, title, message, fallback = null){
        this.type = type
        this.title = title
        this.message = message

        if(fallback){ if(typeof fallback !== "function") console.error("fallback must be a function") } 
        this.fallback = fallback
    }
}