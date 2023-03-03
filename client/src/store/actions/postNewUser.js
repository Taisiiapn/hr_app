import axios from 'axios';
import { actionFormFunctions } from './form';


const {
    fieldValueChange,
    fieldErrorChange
} = actionFormFunctions;



export const postNewUser = ( values , callback) => dispatch => {

    const localStorageToken = JSON.parse(
        localStorage.getItem('token')
    )
    
    axios.post('http://localhost:3000/api/users/create', 
        values,
        {headers: {
            token: localStorageToken
        }}
    )
    .then(values => {
        dispatch(fieldValueChange(values))
        callback()
    })
    .catch (error => {
        dispatch(fieldErrorChange(
            Object.keys(error.response.data)[0], 
            Object.values(error.response.data)[0]
        ))
    })
}