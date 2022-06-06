import React, { useState, useEffect } from 'react';
import Card from './elements/Card/Card';
import SectionHeader from './elements/Section/Section'
import './Home.css';


  function App() {
    // Isprati HTTP req do server endpoint
    const [recipes, setRecipes] = useState(null);
    const [isDataFetched, setIsDataFetched] = useState(false);

    useEffect(() => {
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
      if (recipes.recipes.length>0){
        return (
          <div className='homecontainer'>
            <SectionHeader title={'Fresh & New'}/>
            <Card recipes={recipes}/>
            <SectionHeader title={'Most Popular'}/>
            <Card recipes={recipes}/>
          </div>
        );        
      }else{
        return (
          <div className='homecontainer'>
            <div>Database is empty. </div>
          </div>
        );
      }
    }else{
      return (
        <div className='homecontainer'>
          <div> Loading... </div>
        </div>        
      );

    }

    
}
  
export default App;
  