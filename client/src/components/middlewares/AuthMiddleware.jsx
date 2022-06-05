import AppRoutes from '../../AppRoutes';
import { getMe } from '../../store/actions/getMe';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import { useLocation } from 'react-router-dom';



const AuthMiddleware = () => {

    
    const navigate = useNavigate()
    const dispatch = useDispatch()
    // const location = useLocation()
    const reduxStateMe = useSelector(state => state.me)
    const { data, 
        // isLoading, error 
    } = reduxStateMe


    useEffect(() => {

        // if (!isLoading) {
        //     if (data === null) {
        //         // eslint-disable-next-line
        //         localStorageToken = JSON.parse(
        //             localStorage.getItem('token')
        //         )

        //         if (localStorageToken) {
        //             dispatch(getMe(localStorageToken))
        //         } else if (error || location.pathname !== '/login') {
                    
        //             navigate('/login')
        //         }
        //     }
        // }
        
        // if (error || location.pathname !== '/login') {
                
        //     navigate('/login')
        // }

        let localStorageToken = JSON.parse(
            localStorage.getItem('token')
        )

        if (data === null && localStorageToken) {
            dispatch(getMe(localStorageToken))
        } else if ((data === null && !localStorageToken) 
                || (data && !localStorageToken)) {
            navigate('/login')
        } else if (data && localStorageToken) {
            navigate('/departments')
        }
        
    }, [])
    
    return <AppRoutes />
    
}

export default AuthMiddleware;