import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import FormBuilder from '../formBuilder/FormBuilder';
import LoadingPage from '../pages/Loading';
import { putDepartment } from '../../store/actions/putDepartment';
import { actionGetDepById } from '../../store/actions/getDepartmentById';
import { Form } from 'react-bootstrap';


const EditDepartmentPage = (props) => {

    const { formConfig } = props

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()
    const { id } = params

    const departmentByIdReduxState = useSelector(state => state.departments.departmentById)
    const isLoadingDepartmentStateRedux = useSelector(state => state.departments.isLoading)

    const [departmentName, setDepartmentName] = useState(departmentByIdReduxState)

    useEffect(() => {
        dispatch(actionGetDepById(id))
        // eslint-disable-next-line
    }, [])


    useEffect(() => {
        if (departmentByIdReduxState.name) {

            setDepartmentName(departmentByIdReduxState)
        }

        // eslint-disable-next-line
    }, [departmentByIdReduxState])

    const onSubmit = values => {
        
        dispatch(putDepartment(id, values, () => {
            navigate('/departments')
        }))

    }

    return (
        <>
            {isLoadingDepartmentStateRedux
                ? <LoadingPage />
                :
                <Form>

                    <FormBuilder
                        formConfig={formConfig}
                        onSubmit={onSubmit}
                        initialValue={departmentName}
                    />

                </Form>

            }
        </>
    )
}

export default EditDepartmentPage