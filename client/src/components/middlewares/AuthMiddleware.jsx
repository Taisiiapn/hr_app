import AppRoutes from '../../AppRoutes';
import { getMe } from '../../store/actions/getMe';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';



const AuthMiddleware = () => {

    
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()
    const reduxStateMe = useSelector(state => state.me)
    const { data, isLoading, error } = reduxStateMe


    let localStorageToken = JSON.parse(
        localStorage.getItem('token')
    )


    useEffect(() => {
        
        if (error) {
            
            navigate('/login')

        } else if (data === null && localStorageToken && !isLoading) {

            dispatch(getMe(localStorageToken))

        } else if ((data === null && !localStorageToken) 
                || (data && !localStorageToken)) {

            navigate('/login')

        } else if (data && localStorageToken) {
            // all good case with no specific scenarios

            if (location.pathname === '/login') {
                navigate('/departments')
            }

        }
        // eslint-disable-next-line
    }, [data])
    
    return <AppRoutes />
    
}

export default AuthMiddleware;