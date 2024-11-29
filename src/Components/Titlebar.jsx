import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart,FaSignOutAlt } from "react-icons/fa";
import CONFIG from '../Configuration';

function Titlebar() {
    const [showMenu, setShowMenu] = useState(false);

    const StoredData = localStorage.getItem("user");
    const user = JSON.parse(StoredData);

    const navigate = useNavigate();
    const IP = CONFIG.IP || 'localhost';
    const PORT = CONFIG.PORT;

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const Logout = async() => {

        localStorage.removeItem("user");
        await fetch(`http://${IP}:${PORT}/users/offline`,{
            method: 'POST',
            body: JSON.stringify({email:user.email}),
            headers:{'Content-Type':'application/json'}
          });
        navigate('/');
    }

    return (
        <div className="bg-clr1 z-50 w-[100vw] p-[1vh] px-[2.2vh] flex flex-row justify-between items-center">
            <p className="text-[2vw] font-bold italic text-white">Matrimonial</p>
            <div className="flex gap-[2vw] text-white text-[0.9vw]">
                <button onClick={() => navigate('/updateProfile')} className="hover:underline">Update Profile</button>
                <button onClick={() => navigate('/loveGuru')} className="hover:underline">Love Guru</button>
                <button onClick={() => navigate('/loveGuru')} className="hover:underline">Loyalty Check</button>
                <button onClick={() => navigate('/history')} className="hover:underline">Chat History</button>
                <button onClick={() => navigate('/history')} className="hover:underline">Proposal History</button>
                <button onClick={() => navigate('/images')} className="hover:underline">My Images</button>
            </div>
            
            <div className="flex flex-row gap-[1vw] items-center relative">
                <img 
                    src={user.profile.profile_image} 
                    alt="user pic" 
                    onClick={toggleMenu}
                    className="w-[4vw] h-[4vw] rounded-full cursor-pointer transition-transform duration-300 hover:scale-110"
                />
                
                <div className="flex flex-col">
                    <p className="text-white text-[1.2vw] font-semibold">{user.username}</p>
                    <p className="text-white text-[1vw]">{user.email}</p>
                </div>
                {showMenu && (
    <div className="absolute z-50 flex flex-col items-start top-[6vh] right-[5vw] mt-[5vh] shadow-2xl rounded-2xl gap-4 p-4 w-[14vw] 
                    bg-gradient-to-br from-clr1 to-clr2 transition-transform transform hover:scale-105 duration-300 text-white">
        <button onClick={() => navigate('/updateProfile')}
            className="flex items-center gap-3 text-[1vw] font-semibold hover:bg-white hover:text-clr1 p-3 rounded-lg w-full transition-all duration-300 ease-in-out shadow-md">
            <i className="fas fa-user-edit text-lg"></i> Update Profile
        </button>
        <button onClick={() => navigate('/loveGuru')}
            className="flex items-center gap-3 text-[1vw] font-semibold hover:bg-white hover:text-clr1 p-3 rounded-lg w-full transition-all duration-300 ease-in-out shadow-md">
            <i className="fas fa-user-edit text-lg"></i> Love Guru <FaHeart className="text-[1.4vw]" />
        </button>
        <button onClick={() => navigate('/history')}
            className="flex items-center gap-3 text-[1vw] font-semibold hover:bg-white hover:text-clr1 p-3 rounded-lg w-full transition-all duration-300 ease-in-out shadow-md">
            <i className="fas fa-comments text-lg"></i> Chat History
        </button>
        <button onClick={() => navigate('/history')}
            className="flex items-center gap-3 text-[1vw] font-semibold hover:bg-white hover:text-clr1 p-3 rounded-lg w-full transition-all duration-300 ease-in-out shadow-md">
            <i className="fas fa-file-alt text-lg"></i> Proposal History
        </button>
        <button onClick={() => navigate('/images')}
            className="flex items-center gap-3 text-[1vw] font-semibold hover:bg-white hover:text-clr1 p-3 rounded-lg w-full transition-all duration-300 ease-in-out shadow-md">
            <i className="fas fa-image text-lg"></i> My Images
        </button>
        <button
            className="flex items-center gap-3 text-[1vw] font-semibold hover:bg-white hover:text-clr1 p-3 rounded-lg w-full transition-all duration-300 ease-in-out shadow-md"
            onClick={Logout}
        >
            <i className="fas fa-sign-out-alt text-lg"></i> Logout <FaSignOutAlt className="text-[1.4vw]" />
        </button>
    </div>
)}

            </div>
        </div>
    );
}

export default Titlebar;
