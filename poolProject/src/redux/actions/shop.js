import { ADD_TO_CART, REMOVE_FROM_CART, INCREASE_QUANTITY, DECREASE_QUANTITY, LOAD_CURRENT_ITEM, PRODUCTS, SET_TOTAL_PRICE } from "../constants";

export function addItemToCart(itemID){
   
    return {
        type : ADD_TO_CART,
        payload :{
            id: itemID
        }

    }
}
export function removeItem(itemID){
    return {
        type: REMOVE_FROM_CART,
        payload: {
            id: itemID
        }
    }
}
export function setTotalPrice(total){
    return {
        type: SET_TOTAL_PRICE,
        payload: total
    }
}
export function changeQuantity(itemID, value) {
    return {
        type: INCREASE_QUANTITY,
        payload:{
            id: itemID,
            qty: value
        }  
    }
}
export function setProducts(products){
    return {
      type : PRODUCTS,
      payload: products
    }
  }
export function decreaseQuantity(item) {
    return {
        type: DECREASE_QUANTITY,
        payload: {
            item
        }
    }
}

export const loadCurrentItem = (item)=>{
    return {
        type: LOAD_CURRENT_ITEM,
        payload: item
    }
}