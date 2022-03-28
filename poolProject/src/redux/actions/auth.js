import { LOADING, LOGGEDIN, TOKEN, USERNAME } from "../constants"

export function loggedIn(loggedIn){
    return {
      type : LOGGEDIN,
      payload: loggedIn
    }
  }
export function loading(loading){
return {
  type: LOADING,
  payload: loading
}
}
export function setToken(token){
    return {
      type : TOKEN,
      payload: token
    }
  }
export function setUser(userName){
    return {
      type : USERNAME,
      payload: userName
    }
  }
