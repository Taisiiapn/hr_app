import React from 'react';
import { useNavigate } from 'react-router-dom';
import {Button} from 'react-bootstrap';


export const CreateUserBtn = () => {

    const navigate = useNavigate()

    const addUser = () => {

        navigate('/users/create')
        
    }

    return (
        <Button variant="outline-secondary"
            onClick={addUser}>
            Add user
        </Button>
    )
    
}