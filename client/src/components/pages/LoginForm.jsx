import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../store/actions/login';
import FormBuilder from '../formBuilder/FormBuilder';
import '../../style.css';


const LoginPage = (props) => {

    const {formConfig} = props

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const formFieldsReduxState = useSelector(state => state.form.fields)

    const reduxStateMe = useSelector(state => state.me)

    // const formIsDirty = textError ? true : false



    useEffect(() => {
        if (!!reduxStateMe.data) {
            navigate('/')
        }
        // eslint-disable-next-line
    }, [reduxStateMe])


    const onSubmit = () => {

        const fieldsValue = formConfig.reduce((accm, item) => {

            const resultKey = item.name
            const resultValueObj = formFieldsReduxState.find((field) => 
                field.name === resultKey)
                
            const resultValue = resultValueObj 
                ? resultValueObj['value'] 
                : undefined
            
            accm[resultKey] = resultValue
            return accm

        }, {})

        dispatch(login(fieldsValue))

    }


    return (
        <form className='form'>

            <h1>Login</h1>

            <FormBuilder 
                formConfig={formConfig}
                onSubmit={onSubmit}
                // formIsDirty={formIsDirty}
            />

        </form>
    )
}

export default LoginPage