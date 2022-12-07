import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FormBuilder from '../formBuilder/FormBuilder';
import { postNewDepartment } from '../../store/actions/postNewDepartment';
import {Form} from 'react-bootstrap';



export const CreateDepartmentPage = ({ formConfig }) => {


    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onSubmit = (fieldsValue) => {

        dispatch(postNewDepartment(
            fieldsValue, 
            () => {navigate('/departments')}
        )) 
    }


    return (

        <Form noValidate validated='false' 
        submit={e => {e.preventDefault()}}
        >

            <Form.Label className="fw-bold fs-2">
                Creating a new department
            </Form.Label>

            <FormBuilder 
                formConfig={formConfig}
                onSubmit={onSubmit}
            />

        </Form>

    )
}