import './Footer.css';
import logo from '../../media/logo/logofooter.jpg'


function App() {
  return (
      <footer>
        <div className="footercontainer">
            <div className="footeritem1">
              <img src={logo} /> 
            </div>
            <div className="footeritem2">
              <a href="/"> Breakfast </a> 
               &#9679;
              <a href="/">Brunch</a> 
              &#9679;
              <a href="/">Lunch</a> 
               &#9679;
              <a href="/">Dinner</a> 
             </div>
            <div className="footeritem3"><p>Baby's Food Place <br/>copyright &copy; 2021</p> </div>
          </div>      
      </footer>
  );
}
export default App;