import { useDispatch } from 'react-redux';
import { login } from '../../store/actions/login';
import FormBuilder from '../formBuilder/FormBuilder';
import '../../style.css';


const LoginPage = (props) => {

    const {formConfig} = props

    const dispatch = useDispatch()

    const onSubmit = (fieldsValue) => {

        dispatch(login(fieldsValue))

    }


    return (
        
        <form>

            <FormBuilder 
                formConfig={formConfig}
                onSubmit={onSubmit}
            />

        </form>

    )
}

export default LoginPage