import React from 'react';
import './Modal.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils, faClock, faStar, faAnglesRight } from '@fortawesome/free-solid-svg-icons';
const settings = require ('../../../settings/settings.json');




const Modal = ({open, onClose, modalRecipe}) => {
  if(!open)return null
  console.log(modalRecipe);
  return(
    <>
      <div className ='overlay'>
      </div>
      <div onClick={(e)=>{ e.stopPropagation() }} className='modalContainer'>
        <div className='modal-header'>
          <div className='modal-header-left'>
              <h2>{modalRecipe.title}</h2>
          </div>
          <div className='modal-header-right'>
            <p onClick= {onClose} className='closeBtn'>&times;</p>
          </div>
        </div>
        <div className='modal-body'>
          <div className='modal-body-left'>
            <img src={settings.url+modalRecipe.picture}></img>
          <div className="mbl-content">
            <div className="mbl-content-header">
              <div className="header-name">
                <h3>Best served for</h3>
              </div>
              <div className="card-category">
                {modalRecipe.category}
              </div>
            </div>
            <div className="mbl-content-description">
            {modalRecipe.description}
            </div>
            <div className="mbl-content-footer">
            <div className='modal-card-info'>
              <div className='card-time'><FontAwesomeIcon className='icon' icon={faClock} />{modalRecipe.time} min</div>
              <div className='card-serving'><FontAwesomeIcon className='icon' icon={faUtensils} /> {modalRecipe.people} persons</div>
              <div className='card-like'><FontAwesomeIcon className='icon' icon={faStar} />{modalRecipe.likes}</div>
             </div>
            </div>
          </div>
          </div>
          <div className='modal-body-right'>
            <div className="header-name">
                <h3>Recipe Details</h3>
            </div>
            <div className="modal-recipe-content">
            {modalRecipe.content}
            </div>  
           </div>

        </div>
      </div>      
    </>
    
  )
}

export default Modal;


//https://www.youtube.com/watch?v=D5oswSO9y-k