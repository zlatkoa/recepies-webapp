import './Navbar.css';
import logo from '../../media/logo/logoheader.jpg'
import {Link} from 'react-router-dom'

function App() {
  return (
      <nav>
        <div className="navbarcontainer">
            <div className="navbaritem1">
              <Link to="/"><img src={logo} /></Link> 
            </div>
            <div className="navbaritem2">
              <Link to="/recipes/breakfast"> Breakfast </Link> 
              <div className="separator">&#9679;</div>
              <Link to="/recipes/brunch">Brunch</Link> 
              <div className="separator">&#9679;</div>
              <Link to="/recipes/lunch">Lunch</Link> 
              <div className="separator">&#9679;</div>
              <Link to="/recipes/dinner">Dinner</Link> 
             </div>
            <div className="navbaritem3">
                <Link to="/user/login">
                  <button className='outlined-button'>Log in</button>
                </Link>
                <span><p>or</p></span>
                <Link to="/user/register">
                  <button className='green-button'>Create acount</button>
                </Link>
            </div>
          </div>      
      </nav>
  );
}
export default App;