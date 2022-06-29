import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify'
import { register, reset, logout } from '../../../features/auth/authSlice'
import axios from 'axios';
import SectionHeader from '../../../components/elements/Section/Section'
import './Create.css';
import Spinner from '../../../components/elements/Spinner/Spinner'


function Register() {

  const [formData, setFormData] = useState({
    first_name : '',
    last_name : '',
    email : '',
    birthday : '',
    password : '',
    password2 : ''
  })

  const { first_name, last_name, email, birthday, password, password2 } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )
  
  useEffect(() => {
    if(isError){
      toast.error(message)
    }
    if(isSuccess || user) {
      dispatch(logout())
      dispatch(reset())
      toast.success('Your account is created :)')
      navigate('/user/login')
    }

    dispatch(reset())

  },[user, isError, isSuccess, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState)=>({
      ...prevState,
      [e.target.name]:e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    if(password != password2){
      toast.error('Passwords do not match, please check your password')
    }else {
      const userData = {
        first_name, 
        last_name, 
        email, 
        birthday, 
        password
      }
      dispatch(register(userData))
    }
  }

  if (isLoading) {return <Spinner />}
  
  return (
    <>
    <div className='page-container'>
      <SectionHeader title={'Create Account'}/>   
        <div className='content-container'>               
          <div className='container-left-create'>                    
            <h1 className='header1'>
              <p className='orange-text'>Create your</p><p className='black-text'> account</p>
            </h1>
            <p>
              Create account so you can share your delicious ideas with the world.
              Your account is also your virtual notebook with cooking recipes 
              that you can keep and share with your friends forever. 
            </p>
          </div>              
          <div className='container-right-create'>
            <form onSubmit ={onSubmit}>
              <div className='container-form'>               
                <div className='container-form-left'>
                  <div className='container-item'> 
                  </div>
                  <div className='container-item'>              
                    <label className='input-label'>First Name</label>
                    <input
                        className='input-form'
                        type="text"
                        required
                        name='first_name'
                        placeholder='Enter your first name'
                        value ={first_name}
                        onChange={onChange}
                    />                
                  </div>
                  
                  <div className='container-item'>
                    <label className='input-label'>Email</label>
                      <input
                        className='input-form'
                        type="email"
                        required
                        name='email'
                        placeholder='Enter your email'
                        value ={email}
                        onChange={onChange}
                    />
                  </div>
                  <div className='container-item'>
                    <label className='input-label'>Password</label>
                      <input
                        className='input-form'
                        type="password"
                        required
                        value ={password}
                        name='password'
                        placeholder='Enter your password'
                        onChange={onChange}
                    />
                  </div>

                  <div className='container-item'>
                    <button type='submit' className='green-button'>Create account</button>   
                  </div>
                </div>

                <div className='container-form-right'>
                  <div className='container-item'>  
                      <label className='input-label'>Second Name</label>
                      <input
                          className='input-form'
                          type="text"
                          required
                          value ={last_name}
                          name='last_name'
                          placeholder='Enter your last name'
                          onChange={onChange}
                      />
                    </div>
                    <div className='container-item'>
                      <label className='input-label'>birthday</label>
                        <input
                          className='input-form'
                          type="date"
                          required
                          value ={birthday}
                          name='birthday'
                          placeholder='Enter your birth date'
                          onChange={onChange}
                      />
                    </div>                    
                    <div className='container-item'>
                      <label className='input-label'>Repeat password</label>
                        <input
                          className='input-form'
                          type="password"
                          required
                          value ={password2}
                          name='password2'
                          placeholder='Confirm your password'
                          onChange={onChange}
                      />           
                    </div>
                </div>
              </div>               
            </form>
          </div>
        </div>
    </div>        
    </> 
  );  
}
  
export default Register;
  