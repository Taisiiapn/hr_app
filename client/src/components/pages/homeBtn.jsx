import React from 'react';
import { useNavigate } from 'react-router-dom';
import {Button} from 'react-bootstrap';


export const HomeBtn = () => {

    const navigate = useNavigate()

    const navigateToHomePage = () => {

        navigate('/departments')
        
    }


    return (
        <Button variant="outline-secondary"
            onClick={navigateToHomePage}>
            HOME
        </Button>
    )
    
}
