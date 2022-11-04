import axios from "axios";
import { departmentsActionFunctions } from './departments';

const {

    departmentsAreLoading,
    addDepByIdToStore,
    errorGetDeps

} = departmentsActionFunctions;

export const actionGetDepById = id => dispatch => {

    let localStorageToken = JSON.parse(
        localStorage.getItem('token')
    )

    dispatch(departmentsAreLoading(true))

    axios.get(`http://localhost:3000/api/departments/${id}`, {
        headers: {
            token: localStorageToken
        }
    })
    .then(value => {
        dispatch(addDepByIdToStore(value.data))
        dispatch(departmentsAreLoading(false))
    })
    .catch(error => {
        dispatch(errorGetDeps(error.response))
    })
}