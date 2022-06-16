import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import SectionHeader from '../../../components/elements/Section/Section'
import './Login.css';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setCredentials} from '../../../features/auth/authApiSlice';


//https://www.youtube.com/watch?v=-JJFQ9bkUbo&t=109s
//26:07





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

        const reqBody = { email, password }; 

        try{
            const res = await axios.post('http://localhost:3000/users/login', reqBody, {
                headers :{
                    'Content-Type': 'application/json'
                }
            });
            setIsPending(false);
            console.log(res.data.token);
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
                    <form onSubmit ={handleSubmit}>
                        { showMessage && <h1>{message}</h1> }           
                        <label className='input-label'>Email</label>
                        <input
                            className='input-form'
                            type="email"
                            required
                            value ={email}
                            onChange={(e)=> setEmail(e.target.value)}
                        />           
                        <label className='input-label'>Password</label>
                        <input
                            className='input-form'
                            type="password"
                            required
                            value ={password}
                            onChange={(e)=> setPassword(e.target.value)}
                        />
                        { !isPending && <button className='green-button'>Log in</button> }
                        { isPending && <button className='green-button' disabled>Logging...</button>}      
                    </form>
                </div>
            </div>
        </div>
        </>

     

        
    );
  
}
  
export default App;
  