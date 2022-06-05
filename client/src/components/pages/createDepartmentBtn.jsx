import React from 'react';
import { useNavigate } from 'react-router-dom';



export const CreateDepartmentBtn = () => {

    const navigate = useNavigate()

    const addDepartment = () => {

        navigate('/departments/create')
        
    }


    return (
        <button className='App__add-btn' onClick={addDepartment}>
            Add department
        </button>
    )
    
}
