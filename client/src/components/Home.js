import React, { useState, useEffect } from 'react';
import Card from './elements/Card/Card';
import './Card.css';
import './Home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUtensils,
  faClock,
  faStar,
  faAnglesRight, } from '@fortawesome/free-solid-svg-icons'

const image ='https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/delish-homemade-pizza-horizontal-1542312378.png'
const lorem ='It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using ‘Content here, content here’, making it look like readable English.'
function App() {
    // Isprati HTTP req do server endpoint
    const [recipes, setRecipes] = useState(null);
    const [isDataFetched, setIsDataFetched] = useState(false);

    // React hook
    useEffect(() => {
        // call server
        const sendRequest = async () => {
            const res = await fetch('http://localhost:3000/recipes');
            const data = await res.json();
            
            setRecipes(data);
            setIsDataFetched(true);
        }

        sendRequest();
    }, []);
  




    // If message is not fetched from the server yet
    if(isDataFetched) {
        return (

          <>
            <div className='homecontainer'>
            <div className='card-wrapper'>            
            <div className='card-top'>
                <div className='card-category'>Breakfast</div>
              <img className='card-image' src={image}>
              </img>
            </div>
            <div className='card-content'>
              <h2>Hommemade Pizza</h2>
              <p>{lorem}</p> 
              <div className='card-info'>
                <div className='card-time'><FontAwesomeIcon className='icon' icon={faClock} />45 min</div>
                <div className='card-serving'><FontAwesomeIcon className='icon' icon={faUtensils} />4 persons</div>
                <div className='card-like'><FontAwesomeIcon className='icon' icon={faStar} />28</div>
                <div className='card-details'> <FontAwesomeIcon className='icon-button' icon={faAnglesRight} /> </div>
              </div>
            </div>                     
          </div>
          <div className='card-wrapper'>            
            <div className='card-top'>
                <div className='card-category'>Breakfast</div>
              <img className='card-image' src={image}>
              </img>
            </div>
            <div className='card-content'>
              <h2>Hommemade Pizza</h2>
              <p>{lorem}</p> 
              <div className='card-info'>
                <div className='card-time'><FontAwesomeIcon className='icon' icon={faClock} />45 min</div>
                <div className='card-serving'><FontAwesomeIcon className='icon' icon={faUtensils} />4 persons</div>
                <div className='card-like'><FontAwesomeIcon className='icon' icon={faStar} />28</div>
                <div className='card-details'> <FontAwesomeIcon className='icon-button' icon={faAnglesRight} /> </div>
              </div>
            </div>                     
          </div>
          <div className='card-wrapper'>            
            <div className='card-top'>
                <div className='card-category'>Breakfast</div>
              <img className='card-image' src={image}>
              </img>
            </div>
            <div className='card-content'>
              <h2>Hommemade Pizza</h2>
              <p>{lorem}</p> 
              <div className='card-info'>
                <div className='card-time'><FontAwesomeIcon className='icon' icon={faClock} />45 min</div>
                <div className='card-serving'><FontAwesomeIcon className='icon' icon={faUtensils} />4 persons</div>
                <div className='card-like'><FontAwesomeIcon className='icon' icon={faStar} />28</div>
                <div className='card-details'> <FontAwesomeIcon className='icon-button' icon={faAnglesRight} /> </div>
              </div>
            </div>                     
          </div>
          <div className='card-wrapper'>            
            <div className='card-top'>
                <div className='card-category'>Breakfast</div>
              <img className='card-image' src={image}>
              </img>
            </div>
            <div className='card-content'>
              <h2>Hommemade Pizza</h2>
              <p>{lorem}</p> 
              <div className='card-info'>
                <div className='card-time'><FontAwesomeIcon className='icon' icon={faClock} />45 min</div>
                <div className='card-serving'><FontAwesomeIcon className='icon' icon={faUtensils} />4 persons</div>
                <div className='card-like'><FontAwesomeIcon className='icon' icon={faStar} />28</div>
                <div className='card-details'> <FontAwesomeIcon className='icon-button' icon={faAnglesRight} /> </div>
              </div>
            </div>                     
          </div>
          </div>
          
          
          
          </>
        
                  
       

       
                   
        );
    }

    return (
      <div>
          Loading...
      </div>
    );
}
  
export default App;
  