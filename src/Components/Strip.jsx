import { FaComment, FaHandshake, FaThumbsUp,FaStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import CONFIG from '../Configuration';

function Stripe(props){
    console.log(props);

    const StoredData = localStorage.getItem("user");
    const user = JSON.parse(StoredData);

    const navigate = useNavigate();
    const IP = CONFIG.IP || 'localhost';
    const PORT = CONFIG.PORT;

    const Chat = async() => {
        
        let data;
        const StoredData = localStorage.getItem("user");
        const user = JSON.parse(StoredData);
        
            const mail2 = props.email;
            const mail1 = user.email;
            const Check = {
                mail1,
                mail2
            }
            const response = await fetch(`http://${IP}:${PORT}/rooms/chatRoom`,{
                method: 'POST',
                body: JSON.stringify(Check),
                headers: {'Content-Type':'application/json'}
            });
    
            data = await response.json();

        const profile = {
            username: props.username,
            profession: props.occupation,
            city: props.city,
            country: props.country,
            photo: props.profile_image,
            room: data
        }
        console.log("Chat Function Called");
        navigate('/chat',{state:{profile}});
    }

    return (
        <div className="relative group m-[0.6vw] mb-[1vw] p-[1vh] bg-gradient-to-r from-gray-100 to-gray-200 rounded-[1vw] shadow-lg transition-all duration-300">
         <div className="absolute top-[1vw] right-[3vw] flex items-center justify-center w-[2.5vw] h-[2.5vw] text-clr1 ">
        <FaStar className="text-[2vw]" />
         </div>
          <div className="flex flex-row items-center">
            <img
              src={props.profile_image}
              alt="Profile Pic"
              className="w-[3vw] h-[3vw] rounded-full border-[0.3vw] border-clr2 shadow-md transition-all duration-300 transform group-hover:scale-105"
            />
            <p className="ml-[0.8vw] text-clr2 font-semibold text-[1vw] italic bg-gradient-to-r from-clr1 to-clr2 bg-clip-text text-transparent">
              {props.username}
            </p>
          </div>
          <div className="absolute inset-0 bg-gray-800 bg-opacity-70 flex items-center justify-center gap-[1vw] rounded-[1vw] opacity-0 group-hover:opacity-100 transition-all duration-300">
  
            <button
              onClick={Chat}
              className="flex items-center justify-center text-white text-[1.2vw] p-[0.5vh] px-[1vw] bg-green-500 hover:bg-green-600 rounded-[0.8vw] shadow-md transition-all duration-300 transform hover:scale-105"
            >
              <FaComment />
            </button>
            <button
              className="flex items-center justify-center text-white text-[1.2vw] p-[0.5vh] px-[1vw] bg-clr4 hover:bg-blue-700 rounded-[0.8vw] shadow-md transition-all duration-300 transform hover:scale-105"
            >
              <FaHandshake />
            </button>
          </div>
        </div>
      );
}

export default Stripe;