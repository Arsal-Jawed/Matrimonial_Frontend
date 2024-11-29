import React from 'react';
import { useNavigate } from 'react-router-dom';

function CityCard(props) {

  const {city,image,targetEmail} = props;
  const targetInfo = {city, targetEmail};

  const navigate = useNavigate();

  return (
    <div className="relative w-[26vw] h-[32vh] rounded-lg overflow-hidden shadow-2xl group">
      <img className="w-full h-full" src={image}></img>
        <div className="absolute inset-0 bg-black opacity-30 group-hover:opacity-60 transition-opacity duration-300"></div>
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 backdrop-blur-sm text-white text-center py-4">
          <h3 className="text-xl font-semibold">{city}</h3>
        </div>
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button onClick={() => {navigate('/location',{state:{targetInfo}})}} 
          className="bg-white text-black py-2 px-6 rounded-full shadow-md font-semibold text-lg hover:bg-black hover:text-white transition-colors duration-300">
            Visit
          </button>
        </div>
    </div>
  );
}

export default CityCard;
