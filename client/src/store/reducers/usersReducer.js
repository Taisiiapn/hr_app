import { actionTypes } from '../actions/users'

const {
    ADD_USERS_TO_STORE,
    ERROR_FETCH_USERS
} = actionTypes;

const defaultState = {
    error: '',
    users: []
}

export const usersReducer = (state=defaultState, action) => {
    switch (action.type) {
        case ADD_USERS_TO_STORE:
            return {...state,
                users: action.payload
            }

        case ERROR_FETCH_USERS:
            return {...state,
                error: action.payload
            }

        default: 
            return state
    }
}