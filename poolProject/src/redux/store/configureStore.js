import { createStore, combineReducers } from 'redux';
import authReducer from '../reducers/authReducer';
import shopReducer from '../reducers/shopReducer';
const rootReducer = combineReducers(
    { 
      auth:authReducer,
      shop: shopReducer
     },
    
    
);
const configureStore = () => {
    return createStore(rootReducer);
}
export default configureStore;