import * as actionTypes from "./../actions/actionTypes";

const initialState={
    error: null,
    token: null,
    userId: null,
    loading: false,
    authRedirectPath: "/"
}

const reducer  = (state= initialState,action) =>{
    switch (action.type) {
        case actionTypes.SET_AUTH_REDIRECT_PATH:
            return{
                ...state,
                authRedirectPath: action.path
            }
        case actionTypes.AUTH_START:
            return{
                ...state,
                loading: true,
                error: null
            }
        case actionTypes.AUTH_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                token: action.idToken,
                userId: action.userId
            }
        case actionTypes.AUTH_FAIL:
            return {
                ...state,
                error: action.error,
                loading: false
            }
        case actionTypes.AUTH_LOGOUT:
            return {
                ...state,
                token: null,
                userId: null
            }
        default:
            return state;
    }
}

export default reducer;