import { FaShieldAlt, FaLock, FaCheckCircle, FaUserShield, FaKey, FaExclamationCircle } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';

function Secure() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const naviagte = useNavigate();

  return (
    <div ref={ref} className="relative flex flex-col items-center mt-[7vh] md:mt-[26vh]">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className={`absolute top-[-4%] left-[8%] md:left-[16%] flex flex-col items-center justify-center opacity-60 transform transition-transform duration-500 ${inView ? 'translate-x-0' : '-translate-x-10'}`}>
          <FaShieldAlt className="text-[12vw] md:text-[7vw] text-clr1 mb-[2vw]" />
        </div>
        <div className={`absolute top-[-4%] right-[8%] md:right-[16%] flex flex-col items-center justify-center opacity-60 transform transition-transform duration-500 ${inView ? 'translate-x-0' : 'translate-x-10'}`}>
          <FaCheckCircle className="text-[12vw] md:text-[7vw] text-clr4 mb-[2vw]" />
        </div>
        <div className={`absolute top-[32%] md:top-[30%] right-[3%] md:right-[6%] flex flex-col items-center justify-center opacity-60 transform transition-transform duration-500 ${inView ? 'translate-x-0' : 'translate-x-10'}`}>
          <FaUserShield className="text-[13vw] md:text-[8vw] text-clr1" />
        </div>
        <div className={`absolute top-[70%] left-[13%] flex flex-col items-center justify-center opacity-60 transform transition-transform duration-500 ${inView ? 'translate-x-0' : '-translate-x-10'}`}>
          <FaExclamationCircle className="text-[12vw] md:text-[7vw] text-clr4" />
        </div>
        <div className={`absolute bottom-[30%] md:bottom-[20%] left-[3%] md:left-[6%] flex flex-col items-center justify-center opacity-60 transform transition-transform duration-500 ${inView ? 'translate-x-0' : '-translate-x-10'}`}>
          <FaKey className="text-[12vw] md:text-[7vw] text-clr2 mb-[2vw]" />
        </div>
        <div className={`absolute top-[70%] right-[13%] flex flex-col items-center justify-center opacity-60 transform transition-transform duration-500 ${inView ? 'translate-x-0' : 'translate-x-10'}`}>
          <FaLock className="text-[12vw] md:text-[7vw] text-clr2" />
        </div>
      </div>

      <p className="text-[4vw] md:text-[2.4vw] font-bold text-clr4">
        <span className='font-bold'>Safe & Secure</span> Environment
      </p>
      <div className="flex flex-col items-center z-10">
        <div className="flex flex-col items-center mt-[2.2vh] md:mt-[5vh]">
          <p className={`text-[3.4vw] md:text-[2.6vw] text-clr1 w-[76vw] md:w-[60vw] text-center transition-opacity duration-500 ${inView ? 'opacity-100' : 'opacity-0 translate-y-5'}`}>
            We implement the highest security measures to ensure your data is protected.
          </p>
          <p className={`text-[3vw] w-[70vw] text-center md:w-[98vw] md:text-[1.7vw] text-clr3 transition-opacity duration-500 ${inView ? 'opacity-100' : 'opacity-0 translate-y-5'}`}>
            Our platform follows strict protocols for data encryption and user privacy.
          </p>
          <button onClick={() => {naviagte('/signup')}}
          className={`border-none bg-clr2 text-[3vw] md:text-[1.8vw] rounded-[8vw] md:rounded-[2vw] text-white font-bold mt-[1.8vh] md:mt-[3vh] p-[1vh] md:p-[1vh] px-[2vh] md:px-[2vw] 
            hover:bg-clr1 hover:text-white w-[38vw] md:w-[18vw] flex justify-center transition-opacity duration-500 ${inView ? 'opacity-100' : 'opacity-0 scale-75'}`}>
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
}

export default Secure;
