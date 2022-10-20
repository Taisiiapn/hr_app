import { useEffect, useState } from 'react';
import '../../style.css';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FormBuilder from '../formBuilder/FormBuilder';
import { postNewDepartment } from '../../store/actions/postNewDepartment';
import {Form} from 'react-bootstrap';



export const CreateDepartmentPage = ({ formConfig }) => {


    const dispatch = useDispatch()
    const navigate = useNavigate()
    const formFieldsReduxState = useSelector(state => state.form.fields)
    const isLoadingFormValuesReduxState = useSelector(state => state.form.isLoading)

    
    const [isValuesSent, setIsValuesSent] = useState(false)

    useEffect(() => {

        const isErrorInForm = formFieldsReduxState.some(field => field.error)

        if (isValuesSent) {
            if (!isErrorInForm 
                && !isLoadingFormValuesReduxState) {
                navigate('/departments')
            }
        }
        
        // eslint-disable-next-line
    }, [formFieldsReduxState, isLoadingFormValuesReduxState])

    const onSubmit = (fieldsValue) => {

        dispatch(postNewDepartment(fieldsValue))


        // if (isLoadingFormValuesReduxState) {
            setIsValuesSent(true)     // todo check isLoading
        // } 
    }


    return (
        <Form>

            <FormBuilder 
                formConfig={formConfig}
                onSubmit={onSubmit}
            />

        </Form>
    )
}