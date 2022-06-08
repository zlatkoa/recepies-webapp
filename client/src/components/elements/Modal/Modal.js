import React from 'react';
import './Modal.css';

const Modal = ({open, onClose}) => {
  if(!open)return null
  return(
    <div className ='overlay'>
      <div onClick={(e)=>{ e.stopPropagation() }} className='modalContainer'>
        <div className='modal-header'>
          <h2>Mac & Bacon</h2>

        </div>
        <div className='modal-body'>
          <div className='modal-body-left'>
            <img src='http://localhost:3000/images/2022-06-07T07-42-44.036Z-34da4c4e-82c3-47d7-953d-121945eada1e00-giveitup-unhealthyfood.jpg'></img>

          </div>
          <div className='modal-body-right'>

          </div>

        </div>
    


   

        <p onClick= {onClose} className='closeBtn'>X</p>

      </div>      
    </div>
  )
}

export default Modal;


//https://www.youtube.com/watch?v=D5oswSO9y-k