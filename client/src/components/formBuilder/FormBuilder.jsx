import { useDispatch } from 'react-redux';
import { actionFormFunctions } from '../../store/actions/form';
import FormField from './FormField';

const { fieldValueChange,
    initialiseFieldsWithGivenValues,
    initialiseFields 
} = actionFormFunctions
 

const FormBuilder = ({ formConfig, formIsDirty, initialValue, onSubmit = () => {} }) => {


    const dispatch = useDispatch()

    if (initialValue) {
        dispatch(initialiseFieldsWithGivenValues(formConfig, initialValue)) 
    } else {
        dispatch(initialiseFields(formConfig))
    }
         
    // const [isSubmitBtnDisabled, setIsSubmitBtnDisabled] = useState(formIsDirty)

    const onChangeValueWrap = (fieldName) => (e) => {

        const {value} = e.target

        fieldValueChange(fieldName, value)
        // setIsSubmitBtnDisabled(false)
    }

    const sendSubmittedData = (e) => {
        e.preventDefault()
        onSubmit()
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

            <button
                className='form__btn'
                onClick={sendSubmittedData}
                // disabled={isSubmitBtnDisabled}
                >
                    SUBMIT
            </button>
        </>
    )
    

}

export default FormBuilder