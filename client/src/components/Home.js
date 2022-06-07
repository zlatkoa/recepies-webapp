import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './elements/Card/Card';
import SectionHeader from './elements/Section/Section'
import './Home.css';

function App() {
  const [recipes, setRecipes] = useState([]);
  const [popularRecipes, setPopularRecipes] = useState([]);
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [loading, setLoading]= useState(false);
  const [currentPage, setCurrentPage]= useState(1);
  const [recipesPerPage, setRecipesPerPage]= useState(3);

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      const resRecipes = await axios.get('http://localhost:3000/recipes');
      const dataRecipes = await resRecipes.data.recipes;  
      setRecipes (dataRecipes);        
    }
    fetchRecipes();

    const fetchPopularRecipes = async () =>{    
      const resPopular = await axios.get ('http://localhost:3000/recipes/popular')
      const dataPopular = await resPopular.data.recipes;        
      setPopularRecipes(dataPopular);
      setIsDataFetched(true);
      setLoading(false);     
    }  
    fetchPopularRecipes();
  }, []);

  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);


//https://www.youtube.com/watch?v=IYCa1F-OWmk


  if(isDataFetched) {
    if (recipes){
      return (
        <div className='homecontainer'>
          <SectionHeader title={'Fresh & New'}/>
          <Card recipes={currentRecipes} loading={loading}/>
          <SectionHeader title={'Most Popular'}/>
          <Card recipes={popularRecipes} loading={loading}/>
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
        <div> Loading posts from the server, please wait ... </div>
      </div>        
    );
  }    
}
  
export default App;
  