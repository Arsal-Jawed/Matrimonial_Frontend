import SignupForm from "../Components/SignupForm";

function Signup(){

    return(
        <div className="flex flex-col md:flex-row bg-gray-200 z-50">
               <div className="relative flex flex-col justify-center items-start px-[8vh] w-[99vw] h-[50vh] md:w-[50vw] md:h-[100vh] absolute inset-0 z-0 bg-cover bg-center"
               style={{backgroundImage:`url('/Assets/signup.jpg')`,
               clipPath: 'polygon(0% 0%, 100% 10%, 80% 100%, 0% 90%)'
                }}>
                <div className="absolute inset-0 bg-black bg-opacity-60"></div>
                <p className="text-[8vw] md:text-[3.2vw] italic text-clr1 z-10">Matrimonial</p>
                <p className="text-[5.4vw] md:text-[2.4vw] font-semibold text-white w-[60vw] md:w-[40vw] z-10">Join the journey to find your perfect match and create a lifetime of happiness</p>
                <p className="text-[2.7vw] md:text-[1vw] text-white w-[60vw] md:w-[40vw] z-10">At Matrimonial, we believe in the power of love and commitment. Our platform is designed to bring together individuals seeking meaningful connections.</p>
               </div>

               <div className="flex flex-col justify-center items-center w-[98vw] md:w-[53vw] z-50">
                <SignupForm/>
               </div>
        </div>
    );
}

export default Signup;