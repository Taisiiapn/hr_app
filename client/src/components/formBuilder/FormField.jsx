import React from 'react';
import { useSelector } from 'react-redux';
import {Form, Row, Col} from 'react-bootstrap';



const FormField = (
        { type, placeholder, onChange, name }
    ) => {

        const fieldsValueStateArr = useSelector(state => state.form.fields)
        let getFieldFromFormStateByName = []

        if (fieldsValueStateArr) {
            getFieldFromFormStateByName = fieldsValueStateArr
             .find(field => field.name === name)
        }
        
    return(
        <Row className="d-flex justify-content-center">
            <Form.Group as={Col} md="4" className="mb-4">
                <Form.Control 
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    onChange={onChange}      
                    required />


                <Form.Control.Feedback type="invalid">
                    {getFieldFromFormStateByName && getFieldFromFormStateByName.error}
                </Form.Control.Feedback>

            </Form.Group>
        </Row>
    )
}

export default FormField