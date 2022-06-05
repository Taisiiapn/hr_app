// import { instanceAxios } from "../index";
import axios from "axios";
import { departmentsActionFunctions } from './departments';

const {

    departmentsAreLoading,
    addDepsToStore,
    errorGetDeps

} = departmentsActionFunctions;

export const actionGetDeps = () => dispatch => {

    let localStorageToken = JSON.parse(
        localStorage.getItem('token')
    )

    dispatch(departmentsAreLoading(true))

    // instanceAxios.get('/api/departments', {
    axios.get('http://localhost:3000/api/departments', {
        headers: {
            token: localStorageToken
        }
    })
    .then(value => {
        dispatch(addDepsToStore(value.data))
        dispatch(departmentsAreLoading(false))
    })
    .catch(error => {
        dispatch(errorGetDeps(error.response))
    })
}