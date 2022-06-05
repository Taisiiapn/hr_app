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
                            <LogOutButton />
                            <CreateDepartmentBtn />
                            {departments.map(obj =>

                                <div key={obj.id}>
                                    <Department props={obj} />
                                    <Buttons props={obj} parent={'department'} />
                                </div>
                                
                            )}   
                        </>  
            }
        </>
    )
}

export default DepartmentsPage