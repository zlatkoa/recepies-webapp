import React, { useState, useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import axios from 'axios';
import Card from '../../components/elements/Card/Card';
import Pagination from '../../components/elements/Pagination/Pagination';
import SectionHeader from '../../components/elements/Section/Section'
import '../Home/Home.css';


function App() {
  const [recipes, setRecipes] = useState([]);
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [loading, setLoading]= useState(false);
  const [currentPage, setCurrentPage]= useState(1);
  const [recipesPerPage]= useState(9);
  const params = useParams();


  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      const resRecipes = await axios.get('http://localhost:3000/recipes/category/'+params.category);
      const dataRecipes = await resRecipes.data.recipes;  
      setRecipes (dataRecipes);    
      setIsDataFetched(true);  
      setLoading(false);  
    }
    fetchRecipes(); 
    }, []);

  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  
  const paginate = pageNumber =>setCurrentPage(pageNumber)
  //https://www.youtube.com/watch?v=IYCa1F-OWmk

 

  if(isDataFetched) {
    
    if (recipes.length>0){
      return (
        <>     
              
          <div className='homecontainer'>
          <SectionHeader title={params.category}/>
          <Card recipes={currentRecipes} loading={loading} />
        </div>
        <div className='homecontainer'>
          <Pagination recipesPerPage={recipesPerPage} totalRecipes={recipes.length} paginate={paginate}/>
        </div>        

        </>
      
      );        
    }else{
      return (
        <Navigate to="/"/>
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
  