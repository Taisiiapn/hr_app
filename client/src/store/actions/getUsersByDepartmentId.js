import axios from "axios";
import { actionFunctions } from './users';

const {

    addUsersToStore,
    errorFetchUsers,

} = actionFunctions;

export const actionGetUsersByDepartmentId = (depId) => dispatch => {

    let localStorageToken = JSON.parse(
        localStorage.getItem('token')
    )

    axios.get(`http://localhost:3000/api/users/${depId}`, {
        headers: {
            token: localStorageToken
        }
    })
    .then(value => {
        dispatch(addUsersToStore(value.data))
    })
    .catch(error => {
        dispatch(errorFetchUsers(error.response))
    })
}