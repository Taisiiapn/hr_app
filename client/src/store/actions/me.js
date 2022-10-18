export const actionFunctions = {

    setIsLoadingMeData: (payload) => ({
        type: actionTypes.SET_IS_LOADING_ME_DATA,
        payload
    }),

    setMeData: (payload) => ({
        type: actionTypes.SET_ME_DATA, 
        payload: payload.data
    }),

    removeMeData: () => {
        return {
           type: actionTypes.REMOVE_ME_DATA 
        }
    }

} 

export const actionTypes = {

    SET_IS_LOADING_ME_DATA: 'SET_IS_LOADING_ME_DATA',
    SET_ME_DATA: 'SET_ME_DATA',
    REMOVE_ME_DATA: 'REMOVE_ME_DATA',

}