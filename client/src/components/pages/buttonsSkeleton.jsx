import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteDepartment } from '../../store/actions/deleteDepartment';
import {Button} from 'react-bootstrap';


const Buttons = ({ props, parent }) => {

    const { id } = props

    const navigate = useNavigate()
    const dispatch = useDispatch()


    const editItem = (id) => {
        parent === 'department' && navigate(`/departments/${id}/update`)
    }

    const deleteItem = (id) => {
        dispatch(deleteDepartment(id))
    }

    const showItem = (id) => {
        navigate(`/users/${id}`)
    }

    return(
        <nav>
  
            <Button onClick={() => editItem(id)}
             className="me-2">
                EDIT
            </Button>


            <Button onClick={() => deleteItem(id)} 
            variant="secondary" className="me-2">
                DELETE
            </Button>

            {parent === 'department' &&

                <Button onClick={() => showItem(id)}
                variant="info" className="me-2">
                    SHOW
                </Button>

            }

        </nav>
    )
}

export default Buttons