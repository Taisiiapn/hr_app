import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { actionFormFunctions } from '../../store/actions/form';
import FormField from './FormField';

const { fieldValueChange,
    initialiseFieldsWithGivenValues,
    initialiseFields 
} = actionFormFunctions
 

const FormBuilder = ({ formConfig, initialValue, onSubmit = () => {} }) => {


    const dispatch = useDispatch()
    const formErrorReduxState = useSelector(state => state.form.error)
    const formFieldsReduxState = useSelector(state => state.form.fields)

    useEffect(() => {
        if (initialValue) {
            dispatch(initialiseFieldsWithGivenValues(formConfig, initialValue)) 
        } else {
            dispatch(initialiseFields(formConfig))
        }
        // eslint-disable-next-line
    }, [])
    

    const onChangeValueWrap = (fieldName) => (e) => {

        const {value} = e.target

        dispatch(fieldValueChange(fieldName, value))
    }

    const sendSubmittedData = (e) => {

        e.preventDefault()

        // getting an input's name from formConfig
        // also getting an input's value from redux state
        // reducing these values in the obj and dispatching that obj with values

        const fieldsValue = formConfig.reduce((accm, item) => {

            const resultKey = item.name
            const resultValueObj = formFieldsReduxState.find(field => 
                field.name === resultKey)
                
            const resultValue = resultValueObj 
                ? resultValueObj['value'] 
                : undefined
            
            accm[resultKey] = resultValue
            return accm

        }, {})

        onSubmit(fieldsValue)

    }


    return (
        <>
        
            {formConfig && formConfig.map(obj =>
                <FormField 
                    key={obj.placeholder}
                    name={obj.name}
                    type={obj.type}
                    placeholder={obj.placeholder}
                    onChange={onChangeValueWrap(obj.name)}
                />
            )}

            {formErrorReduxState 
                && <p className='warned-text'>
                    {formErrorReduxState}
                    </p>
            }

            <button
                className='form__btn'
                onClick={sendSubmittedData}
                >
                    SUBMIT
            </button>
        </>
    )
    

}

export default FormBuilder