import './Navbar.css';
import logo from '../../media/logo/logoheader.jpg'

function App() {
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
            <div className="navbaritem3">
                <button className='login-button'>Log in</button>
                <span><p>or</p></span>
                <button className='create-account'>Create acount</button>
            </div>
          </div>      
      </nav>
  );
}
export default App;