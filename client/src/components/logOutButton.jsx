import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { actionFunctions } from '../store/actions/me';

const { removeMeData } = actionFunctions;


const LogOutButton = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const logOut = () => {

        dispatch(removeMeData ())
        localStorage.removeItem('token')
        navigate("/login")
    }


    return (
        <button className='App__logOut-btn' onClick={logOut}>
            Log Out
        </button>
    )
    
}

export default LogOutButton