import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SectionHeader from '../../../components/elements/Section/Section'
import './Create.css';
import { useNavigate } from "react-router-dom";





function App() {
    const [first_name, setFirst_name] = useState ('');
    const [last_name, setLast_name] = useState ('');
    const [email, setEmail] = useState ('');
    const [birthday, setBirthday] = useState ('');
    const [password, setPassword] = useState ('');
    const [repeatPassword, setRepeatPassword] = useState ('');
    const [isPending, setIsPending]=useState(false);
    const [showMessage, setShowMessage]=useState(false);
    const [message, setMessage]=useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e)=>{
        e.preventDefault();
        setIsPending(true);

        const payload = { first_name, last_name, email, birthday, password}       

        try{
            const res = await axios.post('http://localhost:3000/users', payload, {
                headers :{
                    'Content-Type': 'application/json'
                }
            });
            setIsPending(false);
            setMessage('Your account is created. Please go to the login page');
            setShowMessage(true);
            //navigate('/');
                        
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

    return (
      <>
      <div className='page-container'>
        <SectionHeader title={'Create Account'}/>
          { showMessage && <h1>{message}</h1> }    
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
              <form onSubmit ={handleSubmit}>
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
                          value ={first_name}
                          onChange={(e)=> setFirst_name(e.target.value)}
                      />                
                    </div>
                    
                    <div className='container-item'>
                      <label className='input-label'>Email</label>
                        <input
                            className='input-form'
                          type="email"
                          required
                          value ={email}
                          onChange={(e)=> setEmail(e.target.value)}
                      />
                    </div>
                    <div className='container-item'>
                      <label className='input-label'>Password</label>
                        <input
                            className='input-form'
                          type="password"
                          required
                          value ={password}
                          onChange={(e)=> setPassword(e.target.value)}
                      />
                    </div>
                    <div className='container-item'>
                      { !isPending && <button className='green-button'>Create account</button> }
                      { isPending && <button className='green-button' disabled>Creating...</button>}      
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
                          onChange={(e)=> setLast_name(e.target.value)}
                      />
                    </div>
                    <div className='container-item'>
                      <label className='input-label'>birthday</label>
                        <input
                            className='input-form'
                          type="date"
                          required
                          value ={birthday}
                          onChange={(e)=> setBirthday(e.target.value)}
                      />
                    </div>
                    
                    <div className='container-item'>
                      <label className='input-label'>Repeat password</label>
                        <input
                            className='input-form'
                          type="password"
                          required
                          value ={repeatPassword}
                          onChange={(e)=> setRepeatPassword(e.target.value)}
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
  
export default App;
  