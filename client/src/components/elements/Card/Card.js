import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Card.css';
import {
    faUtensils,
    faClock,
    faStar,
    faAnglesRight,
} from '@fortawesome/free-solid-svg-icons';


const Card = (props) => {
    const { imgUrl, title, category, shortDescription, preparationTime, numberOfPeople, showModal } = props;
    return (
        <div className='card-wrapper'>
            <div className='card-top' style={{ backgroundImage: `url(${imgUrl})` }}>
                <div className='recipe-type'>{category}</div>
            </div>
            <div className='card-bottom'>
                <div className='card-content'>
                    <h2>{title}</h2>
                    <p>{shortDescription}</p>
                </div>
                <div className='card-icons'>
                    <div className='card-time'>
                        <FontAwesomeIcon icon={faClock} color='gray' />{' '}
                        {preparationTime} min
                    </div>
                    <div className='card-people'>
                        <FontAwesomeIcon icon={faUtensils} color='gray' />{' '}
                        {numberOfPeople} people
                    </div>
                    <div className='card-stars'>
                        <FontAwesomeIcon icon={faStar} color='gray' /> 30
                    </div>
                    <div className='card-button'>
                        <button onClick={showModal}>
                            <FontAwesomeIcon icon={faAnglesRight} color='white' />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;