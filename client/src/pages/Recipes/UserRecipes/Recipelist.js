import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../../../components/elements/Spinner/Spinner';

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

    
}
  
export default UserRecipes;
  