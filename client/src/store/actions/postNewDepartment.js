import axios from 'axios';
import { actionFormFunctions } from './form';


const {
    setIsLoadingFormValues,
    fieldValueChange,
    fieldErrorChange
} = actionFormFunctions;



export const postNewDepartment = ({ name }) => dispatch => {

    const localStorageToken = JSON.parse(
        localStorage.getItem('token')
    )

    dispatch(setIsLoadingFormValues(true))
    
    axios.post('http://localhost:3000/api/departments/create', {
            name
        },
        {headers: {
            token: localStorageToken
        }}
    )
    .then(value => {
        dispatch(fieldValueChange(value.data))
        dispatch(setIsLoadingFormValues(false))
    })
    .catch (error => {
        dispatch(fieldErrorChange('name', error.response.data['name']))
        dispatch(setIsLoadingFormValues(false))
    })
}