import { FaRegHeart, FaCheckCircle, FaSmile, FaHeadset } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';

function Choose() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <div ref={ref} className="flex flex-col justify-center items-center md:mt-[20vh] mt-[6vh]">
      <p className={`text-[5vw] md:text-[2.6vw] font-bold transition-all duration-[1.5s] ease-out 
        ${inView ? 'opacity-100 translate-y-0 scale-110' : 'opacity-0 translate-y-20 scale-90'}`}>
        Why Choose <span className="text-clr2">Matrimonial</span>
      </p>

      <div className="flex md:flex-row flex-col justify-center items-center mt-[4vh] md:mt-[16vh] w-[90vw]">
        <div className={`flex flex-col items-center justify-center bg-gray-200 shadow-xl rounded-lg m-[2vw] p-[2vw] w-[60vw] h-[20vh] md:w-[20vw] md:h-[26vh] md:mt-[0vh] mt-[4vh]
          transition-all duration-[1.5s] ease-out delay-200
          ${inView ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-75 translate-y-20'}`}>
          <div className="flex items-center justify-center h-[10vh]">
            <FaRegHeart className="text-[16vw] md:text-[3.8vw] text-clr2" />
          </div>
          <p className="text-[3vw] md:text-[1vw] font-medium text-center">Over 10,000 successful matches and counting!</p>
        </div>

        <div className={`flex flex-col items-center justify-center bg-gray-200 shadow-xl rounded-lg m-[2vw] p-[2vw] w-[60vw] h-[20vh] md:w-[20vw] md:h-[26vh] md:mt-[0vh] mt-[4vh]
          transition-all duration-[1.5s] ease-out delay-400
          ${inView ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-75 translate-y-20'}`}>
          <div className="flex items-center justify-center h-[10vh]">
            <FaCheckCircle className="text-[16vw] md:text-[3.8vw] text-clr2" />
          </div>
          <p className="text-[3vw] md:text-[1vw] font-medium text-center">All profiles are verified to ensure genuine.</p>
        </div>

        <div className={`flex flex-col items-center justify-center bg-gray-200 shadow-xl rounded-lg m-[2vw] p-[2vw] w-[60vw] h-[20vh] md:w-[20vw] md:h-[26vh] md:mt-[0vh] mt-[4vh]
          transition-all duration-[1.5s] ease-out delay-600
          ${inView ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-75 translate-y-20'}`}>
          <div className="flex items-center justify-center h-[10vh]">
            <FaSmile className="text-[16vw] md:text-[3.8vw] text-clr2" />
          </div>
          <p className="text-[3vw] md:text-[1vw] font-medium text-center">95% of our users are satisfied with our service.</p>
        </div>

        <div className={`flex flex-col items-center justify-center bg-gray-200 shadow-xl rounded-lg m-[2vw] p-[2vw] w-[60vw] h-[20vh] md:w-[20vw] md:h-[26vh] md:mt-[0vh] mt-[4vh]
          transition-all duration-[1.5s] ease-out delay-800
          ${inView ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-75 translate-y-20'}`}>
          <div className="flex items-center justify-center h-[10vh]">
            <FaHeadset className="text-[16vw] md:text-[3.8vw] text-clr2" />
          </div>
          <p className="text-[3vw] md:text-[1vw] font-medium text-center">We offer round-the-clock support to assist you.</p>
        </div>
      </div>
    </div>
  );
}

export default Choose;
