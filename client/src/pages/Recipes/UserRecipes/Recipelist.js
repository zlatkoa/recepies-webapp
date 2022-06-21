import './Recipelist.css'
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Navigate, Link } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../../../components/elements/Spinner/Spinner';
import SectionHeader from '../../../components/elements/Section/Section'
import { FaTrashAlt, FaEdit } from 'react-icons/fa';

import { useSelector, useDispatch } from 'react-redux'
import {logout, reset} from '../../../features/auth/authSlice'

function UserRecipes() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {user} = useSelector((state)=>state.auth)
 
  const [recipes, setRecipes] = useState([]);
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [loading, setLoading]= useState(false);
  const [currentPage, setCurrentPage]= useState(1);
  const [recipesPerPage]= useState(9);
  const params = useParams();

  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  }

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      const resRecipes = await axios.get('http://localhost:3000/recipes/user/'+user.payload.id, config);
      const dataRecipes = await resRecipes.data.recipes;  
      setRecipes (dataRecipes);  
      console.log(dataRecipes)  
      setIsDataFetched(true);  
      setLoading(false);  
    }
   
    fetchRecipes();
    }, []);
  


  

if(loading) {
    return <Spinner />

}
if(isDataFetched) {
    
  if (recipes.length>0){
    return (
      <>     
            
        <div className='page-container'>
        <SectionHeader title={"My Recipes"}/>
        <div>New Recipe</div>
        <table className='recipe-table'>
          <thead className='orange-text recipe-table-header'>
            <tr>
              <th className='table-column1'>Recipe Name</th>
              <th className='table-column2'>Category</th>
              <th className='table-column3'>Created On</th>
              <th className='table-column4'>Edit</th>
              <th className='table-column5'>Delete</th>
            </tr>
          </thead>
          <tbody>
            <tr className='recipe-table-row'>
              <td className='table-column1'><p>Homemade Pizza</p></td>
              <td className='table-column2'><div className='card-category'>Brunch</div></td>
              <td className='table-column3'>22.11.2020</td>
              <td className='table-column4'><FaEdit/></td>
              <td className='table-column5'><FaTrashAlt/></td>
            </tr>
            <div className='spacer'></div>
              <tr className='recipe-table-row'>            
                <td className='table-column1'><p>Homemade Pizza</p></td>
                <td className='table-column2'><div className='card-category'>Brunch</div></td>
                <td className='table-column3'>22.11.2020</td>
                <td className='table-column4'><FaEdit/></td>
                <td className='table-column5'><FaTrashAlt/></td>          
              </tr>
              <div className='spacer'></div>

            <tr className='recipe-table-row'>
              <td className='table-column1'><p>Homemade Pizza</p></td>
              <td className='table-column2'><div className='card-category'>Brunch</div></td>
              <td className='table-column3'>22.11.2020</td>
              <td className='table-column4'><FaEdit/></td>
              <td className='table-column5'><FaTrashAlt/></td>
            </tr>
          </tbody>
        </table>
      </div>        

      </>
    
    );        
  }else{
    return (
      <div className='page-container'>
        <SectionHeader title={"My Recipes"}/>
        <div className='container'>
        <p>You recipe book is empty. Please enter new recipe </p>

        </div>
      </div>
    );
  }

}else{
  return (    
    <div className='page-container'>
      <SectionHeader title={"My Recipes"}/>
      <div> Loading posts from the server, please wait ... </div>
    </div>        
  );
}    
    
}
  
export default UserRecipes;
  