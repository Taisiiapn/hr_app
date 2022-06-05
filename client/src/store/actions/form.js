import { getInputDefaultValue } from "../../formConfig"

export const actionFormFunctions = {

    setIsLoadingFormValues: (payload) => ({
        type: actionFormTypes.IS_LOADING_FORM_VALUES,
        payload
    }),

    initialiseFields: (formConfig) => {

        const fields = formConfig.map(fieldConfig => {
            return {
               ...fieldConfig,
                value: getInputDefaultValue(fieldConfig.type),
                error: null
            }
        })
        
        return {
            type: actionFormTypes.INITIALISE_FIELDS,
            fields
        }
    },

    initialiseFieldsWithGivenValues: (formConfig, initialValues) => {

        const fields = formConfig.map(fieldConfig => {

            const initialValue = initialValues[fieldConfig.name] 

            const value = initialValue 
                ? initialValue 
                : getInputDefaultValue(fieldConfig.type)

            return {
               ...fieldConfig,
                value,
                error: null
            }
        })
        
        return {
            type: actionFormTypes.INITIALISE_FIELDS_WITH_VALUES,
            fields
        }
    },

    fieldValueChange: (fieldName, value) => ({
        type: actionFormTypes.FIELD_VALUE_CHANGE,
        fieldName,
        value
    }),

    fieldErrorChange: (fieldName, error) => ({
        type: actionFormTypes.FIELD_ERROR_CHANGE,
        fieldName,
        error
    }),

    formErrorChange: (error) => ({
        type: actionFormTypes.FORM_ERROR_CHANGE,
        error
    })

} 

export const actionFormTypes = {

    IS_LOADING_FORM_VALUES: 'IS_LOADING_FORM_VALUES',
    INITIALISE_FIELDS: 'INITIALISE_FIELDS',
    INITIALISE_FIELDS_WITH_VALUES: 'INITIALISE_FIELDS_WITH_VALUES',
    FIELD_VALUE_CHANGE: 'FIELD_VALUE_CHANGE',
    FIELD_ERROR_CHANGE: 'FIELD_ERROR_CHANGE',
    FORM_ERROR_CHANGE: 'FORM_ERROR_CHANGE'

}