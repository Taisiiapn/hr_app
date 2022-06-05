import axios from 'axios';
import { departmentsActionFunctions } from './departments';

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
    .then(value => {
        // todo dispatch get all deps
    })
    .catch (error => {
        dispatch(errorDeleteDepartment(error.response.data))
    })
}