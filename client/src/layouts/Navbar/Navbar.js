import './Navbar.css';
import logo from '../../media/logo/logoheader.jpg'
import {Link, useNavigate} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {logout, reset} from '../../features/auth/authSlice'

function App() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {user} = useSelector((state)=>state.auth)

  const onLogout =() => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }
  
  return (
      <nav>
        <div className="navbarcontainer">
            <div className="navbaritem1">
              <a href="/"><img src={logo} /></a> 
            </div>
            <div className="navbaritem2">
              <a href="/recipes/breakfast"> Breakfast </a> 
              <div className="separator">&#9679;</div>
              <a href="/recipes/brunch">Brunch</a> 
              <div className="separator">&#9679;</div>
              <a href="/recipes/lunch">Lunch</a> 
              <div className="separator">&#9679;</div>
              <a href="/recipes/dinner">Dinner</a> 
             </div>
            
              {user ? (<>
                <div className="navbaritem2">
                  <a href="/recipes/user"> My Recipes </a> 
                  <div className="separator">&#9679;</div>
                  <a href="/user/profile">My Profile</a> 
                  <div className="separator">&#9679;</div>
                  <a href="" onClick={onLogout}>Logout</a> 
                  </div>
              </>
                
              ) : (<>
                  <div className="navbaritem3">
                    <a href="/user/login">
                      <button className='outlined-button'>Log in</button>
                    </a>
                    <span><p>or</p></span>
                    <a href="/user/register">
                      <button className='green-button'>Create acount</button>
                    </a>
                  </div>
                  </>) 
              }
                
        
          </div>      
      </nav>
  );
}
export default App;