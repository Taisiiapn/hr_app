import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import FormBuilder from '../formBuilder/FormBuilder';
import LoadingPage from '../pages/Loading';
import '../../style.css';
import { putDepartment } from '../../store/actions/putDepartment';
import { actionGetDepById } from '../../store/actions/getDepartmentById';
import {Form} from 'react-bootstrap';


const EditDepartmentPage = (props) => {

    const { formConfig } = props

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()
    const { id } = params

    const formFieldsReduxState = useSelector(state => state.form.fields)
    const isLoadingFormValuesReduxState = useSelector(state => state.form.isLoading)

    const departmentByIdReduxState = useSelector(state => state.departments.departmentById)
    const isLoadingDepartmentStateRedux = useSelector(state => state.departments.isLoading)
    let depNameReduxState = {
        'name': departmentByIdReduxState.name
    }    
    
    // const [isLoadingDepartment, setIsLoadingDepartment] = useState(isLoadingDepartmentStateRedux)
    const [isValuesSent, setIsValuesSent] = useState(false)


    useEffect(() => {
        dispatch(actionGetDepById(id))
        // eslint-disable-next-line
    }, [])


    // useEffect(() => {
    //     depNameReduxState['name'] = departmentByIdReduxState.name
    //     // eslint-disable-next-line
    // }, [departmentByIdReduxState])
    

    // useEffect(() => {
    //     setIsLoadingDepartment(isLoadingDepartmentStateRedux)
    // }, [isLoadingDepartmentStateRedux])

    useEffect(() => {

        const isErrorInForm = formFieldsReduxState.some(field => field.error)

        if (isValuesSent 
            && !isErrorInForm 
            && !isLoadingDepartmentStateRedux) {
            navigate('/departments')
        }
        // eslint-disable-next-line
    }, [formFieldsReduxState, isLoadingFormValuesReduxState])


    const onSubmit = values => {
            
        dispatch(putDepartment(id, values))

        setIsValuesSent(true) // todo check isLoading

    }


    return (
        <>
            {isLoadingDepartmentStateRedux 
                ? <LoadingPage /> 
                : <Form>

                    <FormBuilder 
                        formConfig={formConfig}
                        onSubmit={onSubmit}
                        initialValue={depNameReduxState}
                    />

                </Form>
                
            }
        </>
    )
}

export default EditDepartmentPage