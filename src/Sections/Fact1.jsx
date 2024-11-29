import { RiDoubleQuotesL } from "react-icons/ri";
import { useInView } from 'react-intersection-observer';
import { useNavigate } from "react-router-dom";
import { BsArrowRightCircleFill } from "react-icons/bs";

function Fact1() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const navigate = useNavigate();

  return (
    <div
      ref={ref}
      className={`flex flex-col md:flex-row justify-around items-center mt-[8vh] md:mt-[20vh] bg-gradient-to-br from-clr1 via-clr3 to-clr2 
        rounded-[2vw] shadow-lg w-[98.6vw] py-[4vh] md:py-[12vh] px-[2vh] md:px-[6vh] 
        transition-all duration-[1.5s] ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
    >
      <img
        src="/Assets/online.jpg"
        alt="Online Dating Pic"
        className={`rounded-full w-[30vw] h-[30vw] md:w-[26vw] md:h-[26vw] object-cover shadow-xl 
          transition-transform duration-[1.5s] ease-out ${inView ? 'scale-100 rotate-0' : 'scale-75 rotate-6'}`}
      />
      <div
        className={`flex flex-col w-[88vw] md:w-[44vw] text-center md:text-left 
          transition-all duration-[1.5s] ease-out delay-200 ${inView ? 'opacity-100' : 'opacity-0 translate-y-10'}`}
      >
        <RiDoubleQuotesL
          className={`text-white drop-shadow-lg text-[12vw] md:text-[8vw] transition-transform duration-[1.5s] ease-out ${inView ? 'scale-100' : 'scale-75'}`}
        />
        <p
          className={`text-white font-light italic leading-relaxed text-[4vw] md:text-[1.8vw] transition-opacity duration-[1.5s] ease-out delay-400 
            ${inView ? 'opacity-100' : 'opacity-0 translate-y-10'}`}
        >
          "40% of couples now meet online and are 25% less likely to break up within the first year."
        </p>
        <button
          onClick={() => navigate('/signup')}
          className={`relative flex items-center justify-center border-none w-[20vw] bg-white text-[4vw] md:text-[1.6vw] rounded-[8vw] md:rounded-[2vw] 
            text-clr2 font-bold mt-[3vh] py-[1vh] md:py-[0.8vh] px-[8vh] md:px-[5vw] 
            hover:bg-clr2 hover:text-white hover:shadow-lg transition-transform transform-gpu duration-[1.5s] ease-out 
            ${inView ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}
        >
          Explore <BsArrowRightCircleFill className="ml-2 text-clr2 hover:text-white text-[5vw] md:text-[2vw]" />
        </button>
      </div>
    </div>
  );
}

export default Fact1;
