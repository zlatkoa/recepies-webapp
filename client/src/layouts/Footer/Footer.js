import './Footer.css';
import logo from '../../media/logo/logofooter.jpg'


function App() {
  return (
      <footer>
        <div className="footercontainer">
            <div className="footeritem1">
              <a href="/"><img src={logo} /></a> 
            </div>
            <div className="footeritem2">
              <a href="/recipes/breakfast"> Breakfast </a> 
               <div className="fseparator">&#9679;</div>
              <a href="/recipes/brunch">Brunch</a> 
              <div className="fseparator">&#9679;</div>
              <a href="/recipes/lunch">Lunch</a> 
              <div className="fseparator">&#9679;</div>
              <a href="/recipes/dinner">Dinner</a> 
             </div>
            <div className="footeritem3"><p>Baby's Food Place <br/>copyright &copy; 2021</p> </div>
          </div>      
      </footer>
  );
}
export default App;