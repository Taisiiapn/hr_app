import axios from "axios";
import { actionFunctions } from './users';

const {

    addUsersToStore,
    errorFetchUsers,

} = actionFunctions;

export const actionGetUsersByDepartmentId = (departmentid) => dispatch => {

    let localStorageToken = JSON.parse(
        localStorage.getItem('token')
    )

    axios.get(`http://localhost:3000/api/users/${departmentid}`, {
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