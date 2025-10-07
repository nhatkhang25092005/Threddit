//API Response Format
export default class ApiResponse {

  //constructor to create a response object
  constructor(status, message, data = null, displayType = null) {
    this.status = status ?? 404;
    this.message = message ?? "Unknown Error";
    this.data = data;
    this.displayType = displayType;
    console.log("API Response:",this)
  }

  //get the message from api response if success
  static getMessageFromApi(res) {
    return res?.data?.message ?? "Can not get message response";
  }

  //get the message from api error response if error
  static getMessageError(err) {
    if (!err?.response) return "Network error or no response from server";
    return err.response.data?.message ?? "Unknown error from server";
  }
  
  //check if the response is success
  isOk() {
    return this.status >= 200 && this.status < 300;
  }
}