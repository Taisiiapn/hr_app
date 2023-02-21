import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FormBuilder from '../formBuilder/FormBuilder';
import { postNewUser } from '../../store/actions/postNewUser';
import {Form} from 'react-bootstrap';



export const CreateUserPage = ({ formConfig }) => {


    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onSubmit = (fieldsValue) => {

        dispatch(postNewUser(
            fieldsValue, 
            () => {navigate('/departments')} ////////// todo
        )) 
    }


    return (

        <Form noValidate validated='false' 
        submit={e => {e.preventDefault()}}
        >

            <Form.Label className="fw-bold fs-2">
                Creating a new employee
            </Form.Label>

            <FormBuilder 
                formConfig={formConfig}
                onSubmit={onSubmit}
            />

        </Form>

    )
}