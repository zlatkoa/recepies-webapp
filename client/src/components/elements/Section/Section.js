import './Section.css';
const Header = ({ title, button }) => {

    return (
        <div className='section-header'>
            <div className='section-title'>
                <h1>
                    {title}
                </h1>
            </div>
            <div className='section-line'></div>
            <div>{button}</div>
        </div>

    );
};

export default Header;