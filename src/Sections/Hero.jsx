import Login from "../Components/Login";
import { useState, useEffect } from "react";

function Hero() {
  const [isOpen, setOpen] = useState(false);
  const [isAnimated, setAnimated] = useState(false);

  const OpenLogin = () => setOpen(true);
  const CloseLogin = () => setOpen(false);

  useEffect(() => {
    setAnimated(true);
  }, []);

  return (
    <div id="hero-section">
      {isOpen && <Login onClose={CloseLogin} />}
      <div className='relative w-full h-[50vh] md:h-[100vh] flex flex-col justify-center items-center'>
        <div className="absolute inset-0 z-0 bg-cover bg-center" style={{ backgroundImage: `url('/hero.jpg')` }}>
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        </div>
        <div className={`relative z-10 flex flex-col items-center mt-[5vh] transition-all duration-1000 ease-out 
            ${isAnimated ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'}`}>
          <p className='text-clr3 text-[3.4vw] md:text-[1.4vw] font-semibold'>
            Connecting Hearts, Crafting Love Stories
          </p>
          <p className='text-white text-[5.2vw] md:text-[3.2vw] font-bold w-[70vw] md:w-[50vw] text-center'>
            YOUR JOURNEY TO HAPPILY EVER AFTER STARTS HERE
          </p>
          <button className='border-none bg-clr2 text-[4vw] md:text-[1.6vw] rounded-[8vw] md:rounded-[2vw] text-white font-bold mt-[3vh] p-[1vh] md:p-[1vh] px-[4vh] md:px-[4vw]
                    hover:bg-white hover:text-clr2' onClick={OpenLogin}>
            Start Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default Hero;
