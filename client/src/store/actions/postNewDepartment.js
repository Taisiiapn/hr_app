import axios from 'axios';
import { actionFormFunctions } from './form';


const {
    fieldValueChange,
    fieldErrorChange
} = actionFormFunctions;



export const postNewDepartment = ({ name }, callback) => dispatch => {

    const localStorageToken = JSON.parse(
        localStorage.getItem('token')
    )
    
    axios.post('http://localhost:3000/api/departments/create', {
            name
        },
        {headers: {
            token: localStorageToken
        }}
    )
    .then(value => {
        dispatch(fieldValueChange(value.data))
        callback()
    })
    .catch (error => {
        dispatch(fieldErrorChange('name', error.response.data['name']))
    })
}