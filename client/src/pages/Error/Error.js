import{ Link } from 'react-router-dom';
import './Error.css';

function App() {
        return (
            <>
            <div className="container">
            <img src="https://cdn-icons-png.flaticon.com/512/103/103085.png?w=360"></img>
            </div>
            <div className='container'>                
                <h1>Ups, this page does not exist</h1>
                <Link to="/" className='link'> Go back to Home page</Link>
            </div>
            </>
        );
    }
  
export default App;
  