import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthMiddleware from './components/middlewares/AuthMiddleware';


const App = () => {

    return (

      <div className="bg-dark text-white" style={{height: '100vh'}}>

        <AuthMiddleware />

      </div>
    
    )
}

export default App;