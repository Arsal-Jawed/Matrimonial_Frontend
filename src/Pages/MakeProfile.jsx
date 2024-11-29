import {useLocation} from 'react-router-dom';
import ProfileForm from "../Components/ProfileForm";

function MakeProfile() {

  return (
    <div className="bg-gray-200 flex flex-col md:flex-row">
      <div className="relative flex flex-col justify-center items-start w-[99vw] h-[50vh] md:w-[50vw] md:h-[100vh] md:fixed bg-cover bg-center"
           style={{backgroundImage:`url('/Assets/signup.jpg')`,
           clipPath: 'polygon(0% 0%, 100% 10%, 80% 100%, 0% 90%)'
            }}>
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="relative z-10 px-8 w-[40vw]">
        <p className="text-[8vw] md:text-[3.2vw] italic text-clr1 z-10">Matrimonial</p>
                <p className="text-[5.4vw] md:text-[2.4vw] font-semibold text-white w-[60vw] md:w-[40vw] z-10">Join the journey to find your perfect match and create a lifetime of happiness</p>
                <p className="text-[2.7vw] md:text-[1vw] text-white w-[60vw] md:w-[40vw] z-10">At Matrimonial, we believe in the power of love and commitment. Our platform is designed to bring together individuals seeking meaningful connections.</p>
        </div>
      </div>

      <div className="ml-auto overflow-y-auto bg-white flex justify-center items-center z-50">
        <div className="w-full max-w-3xl">
          <ProfileForm />
        </div>
      </div>
    </div>
  );
}

export default MakeProfile;
