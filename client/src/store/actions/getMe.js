import { actionFunctions } from './me';
import { actionFormFunctions } from './form';
import axios from 'axios';

const {
    setIsLoadingMeData,
    setMeData,
    removeMeData
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
        dispatch(removeMeData())
        dispatch(setIsLoadingMeData(false))
    })
    
}