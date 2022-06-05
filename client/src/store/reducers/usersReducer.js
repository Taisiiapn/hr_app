import { actionTypes } from '../actions/users'

const { 
    SET_IS_LOADING_USERS,
    ADD_USERS_TO_STORE,
    ERROR_FETCH_USERS

} = actionTypes;

const defaultState = {
    isLoading: false,
    error: '',
    users: {}
}

export const usersReducer = (state=defaultState, action) => {
    switch (action.type) {
        case ADD_USERS_TO_STORE:
            return {...state,
                isLoading: false,
                users: action.payload
            }

        case SET_IS_LOADING_USERS:
            return {...state,
                isLoading: action.payload,
            }

        case ERROR_FETCH_USERS:
            return {...state,
                error: action.payload
            }

        default: 
            return state
    }
}