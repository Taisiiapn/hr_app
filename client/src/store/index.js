import { combineReducers, applyMiddleware } from 'redux';
import { legacy_createStore as createStore} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import axios from "axios";
import { departmentsReducer } from './reducers/departmentsReducer';
import { usersReducer } from './reducers/usersReducer';
import { meReducer } from './reducers/meReducer';
import { formReducer } from './reducers/formReducer';


export const rootReducer = combineReducers({
    me: meReducer,
    departments: departmentsReducer,
    users: usersReducer,
    form: formReducer
})

export const store = createStore(
    rootReducer, composeWithDevTools(applyMiddleware(thunk))
)

export const instanceAxios = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})