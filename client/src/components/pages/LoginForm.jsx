import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../store/actions/login';
import FormBuilder from '../formBuilder/FormBuilder';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form} from 'react-bootstrap';
import ModalLoginPage from './ModalLoginPage';


const LoginPage = (props) => {

    const {formConfig} = props
    const [isModalShown, setIsModalShown] = useState(false)
    const dispatch = useDispatch()
    const isFormValid = false

    useEffect(() => {

        setTimeout(() => (
            setIsModalShown(true)
        ), 3500)
        
    }, [])

    const onSubmit = (fieldsValue) => {

        dispatch(login(fieldsValue))

    }
    
    return (
        <>

            {isModalShown && <ModalLoginPage />}

                <Form noValidate validated={isFormValid}>

                    <Form.Label className="fw-bold fs-2 mb-4" text="light">
                        Log in
                    </Form.Label>

                    <FormBuilder 
                        formConfig={formConfig}
                        onSubmit={onSubmit}
                    />

                </Form>

        </>
    )
}

export default LoginPage