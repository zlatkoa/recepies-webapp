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
               <div className="fseparator">&#9679;</div>
              <a href="/">Brunch</a> 
              <div className="fseparator">&#9679;</div>
              <a href="/">Lunch</a> 
              <div className="fseparator">&#9679;</div>
              <a href="/">Dinner</a> 
             </div>
            <div className="footeritem3"><p>Baby's Food Place <br/>copyright &copy; 2021</p> </div>
          </div>      
      </footer>
  );
}
export default App;