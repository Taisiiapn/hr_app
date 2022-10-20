import axios from 'axios';
import { actionFormFunctions } from './form';


const {
    setIsLoadingFormValues,
    fieldValueChange,
    fieldErrorChange
} = actionFormFunctions;



export const putDepartment = (id, values) => dispatch => {

    const { name } = values
    const localStorageToken = JSON.parse(
        localStorage.getItem('token')
    )

    dispatch(setIsLoadingFormValues(true))

    axios.put(`http://localhost:3000/api/departments/${id}/update`, 
        {
            name: name
        },
        {headers: {
            token: localStorageToken
        }}
    )
    .then(department => {
        dispatch(fieldValueChange(department.data))
        dispatch(setIsLoadingFormValues(false))
    })
    .catch (error => {
        dispatch(fieldErrorChange('name', error.response.data['name']))
        dispatch(setIsLoadingFormValues(false))
    })
}