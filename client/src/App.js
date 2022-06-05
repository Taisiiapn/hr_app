import './style.css';
import AuthMiddleware from './components/middlewares/AuthMiddleware';


const App = () => {

    return (
    
      <div className="App">

        <AuthMiddleware />

      </div>
    )
}

export default App;