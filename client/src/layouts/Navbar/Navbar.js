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
               &#9679;
              <a href="/">Brunch</a> 
              &#9679;
              <a href="/">Lunch</a> 
               &#9679;
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