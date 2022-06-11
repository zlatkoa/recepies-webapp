import { useState }  from 'react';
import Modal from '../Modal/Modal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Card.css';
import { faUtensils, faClock, faStar, faAnglesRight } from '@fortawesome/free-solid-svg-icons';
const settings = require ('../../../settings/settings.json');



const Card = ({recipes, loading}) => {
    
    const [openModal, setOpenModal]= useState(false);
    const [modalRecipe, setModalRecipe]= useState(null);
    
    const handleModal = (recipe) => {
        setOpenModal(true);
        setModalRecipe(recipe);
    };
    

    if (loading){
        return <h2>Loading ...</h2>;
    }
   
     
    return (
        <>
            <Modal open={openModal} modalRecipe={modalRecipe} onClose={()=>setOpenModal(false)}/>
            <div className='cards'>
                {recipes.map((recipe)=> (
                    <div className='card-wrapper' key={recipe.id}>            
                        <div className='card-top'>
                            <div className='card-category'>{ recipe.category }</div>
                            <img className='card-image' src={ settings.url+recipe.picture }></img>
                        </div>
                        <div className='card-content'>
                            <h2>{ recipe.title }</h2>
                            <p>{ recipe.description }</p> 
                            <div className='card-info'>
                                <div className='card-time'><FontAwesomeIcon className='icon' icon={faClock} />{ recipe.time } min</div>
                                <div className='card-serving'><FontAwesomeIcon className='icon' icon={faUtensils} />{ recipe.people } persons</div>
                                <div className='card-like'><FontAwesomeIcon className='icon' icon={faStar} />{ recipe.likes }</div>
                                <div className='card-details' onClick={()=>handleModal(recipe)}> <FontAwesomeIcon className='icon-button' icon={faAnglesRight} /></div>
                            </div>
                        </div>                     
                    </div>
                ))}     
            </div>        
        </>
        
    );
};

export default Card;

