import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../../components/elements/Card/Card';
import Pagination from '../../components/elements/Pagination/Pagination';
import SectionHeader from '../../components/elements/Section/Section'
import './Home.css';


function Home() {
  const [recipes, setRecipes] = useState([]);
  const [popularRecipes, setPopularRecipes] = useState([]);
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [loading, setLoading]= useState(false);
  const [currentPage, setCurrentPage]= useState(1);
  const [recipesPerPage]= useState(3);
  const [openModal, setOpenModal]= useState(false);
  const [modalRecipe, setModalRecipe]= useState(null);
  


  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      const resRecipes = await axios.get('http://localhost:3000/recipes/latest');
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




  
  const paginate = pageNumber =>setCurrentPage(pageNumber)
  //https://www.youtube.com/watch?v=IYCa1F-OWmk
 
  if(isDataFetched) {
    if (recipes){
      return (
        <>
       
              
          <div className='page-container'>
          <SectionHeader title={'Fresh & New'}/>
          <Card recipes={currentRecipes} loading={loading} />
        </div>
        <div className='page-container'>
          <Pagination recipesPerPage={recipesPerPage} totalRecipes={recipes.length} paginate={paginate}/>
        </div>
        <div className='page-container'>
          <SectionHeader title={'Most Popular'}/>
          <Card recipes={popularRecipes} loading={loading} />
        </div>

        </>
      
      );        
    }else{
      return (
        <div className='page-container'>
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
  
export default Home;
  