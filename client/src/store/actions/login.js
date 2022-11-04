import axios from 'axios';
import { actionFormFunctions } from './form';
import { getMe } from './getMe';



const {

    setIsLoadingFormValues,
    fieldValueChange,
    fieldErrorChange

} = actionFormFunctions;


export const login = ({ email, password }) => dispatch => {

    dispatch(setIsLoadingFormValues(true))
    
    axios.post('http://localhost:3000/auth/login', {
        email,
        password
    })
    .then(value => {

        const { token } = value.data

        dispatch(fieldValueChange({
            email,
            password
        }))

        localStorage.setItem(
            'token', JSON.stringify(token)
        )

        dispatch(setIsLoadingFormValues(false))

        dispatch(getMe(token))
    })
    .catch (error => {
        const errorArr = Object.entries(error.response.data)
        dispatch(fieldErrorChange(errorArr[0][0], errorArr[0][1]))
        dispatch(setIsLoadingFormValues(false))
    })
}