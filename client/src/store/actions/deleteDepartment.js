import axios from 'axios';
import { departmentsActionFunctions } from './departments';
import { actionGetDeps } from './getDepartments';

const {

    errorDeleteDepartment

} = departmentsActionFunctions;


export const deleteDepartment = (id) => dispatch => {

    const localStorageToken = JSON.parse(
        localStorage.getItem('token')
    )

    axios.delete(`http://localhost:3000/api/departments/${id}/delete`,
        {headers: {
            token: localStorageToken
        }}
    )
    .then(() => {
        dispatch(actionGetDeps())
    })
    .catch (error => {
        dispatch(errorDeleteDepartment(error.response.data))
    })
}