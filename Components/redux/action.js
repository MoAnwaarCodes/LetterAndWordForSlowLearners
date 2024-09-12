import { ADD_TO_CART } from "./constant";

export const addToCart=(item)=>{
return{
    type:ADD_TO_CART,
    data:item
}

}