import { Titlebar, CityCard } from '../Components';
import { FaMapMarkerAlt, FaGlobeAmericas } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';

function City() {

  const Cities = [

    {image:"Cities/karachi.jpg",name:"Karachi"},
    {image:"Cities/lahore.jpg",name:"Lahore"},
    {image:"Cities/islamabad.jpg",name:"Islamabad"},
    {image:"Cities/rawalpindi.jpg",name:"Rawalpindi"},
    {image:"Cities/peshawar.jpg",name:"Peshawar"},
    {image:"Cities/multan.jpg",name:"Multan"}
  ];

  const location = useLocation();
  const {email} = location.state;

  return (
    <div className="flex flex-col justify-center">
      <Titlebar />
      <div className="flex flex-col mt-[4vh] justify-center items-center w-[98vw]">
        <div className="flex items-center gap-4">
          <FaMapMarkerAlt className="text-clr1 text-[3vw]" />
          <p className="text-[1.6vw] font-bold bg-gradient-to-r from-clr1 to-clr3 bg-clip-text text-transparent">
            Select City for Meeting
          </p>
          <FaGlobeAmericas className="text-clr1 text-[3vw]" />
        </div>
        <div className="m-[2vw] flex flex-row flex-wrap gap-[2vw] justify-center w-[98vw] overflow-auto custom-scrollbar">
          {Cities.map((ct,index) => (
            <CityCard
                city= {ct.name}
                image= {ct.image}
                targetEmail= {email}
            />
          ))

          }
        </div>
      </div>
    </div>
  );
}

export default City;
