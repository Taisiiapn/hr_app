import { actionFunctions } from './me';
import { actionFormFunctions } from './form';
import axios from 'axios';

const {
    setIsLoadingMeData,
    setMeData,
    removeMeData,
    errorMeData
} = actionFunctions;

const {
    setIsLoadingFormValues
} = actionFormFunctions;


export const getMe = token => dispatch => {


    dispatch(setIsLoadingMeData(true))

    axios.get('http://localhost:3000/auth/me', {
        headers: {
            token: token
        }
    })
    .then(value => {
        dispatch(setMeData(value))
        dispatch(setIsLoadingMeData(false))
        dispatch(setIsLoadingFormValues(false))
    })
    .catch (error => {
         
        if (error.response.status === 401) {
            localStorage.removeItem('token')
        }
           // todo
        dispatch(errorMeData(error.response))
        dispatch(removeMeData())
        dispatch(setIsLoadingMeData(false))
    })
    
}