import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { actionFormFunctions } from '../../store/actions/form';
import FormField from './FormField';
import {Button} from 'react-bootstrap';
import {Form, Container, Col} from 'react-bootstrap';


const { fieldValueChange,
    initialiseFieldsWithGivenValues,
    initialiseFields 
} = actionFormFunctions
 

const FormBuilder = ({ 
    formConfig, initialValue, onSubmit = () => {} 
}) => {


    const dispatch = useDispatch()
    const formFieldsReduxState = useSelector(state => state.form.fields)

    const [selectedRole, setSelectedRole] = useState('')

    useEffect(() => {
        if (initialValue) {
            dispatch(initialiseFieldsWithGivenValues(formConfig, initialValue)) 
        } else {
            dispatch(initialiseFields(formConfig))
        }
        // eslint-disable-next-line
    }, [initialValue])
    

    const onChangeValueWrap = (fieldName) => (e) => {

        const { value } = e.target

        if (fieldName === 'role') {
            setSelectedRole(value)
        }

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
        <Container className="d-flex justify-content-center">

            <Form.Group as={Col} md="4">
        
                {formConfig && formConfig.map(obj => (

                    obj.type === 'select' 
                    ?   <>
                            <Form.Control
                                as={obj.type}
                                value={selectedRole}
                                onChange={onChangeValueWrap(obj.name)}
                                >

                                <option> 
                                    Select the role
                                </option>

                                {obj.values.map(item =>
                                    <option
                                        key={item}
                                        value={item}
                                    > 
                                        {item}
                                    </option>
                                )}
                            </Form.Control>

                            <Form.Control.Feedback type="invalid">
                            </Form.Control.Feedback>
                        </>
                        
                    : 
                        <FormField 
                            key={obj.placeholder}
                            name={obj.name}
                            type={obj.type}
                            placeholder={obj.placeholder}
                            onChange={onChangeValueWrap(obj.name)}
                        />
                ))}

                
                <Button className="mt-4" onClick={sendSubmittedData}>
                    SUBMIT
                </Button>
            
            </Form.Group>
            
        </Container>
    )
    

}

export default FormBuilder