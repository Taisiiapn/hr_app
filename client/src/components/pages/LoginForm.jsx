import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../store/actions/login';
import FormBuilder from '../formBuilder/FormBuilder';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form, Row} from 'react-bootstrap';
import ModalLoginPage from './ModalLoginPage';


const LoginPage = (props) => {

    const {formConfig} = props
    const [validated, setValidated] = useState(false)
    const [isModalShown, setIsModalShown] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {

        setTimeout(() => (
            setIsModalShown(true)
        ), 3500)
        
    }, [])

    const onSubmit = (fieldsValue) => {

        setValidated(true)
        dispatch(login(fieldsValue))

    }


    return (

        <>

            {isModalShown && <ModalLoginPage />}
        

            <Row style={{ height: "300px" }} 
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

        </>

    )
}

export default LoginPage