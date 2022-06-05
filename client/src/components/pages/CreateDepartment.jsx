import { useEffect, useState } from 'react';
import '../../style.css';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FormBuilder from '../formBuilder/FormBuilder';
import { postNewDepartment } from '../../store/actions/postNewDepartment';



export const CreateDepartmentPage = (props) => {

    
    const { formConfig } = props

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const formErrorReduxState = useSelector(state => state.form.error)
    const isLoadingFormValuesRedux = useSelector(state => state.form.isLoading)

    
    const [isValuesSent, setIsValuesSent] = useState(false)
    const [textError, setTextError] = useState(formErrorReduxState)
    const formIsDirty = textError ? true : false

    useEffect(() => {
        setTextError(formErrorReduxState)
    }, [formErrorReduxState])

    
    useEffect(() => {
        if (!formErrorReduxState 
            && !isLoadingFormValuesRedux 
            && isValuesSent) {
            navigate('/departments')
        }
        // eslint-disable-next-line
    }, [formErrorReduxState, isLoadingFormValuesRedux])


    const onSubmit = values => {
            
        dispatch(postNewDepartment(values))
        isLoadingFormValuesRedux && setIsValuesSent(true)

    }


    return (
        <>
            {<form className='form'>

                <span className='warned-text'>
                    {textError}
                </span>

                <FormBuilder 
                    formConfig={formConfig}
                    onSubmit={onSubmit}
                    formIsDirty={formIsDirty}
                />

            </form>}
        </>
    )
}