import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { actionFunctions } from '../store/actions/me';
import Button from 'react-bootstrap/Button';

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
        <Button variant="outline-secondary" 
            onClick={logOut}>
            Log Out
        </Button>
    )
    
}

export default LogOutButton