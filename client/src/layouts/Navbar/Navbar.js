import './Navbar.css';
import logo from '../../media/logo/logoheader.jpg'


function App() {
  return (
      <nav>
        <div className="navbarcontainer">
            <div className="navbaritem1">
              <img src={logo} /> 
            </div>
            <div className="navbaritem2">
              <a href="/"> Breakfast </a> 
              <div className="separator">&#9679;</div>
              <a href="/">Brunch</a> 
              <div className="separator">&#9679;</div>
              <a href="/">Lunch</a> 
              <div className="separator">&#9679;</div>
              <a href="/">Dinner</a> 
             </div>
            <div className="navbaritem3">
                <button>Log in</button>
                <button>Log in</button>
            </div>
          </div>      
      </nav>
  );
}
export default App;