import { departmentsActionTypes } from '../actions/departments';

const {
    SET_IS_LOADING_DEPS,
    ADD_DEPS_TO_STORE,
    ADD_DEP_BY_ID_TO_STORE,
    ERROR_FETCH_DEPS,
    ERROR_DELETE_DEPARTMENT
} = departmentsActionTypes

const defaultState = {
    isLoading: false,
    departments: [],
    departmentById: {},
    error: '',
    errorDeleteDepartment: ''
}

export const departmentsReducer = (state=defaultState, action) => {
    switch (action.type) {
        case SET_IS_LOADING_DEPS:
            return {
                ...state,
                isLoading: action.payload,
                error: '',
                errorDeleteDepartment: ''
            }

        case ADD_DEPS_TO_STORE:
            return {
                ...state,
                departments: action.payload,
                departmentById: {},
                error: '',
                errorDeleteDepartment: ''
            }

        case ADD_DEP_BY_ID_TO_STORE:
            return {
                ...state,
                departmentById: action.payload,
                error: '',
                errorDeleteDepartment: ''
            }

        case ERROR_FETCH_DEPS:
            return {
                ...state,
                error: action.payload,
                errorDeleteDepartment: ''
            }

        case ERROR_DELETE_DEPARTMENT:
            return {
                ...state,
                errorDeleteDepartment: action.payload,
                error: '',
            }
           
        default:
            return state
    }
}