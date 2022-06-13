import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SectionHeader from '../../../components/elements/Section/Section'
import './New.css';
import { useNavigate } from "react-router-dom";





function App() {
    const [title, setTitle] = useState ('');
    const [category, setCategory] = useState ('breakfast');
    const [time, setTime] = useState ('');
    const [people, setPeople] = useState ('');
    const [description, setDescription] = useState ('');
    const [content, setContent] = useState ('');
    const [creator, setCreator] = useState ('629e3bdfa6c981b77e64ea19');
    const [picture, setPicture]= useState ('');
    const [isPending, setIsPending]=useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e)=>{
        e.preventDefault();
        setIsPending(true);
        const formData = new FormData();

        console.log(picture);
        
        formData.append('picture',picture);
        formData.append('title', title);
        formData.append('description', description);
        formData.append('category',category);
        formData.append('time',time);
        formData.append('people',people);
        formData.append('content',content);
        formData.append('creator',creator);

        try{
            const res = await axios.post('http://localhost:3000/recipes', formData, {
                headers :{
                    'Content-Type': 'multipart/form-data'
                }
            });
            setIsPending(false);
            //resetForm();
            navigate('/');
                        
        }catch(err){
            if(err.response.stauts===500){
                setIsPending(false);
                console.log('Problem with the server');
            }else{
                setIsPending(false);
                console.log(err.response.data);
            }

        }
 
    }

    const resetForm = () => {
        setTitle('');
        setCategory('breakfast');
        setTime('');
        setPeople('');
        setDescription('');
        setContent('');
        setPicture('');    
    };

    return (
        <form onSubmit ={handleSubmit}>
            <label>Recipe Image</label>
           
            {picture && <img src={URL.createObjectURL(picture)}></img>}
            <input
                type="file"
                required
                onChange={(e)=> setPicture(e.target.files[0])}
                
            />
            <label>Recipe Title</label>
            <input
                type="text"
                required
                value ={title}
                onChange={(e)=> setTitle(e.target.value)}
            />
            <label>Category</label>
            <select
            value = {category}
            onChange ={(e)=> setCategory(e.target.value)}>
                <option value="breakfast">Breakfast</option>
                <option value="brunch">Brunch</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
            </select>
            <label>Preparation Time</label>
            <input
                type="number"
                required
                value ={time}
                onChange={(e)=> setTime(e.target.value)}
            />
            <label>No. People</label>
            <input
                type="number"
                required
                value ={people}
                onChange={(e)=> setPeople(e.target.value)}
            />
             <label>Short Description</label>
            <input
                type="textarea"
                required
                value ={description}
                onChange={(e)=> setDescription(e.target.value)}
            />
               <label>Recipe</label>
            <input
                type="textarea"
                required
                value ={content}
                onChange={(e)=> setContent(e.target.value)}
            />
            { !isPending && <button>Save</button> }
            { isPending && <button disabled>Saving...</button>}      

            
         
        </form>

     

        
    );
  
}
  
export default App;
  