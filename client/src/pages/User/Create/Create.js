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
        <form onSubmit ={handleSubmit}>
            { showMessage && <h1>{message}</h1> }
    
            <label>First Name</label>
            <input
                type="text"
                required
                value ={first_name}
                onChange={(e)=> setFirst_name(e.target.value)}
            />
            <label>Second Name</label>
            <input
                type="text"
                required
                value ={last_name}
                onChange={(e)=> setLast_name(e.target.value)}
            />
            <label>Email</label>
              <input
                type="email"
                required
                value ={email}
                onChange={(e)=> setEmail(e.target.value)}
            />
            <label>birthday</label>
              <input
                type="date"
                required
                value ={birthday}
                onChange={(e)=> setBirthday(e.target.value)}
            />
             <label>Password</label>
              <input
                type="password"
                required
                value ={password}
                onChange={(e)=> setPassword(e.target.value)}
            />
             <label>Repeat password</label>
              <input
                type="password"
                required
                value ={repeatPassword}
                onChange={(e)=> setRepeatPassword(e.target.value)}
            />
           
            { !isPending && <button>Create account</button> }
            { isPending && <button disabled>Craating...</button>}      

            
         
        </form>

     

        
    );
  
}
  
export default App;
  