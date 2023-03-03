import React from 'react';
import { useSelector } from 'react-redux';
import {Form, Container, Col} from 'react-bootstrap';


const FormField = (
        { type, placeholder, onChange, name }
    ) => {

        const fieldsValueStateArr = useSelector(state => state.form.fields)
        let getFieldFromFormStateByName = []

        if (fieldsValueStateArr) {
            getFieldFromFormStateByName = fieldsValueStateArr
             .find(field => field.name === name)
        }

        let error = getFieldFromFormStateByName 
            && getFieldFromFormStateByName.error 
            && getFieldFromFormStateByName.error

        const isFormValid = error ? false : true
         
    return(

        <>
            <Form.Control
                
                name={name}
                value={getFieldFromFormStateByName && getFieldFromFormStateByName.value}
                type={type}
                placeholder={placeholder}
                onChange={onChange}      
                required 
                size='lg'
                className={isFormValid ? 'is-valid mb-4' : 'is-invalid mb-4'}
                />


            <Form.Control.Feedback type="invalid">
                {error && error}
            </Form.Control.Feedback>
        </>
        
    )
}

export default FormField