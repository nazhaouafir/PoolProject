import { ActionSheetIOS } from "react-native";
import instance from "../../api";
import { ADD_TO_CART,VIDER_CART, PRODUCTS, INCREASE_QUANTITY, LOAD_CURRENT_ITEM, REMOVE_FROM_CART, SET_TOTAL_PRICE } from "../constants"


const initialState = {
    user:'',
    products:[],
    cart:[],
    currentItem: null,
    totalPrice: 0
  
  };
const shopReducer = (state = initialState, action)=>{
    switch(action.type)
    {
        case PRODUCTS:
            return {
              ...state,
              products:action.payload
            };
        case ADD_TO_CART:
            //get the items data from the products array
            const item = state.products.find((prod)=> prod.id === action.payload.id);
            //check if ite is in cart already
            const inCart = state.cart.find(
                (item)=>
            item.id === action.payload.id ? true : false);

                return {
                    ...state,
                    cart : inCart
                     ? state.cart.map(item =>
                         item.id === action.payload.id
                          ? {...item, qty:item.qty+1} 
                          :item
                          )
                    : [...state.cart,{...item, qty:1}],
                };

        case INCREASE_QUANTITY:
            return {
                ...state,
                cart: state.cart.map((item)=> 
                item.id === action.payload.id 
                    ? {...item, qty: action.payload.qty}
                    : item)
            }            
    
        case REMOVE_FROM_CART:
            return {
                ...state,
                cart: state.cart.filter((item)=>item.id !== action.payload.id),
            };
        case VIDER_CART:
            return {
                ...state,
                cart: [],
            };
    
        case LOAD_CURRENT_ITEM:
            return {

            } 
        case SET_TOTAL_PRICE:
            return{
                ...state,
                totalPrice: action.payload
            }
    }
    return state
}

export default shopReducer