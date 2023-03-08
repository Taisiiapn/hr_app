
import { actionTypes } from '../actions/me';

const {

    SET_IS_LOADING_ME_DATA,
    SET_ME_DATA,
    REMOVE_ME_DATA,
    ERROR_ME_DATA

} = actionTypes;

const defaultState = {
    isLoading: false,
    data: null,
    error: null
}

export const meReducer = (state=defaultState, action) => {
    switch (action.type) {
        case SET_IS_LOADING_ME_DATA:
            return {
                ...state,
                isLoading: action.payload
            }
        
        case SET_ME_DATA:
            return {
                ...state,
                data: action.payload
            }

        case REMOVE_ME_DATA:
            return {
                ...state,
                data: null
            }

        case ERROR_ME_DATA:
            return {
                ...state,
                error: action.payload
            }

        default: 
            return state
    }
}