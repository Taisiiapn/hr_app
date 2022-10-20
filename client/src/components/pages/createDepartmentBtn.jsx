import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';



export const CreateDepartmentBtn = () => {

    const navigate = useNavigate()

    const addDepartment = () => {

        navigate('/departments/create')
        
    }


    return (
        <Button variant="outline-secondary"
            onClick={addDepartment}>
            Add department
        </Button>
    )
    
}
