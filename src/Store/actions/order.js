import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders"

export const purchaseBurgerSuccess = (id, orderData) =>{
    return{
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
}
export const purchaseBurgerFinshed =()=>{
    return{
        type: actionTypes.PURCHASE_SET_TRUE
    }
}

export const purchaseBurgerFail = (error) =>{
    return{
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error

    }
}
 export const purchaseBurgerStart = () =>{
    return{
        type: actionTypes.PURCHASE_BURGER_START
    }
 }

export const purchaseBurger = (orderData,token) =>{
    return dispatch =>{
        dispatch(purchaseBurgerStart())
        axios.post("/orders.json?auth="+token,orderData)
            .then(response =>{
                dispatch(purchaseBurgerFinshed())
                dispatch(purchaseBurgerSuccess(response.data.name,orderData))})
            .catch(error =>{dispatch(purchaseBurgerFail(error))});
    }
}
export const purchaseInit = ()=>{
return {
    type: actionTypes.PURCHASE_INIT
}
}

export const fetchOrdersStart = () =>{
return{
    type: actionTypes.FETCH_ORDER_START
}
}

export const fetchOrderSuccess = (orders) =>{
    return {
        type: actionTypes.FETCH_ORDER_SUCCESS,
        orders: orders
    }
}

export const fetchOrderFail = (error ) =>{
    return{
        type: actionTypes.FETCH_ORDER_FAIL,
        error: error
    }
}

export const fetchOrders =(token,userId) =>{
    return dispatch => {
        dispatch(fetchOrdersStart());
        const queryParams = '?auth='+token + '&orderBy="userId"&equalTo="'+userId+'"';
        axios.get('/orders.json'+queryParams).then(response =>{
            const fetchedOrders = [];
            for (let key in response.data){
                fetchedOrders.push({
                    ...response.data[key],
                    id: key
                });
            }
            dispatch(fetchOrderSuccess(fetchedOrders))
        })
            .catch(error=>{
                dispatch(fetchOrderFail(error))
            })

    }
    }