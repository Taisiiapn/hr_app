import { actionFormTypes } from '../actions/form';;

const {

    IS_LOADING_FORM_VALUES,
    INITIALISE_FIELDS,
    INITIALISE_FIELDS_WITH_VALUES,
    FIELD_VALUE_CHANGE,
    FIELD_ERROR_CHANGE

} = actionFormTypes;

const defaultState = {

    isLoading: false,
    fields: [],
    error: null

}

export const formReducer = (state=defaultState, action) => {
    switch (action.type) {

        case IS_LOADING_FORM_VALUES:
            return {...state,
                isLoading: action.payload
            }

        case INITIALISE_FIELDS:
            return {...state,
                fields: action.fields
            }

        case INITIALISE_FIELDS_WITH_VALUES:
            return {...state,
                fields: action.fields
            }

        case FIELD_VALUE_CHANGE:
            return{
                ...state,
                // eslint-disable-next-line
                fields: state.fields.map(field => {
                    if (field.name === action.fieldName) {
                        return {
                            ...field,
                            value: action.value
                        }
                    }
                    return {...field}
                })
            }

        case FIELD_ERROR_CHANGE:
            return{
                ...state,
                // eslint-disable-next-line
                fields: state.fields.map((field) => {
                    if (field.name === action.fieldName) {
                        return {
                            ...field,
                            error: action.error
                        }
                    }
                    return {...field}
                })
            }

        default: 
            return state
    }
}