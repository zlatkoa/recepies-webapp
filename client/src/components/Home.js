import React, { useState, useEffect } from 'react';
import Card from './elements/Card/Card';
import './Card.css';

const image ='https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/delish-homemade-pizza-horizontal-1542312378.png'
const lorem ='Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est fuga deserunt incidunt, praesentium animi, assumenda soluta similique veniam placeat nobis nemo adipisci aliquid officia esse perferendis ab beatae, temporibus eos.'
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

          <div className='card-wrapper'>
            <div className='card-media'>
              <img src={image}>
              </img>
                <div className='card-category'>Breakfast</div>
            </div>
            <div className='card-Content'>
              <h2>Naslov na Receptata</h2>
              <p>{lorem}</p> 
            </div>
            <div className='card-footer'>
             <div className='card-time'>45 min</div>
             <div className='card-serving'>4 persons</div>
             <div className='card-like'>28</div>
             <div className='card-details'> >>> </div>
            </div>

          
          </div>
          
        );
    }

    return (
      <div>
          Loading...
      </div>
    );
}
  
export default App;
  