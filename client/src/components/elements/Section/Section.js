import './Section.css';
const Header = (props) => {  
    
    return (
        <div className='section-header'>
            <div className='section-title'>
                <h1>
                    {props.title}
                </h1>
            </div>
            <div className='section-line'></div>
        </div>
        
    );
};

export default Header;