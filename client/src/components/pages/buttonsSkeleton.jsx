import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteDepartment } from '../../store/actions/deleteDepartment';
import {actionGetDepById} from '../../store/actions/getDepartmentById';


const Buttons = ({ props, parent }) => {

    const { id, salary } = props

    const navigate = useNavigate()
    const dispatch = useDispatch()


    const editItem = (id) => {
        parent === 'department' && navigate(`/departments/${id}/update`)
    }

    const deleteItem = (id) => {
        dispatch(deleteDepartment(id))
    }

    const showItem = (id) => {
        dispatch(actionGetDepById(id))
        dispatch()
    }

    return(
        <nav>
  
            <button onClick={() => editItem(id)}>
                EDIT
            </button>

            <button onClick={() => deleteItem(id)}>
                DELETE
            </button>

            {!salary &&
                
                <button onClick={() => showItem(id)}>
                    SHOW
                </button>

            }

        </nav>
    )
}

export default Buttons