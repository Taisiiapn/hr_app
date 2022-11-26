import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import AuthMiddleware from './components/middlewares/AuthMiddleware';


const App = () => {

    return (

      <div className="App">

        <AuthMiddleware />

      </div>
    
    )
}

export default App;