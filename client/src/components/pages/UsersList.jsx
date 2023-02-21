import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { actionGetUsersByDepartmentId } from '../../store/actions/getUsersByDepartmentId';
import User from './User';
import LoadingPage from './Loading';
import Buttons from './buttonsSkeleton'
import LogOutButton from '../logOutButton';
import { HomeBtn } from './homeBtn';
import { CreateUserBtn } from './createUserBtn';
import {Table, Container} from 'react-bootstrap';


const UsersPage = ({ meData }) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()
    const { departmentid } = params
    const reduxStateUsers = useSelector(state => state.users)
    const { users, isLoading, error } = reduxStateUsers


    useEffect(() => {

        dispatch(actionGetUsersByDepartmentId(departmentid))

        // eslint-disable-next-line
    }, [])

    error.status === 401 && navigate('/login')


    return(
        <>
            {isLoading
                ? <LoadingPage />
                :  
                    <>
                        <Container className='pb-5 pt-5 d-flex justify-content-between'>
                            
                            <HomeBtn />

                            <CreateUserBtn departmentId={departmentid} />
                        
                            <LogOutButton />
                                
                        </Container>

                        {error 
                            ? <span>{error.data}</span>
                            : 
                                <Table striped bordered hover size="sm" variant="dark"
                                    style={{width: '55%'}}
                                    className='mx-auto'>
                                    <thead>
                                        <tr>
                                            <th>Full name</th>
                                            <th>Email</th>
                                            <th>Birthday</th>
                                            <th>Role</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {users.map(obj =>

                                        <tr key={obj.id}>
                                            <td><User value={obj.fullName} /></td>
                                            <td><User value={obj.email} /></td>
                                            <td><User value={obj.birthday} /></td>
                                            <td><User value={obj.role} /></td>
                                            <td><Buttons props={obj} parent={'user'} /></td>
                                        </tr>

                                    )}
                                    </tbody>
                                </Table> 
                        }
                    </>  
            }
        </>
    )
}

export default UsersPage