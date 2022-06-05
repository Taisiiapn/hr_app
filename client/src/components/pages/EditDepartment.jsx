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


const EditDepartmentPage = (props) => {

    const { formConfig } = props

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()
    const { id } = params

    const formErrorReduxState = useSelector(state => state.form.error)
    const isLoadingFormValuesReduxState = useSelector(state => state.form.isLoading)

    const depReduxState = useSelector(state => state.departments)
    const isLoadingDepartmentStateRedux = depReduxState.isLoading
    const depNameReduxState = {
        "name": depReduxState.departmentById.name
    }
    // const isDepartmentUpdated = depReduxState.updatedDepartment
    
    
    // const formIsDirty = textError 
    //     ? true 
    //     : false
    const [isLoadingDepartment, setIsLoadingDepartment] = useState(isLoadingDepartmentStateRedux)
    const [isValuesSent, setIsValuesSent] = useState(false)


    useEffect(() => {
        dispatch(actionGetDepById(id))
        // eslint-disable-next-line
    }, [])
    

    useEffect(() => {
        setIsLoadingDepartment(isLoadingDepartment)
    }, [isLoadingDepartment])

    useEffect(() => {
        if (!!formErrorReduxState 
            && !isLoadingFormValuesReduxState 
            && isValuesSent) {
            navigate('/departments')
        }
        // eslint-disable-next-line
    }, [formErrorReduxState, isLoadingFormValuesReduxState])


    const onSubmit = values => {
            
        dispatch(putDepartment(id, values))
        isLoadingFormValuesReduxState && setIsValuesSent(true) // todo check isLoading

    }


    return (
        <>
            {isLoadingDepartment 
                ? <LoadingPage /> 
                : <form className='form'>

                    <FormBuilder 
                        formConfig={formConfig}
                        onSubmit={onSubmit}
                        // formIsDirty={formIsDirty}
                        initialValue={depNameReduxState}
                    />

                  </form>
                
            }
        </>
    )
}

export default EditDepartmentPage