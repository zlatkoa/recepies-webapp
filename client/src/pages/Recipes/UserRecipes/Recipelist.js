import './Recipelist.css'
import moment from 'moment';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Navigate, Link } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../../../components/elements/Spinner/Spinner';
import SectionHeader from '../../../components/elements/Section/Section';
import EditRecipe from '../Edit/Edit';
import { FaTrashAlt, FaEdit, FaPlus, FaArrowLeft } from 'react-icons/fa';
import Button from '../../../components/Button/Button'

import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../../../features/auth/authSlice'
import { toast } from 'react-toastify';

function UserRecipes() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  const [recipes, setRecipes] = useState([]);
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage] = useState(9);
  const params = useParams();

  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  }

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      const resRecipes = await axios.get('http://localhost:3000/recipes/user/' + user.payload.id, config);
      const dataRecipes = await resRecipes.data.recipes;
      setRecipes(dataRecipes);
      setIsDataFetched(true);
      setLoading(false);
    }

    fetchRecipes();
  }, []);


  const deleteRecipe = async (recipe_id)=>{
    await axios.delete('http://localhost:3000/recipes/' +recipe_id, config)
    window.location.reload(false); 
  }

  const editRecipe = (recipe)=>{
    navigate('/recipes/edit', {state:{recipe}})
   
  };





  if (loading) {
    return <Spinner />

  }
  if (isDataFetched) {

    if (recipes.length > 0) {
      return (
        <>
          <div className='page-container'>
            <SectionHeader title={"My Recipes"} button={<Button action={() => { navigate('/recipes/new') }} icon={'plus'} tooltip={'Click me to add new reicipe'} />} />
            <table className='recipe-table'>
              <thead className='orange-text recipe-table-header'>
                <tr>
                  <th className='table-column1'>Recipe Name</th>
                  <th className='table-column2'>Category</th>
                  <th className='table-column3'>Created On</th>
                  <th className='table-column1'>Likes</th>
                  <th className='table-column4'>Edit</th>
                  <th className='table-column5'>Delete</th>
                </tr>
              </thead>
              <tbody>
                {recipes.map((recipe)=> (
                  <>
                  <tr className='recipe-table-row' key={recipe._id}>
                  <td className='table-column1'><p>{recipe.title}</p></td>
                  <td className='table-column2'><div className='card-category'>{recipe.category}</div></td>
                  <td className='table-column3'>{moment(recipe.createdAt).format('DD.MM.YYYY | HH:MM')}</td>
                  <td className='table-column5'>{recipe.likes}</td>
                  <td className='table-column4' onClick={()=>editRecipe(recipe)}><FaEdit className='button-hover' /></td>
                  <td className='table-column5' onClick={()=>deleteRecipe(recipe._id)}><FaTrashAlt className='button-hover'/></td>
                </tr>
                <tr className='spacer'></tr>
                  </>
                ))}
                
                
              </tbody>
            </table>
          </div>

        </>

      );
    } else {
      return (
        <div className='page-container'>
          <SectionHeader title={"My Recipes"} button={<Button action={() => { navigate('/recipes/new') }} icon={'plus'} tooltip={'Click me to add new reicipe'}/>}/>
          
          <div className='container'>
            <p>You recipe book is empty. Please enter new recipe </p>

          </div>
        </div>
      );
    }

  } else {
    return (
      <div className='page-container'>
        <SectionHeader title={"My Recipes"} />
        <div> Loading posts from the server, please wait ... </div>
      </div>
    );
  }

}

export default UserRecipes;
