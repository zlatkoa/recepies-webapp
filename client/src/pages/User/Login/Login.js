import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SectionHeader from '../../../components/elements/Section/Section'
import './Login.css';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify'
import { login, reset } from '../../../features/auth/authSlice'
import Spinner from '../../../components/elements/Spinner/Spinner'



function Login() {

  const [formData, setFormData] = useState({
    email : '',
    password : ''
  })

  const { email, password } = formData

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
      navigate('/')
    }
    dispatch(reset())
  },[user, isError, isSuccess, message, navigate, dispatch])


  const onChange = (e) => {
    setFormData((prevState)=>({
      ...prevState,
      [e.target.name]:e.target.value,
    }))
  }

  if(isLoading) {
    return <Spinner />
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const userData = {
        email,
        password
    }
    dispatch(login(userData))
  }
    
    // const [email, setEmail] = useState ('');
    // const [password, setPassword] = useState ('');
    // const [isPending, setIsPending]=useState(false);
    // const [showMessage, setShowMessage]=useState(false);
    // const [message, setMessage]=useState('');
    // const navigate = useNavigate();

    // const handleSubmit = async (e)=>{
    //     e.preventDefault();
    //     setIsPending(true);

    //     const reqBody = { email, password }; 

    //     try{
    //         const res = await axios.post('http://localhost:3000/users/login', reqBody, {
    //             headers :{
    //                 'Content-Type': 'application/json'
    //             }
    //         });
    //         setIsPending(false);
    //         console.log(res.data.token);
    //         //navigate('/');
                        
    //     }catch(err){
    //         if(err.response.stauts===500){
    //             setIsPending(false);
    //             console.log('Problem with the server');
    //         }else{
    //             setIsPending(false);
    //             console.log(err.response.data);
    //         }

    //     }
 
    // }

    return (
        <>
        <div className='page-container'>
            <SectionHeader title={'Login'}/>
            <div className='content-container'>
                <div className='container-left'>                    
                    <h1 className='header1'>
                        <p className='orange-text'>Wellcome to</p><p className='black-text'> Baby's</p>
                    </h1>
                    <p>
                    Log in to your account so you can share your delicious ideas with the world.
                    If you still do not have an account, then click on the create account button 
                    and in just a few clicks you will be able to share delicious recipes with the 
                    whole world. Your account is also your virtual notebook with cooking recipes 
                    that you can keep and share with your friends forever. Do you like someone's 
                    recipe? Click on the star, and you immediately have it in the list of your 
                    favorite recipes.
                    </p>
                </div>
                <div className='container-right'>
                    <form onSubmit ={onSubmit}>        
                        <label className='input-label'>Email</label>
                        <input
                            className='input-form'
                            type="email"
                            required
                            value ={email}
                            name='email'
                            placeholder='Enter your email address'
                            onChange={onChange}
                        />           
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
                        <button className='green-button'>Log in</button>   
                    </form>
                </div>
            </div>
        </div>
        </>

     

        
    );
  
}
  
export default Login;
  