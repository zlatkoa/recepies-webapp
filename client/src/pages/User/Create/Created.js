import{ Link, useNavigate } from 'react-router-dom';

function RegistrationDone() {
        return (
            <>        
            <div className='container'>                
                <h1>Well done. Your account is created. </h1>
                <Link to="/user/login" className='link'> Please proceed to the login page</Link>
            </div>
            </>
        );
    }
  
export default RegistrationDone;
  