import React from 'react';
import './Modal.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Likes from '../Card/Likes';
import { faUtensils, faClock, faStar, faAnglesRight } from '@fortawesome/free-solid-svg-icons';
const settings = require ('../../../settings/settings.json');


const Modal = ({open, onClose, modalRecipe}) => {
  if(!open)return null
  return(
    <>
        <div className='overlay'>
          <div onClick={(e)=>{ e.stopPropagation() }} className='modalContainerSmall'>            
            <div className='modal-body'><div className='mbl-content'><h3>Your recipe is about to be deleted</h3></div></div>           
            <div className='smallModalButtons'>
              <button className='red-button'>Delete</button>
              <div className="separator"></div>
              <button className='outlined-button'onClick= {onClose}>Cancel</button>
            </div>         
            
          </div>

        </div> 
    </>
    
  )
}

export default Modal;


//https://www.youtube.com/watch?v=D5oswSO9y-k