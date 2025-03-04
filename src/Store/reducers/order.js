import * as actionTypes from "./../../Store/actions/actionTypes";

const initialState = {
    orders: [],
    loading: false,
    purchased: false
}

const reducerOrder = (state = initialState, action) =>{
    switch (action.type) {
        case actionTypes.PURCHASE_INIT:
            return{
                ...state,
                purchased: false
            }
        case actionTypes.PURCHASE_SET_TRUE:
            return{
                ...state,
                purchased: true
            }
        case actionTypes.PURCHASE_BURGER_START:
            return{
                ...state,
                loading: true
            }
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            const newOrder={
                ...action.orderData,
                id: action.orderId
            }
            return {
                ...state,
                loading: false,
                order: state.order.concat(newOrder)
            };
        case actionTypes.PURCHASE_BURGER_FAIL:
            return{
                ...state,
                loading: false
            }
        case actionTypes.FETCH_ORDER_SUCCESS:

            return{
                ...state,
                orders: action.orders,
                loading: false
            }
        case actionTypes.FETCH_ORDER_FAIL:
            return {
                ...state,
                loading: false
            }
        case actionTypes.FETCH_ORDER_START:
            return {
                ...state,
                loading: true
            }
        default:
            return state;
    }

}
export default reducerOrder;