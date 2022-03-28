import { createStore, combineReducers } from 'redux';
import countReducer from '../reducers/countReducer';
import authReducer from '../reducers/authReducer';
import shopReducer from '../reducers/shopReducer';
const rootReducer = combineReducers(
    { count: countReducer,
      auth:authReducer,
      shop: shopReducer
     },
    
    
);
const configureStore = () => {
    return createStore(rootReducer);
}
export default configureStore;