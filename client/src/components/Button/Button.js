import './Button.css';
import { FaPlus, FaArrowLeft } from 'react-icons/fa';
import { useEffect, useState } from 'react';



const Button = ({ action, icon }) => {

  const [symbol, setSymbol] = useState(null);

  useEffect(() => {

    setSymbol(icon);
  }, []);

  console.log(symbol);
  return (
    <div className='button-round' onClick={action}>
      {symbol}


      {/* {icon == "back" ? <FaArrowLeft /> : <FaPlus />} */}
    </div>
  );
};
export default Button;