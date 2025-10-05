export default class Result{
    constructor(type=null, title=null, message, fallback = null){
        this.title = title
        this.type = type,
        this.message = message
        if(fallback){ if(typeof fallback !== "function") console.error("fallback must be a function") } 
        this.fallback = fallback
    }
}