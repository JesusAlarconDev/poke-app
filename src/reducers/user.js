import { SET_USER, SET_TOKEN, LOGOUT } from "../actions/types";

const initialState = {
    user: null,
    token: null
}

export const userReducer = (state = initialState, action) => {  
    switch(action.type){
        case SET_USER:
            return {
                ...state,
                user: action.payload
            }
        case SET_TOKEN:
            return {
                ...state,
                token: action.payload
            }
        case LOGOUT: 
            return {
                ...initialState
            }
    }

    return state;
}