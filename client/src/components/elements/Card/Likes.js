import { useState, useEffect }  from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import './Card.css';
const settings = require ('../../../settings/settings.json');

const Like = ({recipeId})=>{
    const [likes, setLikes]=useState(0); 
    const [likedByUser, setLikedByUser]=useState(false);
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        const getLikes = async () => {
            const res = await axios.get(settings.url+'likes/recipe/'+recipeId);
            setLikes(res.data.like);           
        }
        getLikes();

        const isLikedByUser  = async () =>{
            let payload ={
                user : user.payload.id,
                recipe : recipeId            
            };
            let config = {
                headers: {
                    Authorization: `Bearer ${user.token}`               
                },
            }     
            const res = await axios.post(settings.url+'likes/user/', payload, config);
            if(res.data.like.length>0){
                setLikedByUser(true)
            };
        }
        isLikedByUser();
    },[]);

    const handleLike= async ()=>{
        let payload ={
            user : user.payload.id,
            recipe : recipeId            
        };
        let config = {
            headers: {
                Authorization: `Bearer ${user.token}`               
            },
        }     
        const res = await axios.post(settings.url+'users/like/', payload, config);
        const updateLikeCounter = await axios.get(settings.url+'likes/recipe/'+recipeId);
        setLikes(updateLikeCounter.data.like);
        const liked = await axios.post(settings.url+'likes/user/', payload, config);
        if(liked.data.like.length>0){
            setLikedByUser(true)
        }else{
            setLikedByUser(false)
        };    
    }

    if (!user){
        return (
            <div className='card-like' onClick={()=>toast.info('Good choice. But first you need to login to like some recipes')}><FontAwesomeIcon className='icon' icon={faStar} />{ likes }</div>
        )
    }
    return (
        <div className='card-like' 
        onClick={()=>handleLike()}>
            <FontAwesomeIcon 
            className='icon'
            style ={{color: likedByUser ?'orange':'grey' }}
            icon={faStar} />
            { likes }
            </div>
    )

};

export default Like;