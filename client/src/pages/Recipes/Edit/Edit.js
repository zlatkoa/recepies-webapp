import React, { useState, useEffect} from 'react';
import axios from 'axios';
import SectionHeader from '../../../components/elements/Section/Section'
import Button from '../../../components/Button/Button';
import './Edit.css';
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
const settings = require ('../../../settings/settings.json');




function EditRecipe() {
    const location = useLocation();     
    const {recipe} = location.state
    const [title, setTitle] = useState(recipe.title);
    const [category, setCategory] = useState(recipe.category);
    const [time, setTime] = useState(recipe.time);
    const [people, setPeople] = useState(recipe.people);
    const [description, setDescription] = useState(recipe.description);
    const [content, setContent] = useState(recipe.content);
    const [creator, setCreator] = useState(recipe.creator);
    const [picture, setPicture] = useState(settings.url+recipe.picture);
    const [previewPic, setPreviewPic]=useState(true);
    const [isPending, setIsPending] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)

    const config = {
        headers: {
            Authorization: `Bearer ${user.token}`,
            'Content-Type': 'multipart/form-data'
        },
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsPending(true);
        const formData = new FormData();

     
        

        formData.append('picture', picture);
        formData.append('title', title);
        formData.append('description', description);
        formData.append('category', category);
        formData.append('time', time);
        formData.append('people', people);
        formData.append('content', content);
        formData.append('creator', user.payload.id);
       
        console.log(user.token);
        console.log('---------------');
        console.log(recipe._id)
    
        try {
            
            const res = await axios.patch('http://localhost:3000/recipes/'+recipe._id, formData, config);
            setIsPending(false);
            //resetForm();
            navigate('/recipes/user');

        } catch (err) {
            if (err.response.stauts === 500) {
                setIsPending(false);
                console.log('Problem with the server');
            } else {
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
        <div className="page-container">
            <SectionHeader title={'My Recipes'} button={<Button action={() => { navigate('/recipes/user') }} icon={'back'} tooltip={'Back to your recipe list'} />} />
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <div className="form-left">
                        <label className='input-label'>Recipe Image</label>
                        <div className="recipe-image">
                        {picture && <img src= {previewPic ? picture : URL.createObjectURL(picture)}></img>} 
                            
                        </div>

                        <label className='file-label' htmlFor='file' >Upload Image </label>

                        <input
                            id="file"
                            className='input-file'
                            type="file"
                            accept="image/*"
                            
                            onChange={(e) => {setPicture(e.target.files[0]);  setPreviewPic(false)}}
                        />
                    </div>
                    <div className="form-middle">
                        <label className='input-label'>Recipe Title</label>
                        <input
                            className='input-form'
                            type="text"
                            
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <div className="form-middle-items">
                            <div className="left-item">
                                <label className='input-label'>Category</label>
                                <select
                                    className='input-form'
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}>
                                    <option value="breakfast">Breakfast</option>
                                    <option value="brunch">Brunch</option>
                                    <option value="lunch">Lunch</option>
                                    <option value="dinner">Dinner</option>
                                </select>
                            </div>
                            <div className="middle-item">
                                <label className='input-label'>Preparation Time</label>
                                <input
                                    className='input-form'
                                    type="number"
                                    required
                                    value={time}
                                    onChange={(e) => setTime(e.target.value)}
                                />
                            </div>
                            <div className="right-item">
                                <label className='input-label'>No. People</label>
                                <input
                                    className='input-form'
                                    type="number"
                                    required
                                    value={people}
                                    onChange={(e) => setPeople(e.target.value)}
                                />
                            </div>
                        </div>
                        <label className='input-label'>Short Description</label>
                        <textarea
                            className='input-form text-area1'
                            rows="5"
                            cols="50"
                            
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        {!isPending && <button className='green-button'>Save</button>}
                        {isPending && <button className='green-button' disabled>Saving...</button>}
                    </div>
                    <div className="form-right">

                        <label className='input-label'>Recipe</label>
                        <textarea
                            className='input-form text-area'
                            rows="35"
                            cols="50"
                            
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </div>
                </form>
            </div>

        </div>
    );
}

export default EditRecipe;
