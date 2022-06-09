import React from 'react';
import './Modal.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils, faClock, faStar, faAnglesRight } from '@fortawesome/free-solid-svg-icons';
const settings = require ('../../../settings/settings.json');



const Modal = ({open, onClose}) => {
  if(!open)return null
  return(
    <>
      <div className ='overlay'>
      </div>
      <div onClick={(e)=>{ e.stopPropagation() }} className='modalContainer'>
        <div className='modal-header'>
          <div className='modal-header-left'>
              <h2>Mac & Bacon (and cheese)</h2>
          </div>
          <div className='modal-header-right'>
            <p onClick= {onClose} className='closeBtn'>&times;</p>
          </div>
        </div>
        <div className='modal-body'>
          <div className='modal-body-left'>
            <img src='http://localhost:3000/images/2022-06-07T07-42-44.036Z-34da4c4e-82c3-47d7-953d-121945eada1e00-giveitup-unhealthyfood.jpg'></img>
          <div className="mbl-content">
            <div className="mbl-content-header">
              <div className="header-name">
                <h3>Best served for</h3>
              </div>
              <div className="card-category">
                lunch
              </div>
            </div>
            <div className="mbl-content-description">
            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using ‘Content here, content here’, making it look like readable English.
            </div>
            <div className="mbl-content-footer">
            <div className='modal-card-info'>
              <div className='card-time'><FontAwesomeIcon className='icon' icon={faClock} />24 min</div>
              <div className='card-serving'><FontAwesomeIcon className='icon' icon={faUtensils} /> 10 persons</div>
              <div className='card-like'><FontAwesomeIcon className='icon' icon={faStar} />35</div>
             </div>
            </div>
          </div>
          </div>
          <div className='modal-body-right'>
            <div className="header-name">
                <h3>Recipe Details</h3>
            </div>
            <div className="modal-recipe-content">
            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using ‘Content here, content here’, making it look like readable English. Quisque blandit mattis risus, sed tincidunt ante finibus non. Nullam sit amet nunc lorem. Mauris lectus erat, accumsan quis nisl vel, feugiat rhoncus ipsum. Interdum et malesuada fames ac ante ipsum primis in faucibus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In at euismod leo. Fusce sed volutpat risus, fermentum feugiat enim. Etiam mollis ante quis nisl imperdiet, id commodo ante tincidunt. Duis bibendum scelerisque risus nec consectetur. Vivamus est elit, mollis vel malesuada non, porta id mauris. Quisque a vehicula lorem. Praesent in auctor quam. Etiam magna quam, sollicitudin id nunc eget, porttitor pretium tellus.

            </div>
      

          </div>

        </div>
      </div>      
    </>
    
  )
}

export default Modal;


//https://www.youtube.com/watch?v=D5oswSO9y-k