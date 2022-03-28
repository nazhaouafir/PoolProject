import { TOKEN, USERNAME, LOGGEDIN, LOADING} from '../constants';
const initialState = {
  username:null,
  token: null,
  loggedIn: false,
  laoding: false

};
const authReducer = (state = initialState, action) => {
  switch(action.type) {
    case USERNAME:
      return {
        ...state,
        username:action.payload
      };
    case TOKEN:
        return {
          ...state,
         token:action.payload
        };
    case LOGGEDIN:
        return {
              ...state,
        loggedIn:action.payload
            };
    case LOADING:
      return {
        ...state,
        loading: action.payload
      }
    default:
      return state;
  }
}
export default authReducer;