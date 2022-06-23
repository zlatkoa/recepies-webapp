import './Button.css';
import { FaPlus, FaArrowLeft } from 'react-icons/fa';
import { useEffect, useState } from 'react';



const Button = ({ action, icon, tooltip }) => {

  const [symbol, setSymbol] = useState(null);

  useEffect(() => {
    const symbol = () =>{ 
      switch (icon) {
        case 'plus': return <FaPlus/>; break;
        case 'back': return <FaArrowLeft />; break;
        default : return <></>;
      }
    }
    
    setSymbol(symbol);
  }, []);

  return (
    <>
    <div class="tooltip">
    <span class="tooltiptext">{tooltip}</span>
  
    <div className='button-round' onClick={action}>
      {symbol}      
    </div>
    </div>
    </>
  );
};
export default Button;