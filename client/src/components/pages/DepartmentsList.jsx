import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { actionGetDeps } from '../../store/actions/getDepartments';
import Department from './Department';
import LoadingPage from './Loading';
import Buttons from './buttonsSkeleton'
import LogOutButton from '../logOutButton';
import { CreateDepartmentBtn } from './createDepartmentBtn';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const DepartmentsPage = ({ meData }) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const reduxStateDepartments = useSelector(state => state.departments)
    const { departments, isLoading, error, 
        //errorDeleteDepartment 
    } = reduxStateDepartments


    useEffect(() => {

        dispatch(actionGetDeps())

        // eslint-disable-next-line
    }, [])

    error.status === 401 && navigate('/login')


    return(
        <>
            {error
                ? <span>{error.data}</span> 
                : isLoading 
                    ? <LoadingPage />
                    :  <>

                            <Container className='mb-5 mt-5'>
                                <Row>

                                    <Col md={4}>
                                        <CreateDepartmentBtn />
                                    </Col>

                                    <Col md={{ span: 4, offset: 4 }}>
                                        <LogOutButton />
                                    </Col>

                                </Row>
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