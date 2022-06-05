export const actionFunctions = {

    setIsLoadingUsers: (payload) => ({
        type: actionTypes.SET_IS_LOADING_USERS,
        payload
    }),

    addUsersToStore: (payload) => ({
        type: actionTypes.ADD_USERS_TO_STORE,
        payload
    }),

    errorFetchUsers: (payload) => ({
        type: actionTypes.ERROR_FETCH_USERS, 
        payload
    })

} 

export const actionTypes = {

    SET_IS_LOADING_USERS: 'SET_IS_LOADING_USERS',
    ADD_USERS_TO_STORE: 'ADD_USERS_TO_STORE',
    ERROR_FETCH_USERS: 'ERROR_FETCH_USERS',

}