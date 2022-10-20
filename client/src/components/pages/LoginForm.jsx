import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../store/actions/login';
import FormBuilder from '../formBuilder/FormBuilder';
import {Form, Row} from 'react-bootstrap';
import '../../style.css';
import 'bootstrap/dist/css/bootstrap.min.css'


const LoginPage = (props) => {

    const {formConfig} = props

    const [validated, setValidated] = useState(false)

    const dispatch = useDispatch()

    const onSubmit = (fieldsValue) => {

        setValidated(true)

        dispatch(login(fieldsValue))

    }


    return (
        <Row style={{ height: "250px" }} 
        className="align-items-center text-center">
            <Form noValidate validated={validated}>
            
                <Form.Label className="fw-bold fs-2">
                    Log in
                </Form.Label>

                <FormBuilder 
                    formConfig={formConfig}
                    onSubmit={onSubmit}
                />

            </Form>
        </Row>
        
    )
}

export default LoginPage