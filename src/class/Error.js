export default class Error{
    constructor(type=null, title=null, message){
        this.title = title
        this.type = type,
        this.message = message
    }
}