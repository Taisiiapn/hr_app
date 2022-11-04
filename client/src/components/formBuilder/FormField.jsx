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

        <Container className="d-flex justify-content-center">

            <Form.Group as={Col} md="4" className="mb-4">

                <Form.Control
                    
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    onChange={onChange}      
                    required 
                    size='lg'
                    className={isFormValid ? 'is-valid' : 'is-invalid'}
                    />


                <Form.Control.Feedback type="invalid">
                    {error && error}
                </Form.Control.Feedback>

            </Form.Group>
            
        </Container>
        
    )
}

export default FormField