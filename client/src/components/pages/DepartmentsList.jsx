import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { actionGetDeps } from '../../store/actions/getDepartments';
import Department from './Department';
import LoadingPage from './Loading';
import Buttons from './buttonsSkeleton'
import LogOutButton from '../logOutButton';
import { CreateDepartmentBtn } from './createDepartmentBtn';
import {Table, Container} from 'react-bootstrap';


const DepartmentsPage = () => {

    const dispatch = useDispatch()
    const reduxStateDepartments = useSelector(state => state.departments)
    const { departments, isLoading, error } = reduxStateDepartments


    useEffect(() => {

        dispatch(actionGetDeps())

        // eslint-disable-next-line
    }, [])


    return(
        <>
            {error
                ? <span>{error.data}</span> 
                : isLoading 
                    ? <LoadingPage />
                    :  <>
                            <Container className='pb-5 pt-5 d-flex justify-content-between'>
                                
                                <CreateDepartmentBtn />
                            
                                <LogOutButton />
                                    
                            </Container>


                            <Table striped bordered hover size="sm" variant="dark"
                                style={{width: '55%'}}
                                className='mx-auto'>
                                <thead>
                                    <tr>
                                        <th>Department name</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                {departments.map(obj =>

                                    <tr key={obj.id}>
                                        <td><Department props={obj} /></td>
                                        <td><Buttons props={obj} parent={'department'} /></td>
                                    </tr>

                                )}
                                </tbody>
                            </Table> 
                        </>  
            }
        </>
    )
}

export default DepartmentsPage