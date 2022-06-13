import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SectionHeader from '../../../components/elements/Section/Section'
import './Login.css';
import { useNavigate } from "react-router-dom";





function App() {
    
    const [email, setEmail] = useState ('');
    const [password, setPassword] = useState ('');
    const [isPending, setIsPending]=useState(false);
    const [showMessage, setShowMessage]=useState(false);
    const [message, setMessage]=useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e)=>{
        e.preventDefault();
        setIsPending(true);

        const payload = { email, password}       

        try{
            const res = await axios.post('http://localhost:3000/users', payload, {
                headers :{
                    'Content-Type': 'application/json'
                }
            });
            setIsPending(false);
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
        <form onSubmit ={handleSubmit}>
            { showMessage && <h1>{message}</h1> }
    
            
            <label>Email</label>
              <input
                type="email"
                required
                value ={email}
                onChange={(e)=> setEmail(e.target.value)}
            />           
             <label>Password</label>
              <input
                type="password"
                required
                value ={password}
                onChange={(e)=> setPassword(e.target.value)}
            />
             
           
            { !isPending && <button>Log in</button> }
            { isPending && <button disabled>Logging...</button>}      
            
         
        </form>

     

        
    );
  
}
  
export default App;
  