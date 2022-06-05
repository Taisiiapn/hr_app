export const departmentsActionFunctions = {

    departmentsAreLoading: payload => {
        return {
            type: departmentsActionTypes.SET_IS_LOADING_DEPS,
            payload
        }
    },

    addDepsToStore: payload => {
        return {
            type: departmentsActionTypes.ADD_DEPS_TO_STORE,
            payload
        }
    },

    addDepByIdToStore: payload => {
        return {
            type: departmentsActionTypes.ADD_DEP_BY_ID_TO_STORE,
            payload
        }
    },

    errorGetDeps: payload => {
        return {
            type: departmentsActionTypes.ERROR_FETCH_DEPS,
            payload
        }
    },

    errorDeleteDepartment: payload => {
        return {
            type: departmentsActionTypes.ERROR_FETCH_DEPS,
            payload
        }
    },
}

export const departmentsActionTypes = {

    SET_IS_LOADING_DEPS: 'SET_IS_LOADING_DEPS',
    ADD_DEPS_TO_STORE: 'ADD_DEPS_TO_STORE',
    ADD_DEP_BY_ID_TO_STORE: 'ADD_DEP_BY_ID_TO_STORE',
    ERROR_FETCH_DEPS: 'ERROR_FETCH_DEPS',
    ERROR_DELETE_DEPARTMENT: 'ERROR_DELETE_DEPARTMENT'

}