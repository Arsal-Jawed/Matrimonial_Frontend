import { motion } from 'framer-motion';
import { FaComments, FaUserCheck, FaHandHoldingHeart, FaRing, FaRobot, FaShieldAlt, FaExclamationTriangle,FaMapMarkerAlt, FaHeart } from "react-icons/fa";

function Procedure() {

    const procedures = [
        { heading: "Online Chatting", pic: "/Assets/chatting.jpg", icon: FaComments },
        { heading: "Profile Matching", pic: "/Assets/match.png", icon: FaUserCheck },
        { heading: "Physical Meeting", pic: "/Assets/meeting.png", icon: FaHandHoldingHeart },
        { heading: "Online Proposal", pic: "/Assets/ring1.jpg", icon: FaRing },
        { heading: "Loyalty Check", pic: "/Assets/loyalty.jpg", icon: FaHeart },
        { heading: "AI Meet Suggestion", pic: "/Assets/place.jpg", icon: FaMapMarkerAlt  },
        { heading: "Personal Data Security", pic: "/Assets/security.png", icon: FaShieldAlt },
        { heading: "AI Love Guru", pic: "/Assets/suggestion.png", icon: FaRobot },
        { heading: "NSFW Detector", pic: "/Assets/nsfw.jpg", icon: FaExclamationTriangle },
    ];

    return (
        <div className="flex flex-col items-center p-[10vh] mt-[8vh] md:mt-[26vh] w-[98.5vw]"
            style={{
                backgroundImage: 'url(/Assets/silver1.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}>
            <motion.p 
                className="text-[6vw] md:text-[2.4vw] text-center font-bold text-clr2 mb-[12vh]"
                initial={{ opacity: 0, y: -20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.5 }}
            >
                Exciting Features of <span className="text-clr1">Matrimonial</span>
            </motion.p>
            <div className="flex flex-col md:flex-row md:flex-wrap justify-center gap-[4vh]">
                {procedures.map((procedure, index) => (
                    <motion.div 
                        key={index} 
                        className="relative bg-white shadow-lg rounded-lg overflow-hidden w-[74vw] md:w-[20vw] m-[2vw]"
                        initial={{ opacity: 0, scale: 0.9 }} 
                        animate={{ opacity: 1, scale: 1 }} 
                        transition={{ duration: 0.3, delay: index * 0.1 }} 
                        whileHover={{ scale: 1.05 }}
                    >
                        <img src={procedure.pic} alt={procedure.heading} className="w-full h-[20vh] md:h-[30vh] object-cover" />
                        <div className="absolute top-[12vh] md:top-[22vh] shadow-xl left-1/2 transform -translate-x-1/2 bg-white rounded-full p-[1vh] md:p-[2vh]">
                            <procedure.icon className="text-[18vw] md:text-[4vw] text-clr2" />
                        </div>
                        <div className="p-[2vh] pt-[6vh]">
                            <p className="text-[5vw] md:text-[1.5vw] font-semibold text-clr1 text-center">{procedure.heading}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

export default Procedure;
