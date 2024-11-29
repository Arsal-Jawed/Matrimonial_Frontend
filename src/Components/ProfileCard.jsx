import React, { useState, useEffect } from 'react';
import { FaHeart, FaThumbsUp, FaComment, FaHandshake, FaRing, FaStar } from 'react-icons/fa';
import MatchPopup from './MatchPopup';
import { useNavigate } from 'react-router-dom';
import ProfileImage from './ProfileImage';
import CONFIG from '../Configuration';

function ProfileCard(props) {
    const [like, setLiked] = useState('Like');
    const [showMatchPopup, setShowMatchPopup] = useState(false);
    const [showProposePopup, setShowProposePopup] = useState(false);
    const [proposalMessage, setProposalMessage] = useState('');
    const [suggestionPopup, setSuggestionPopup] = useState(false);

    const StoredData = localStorage.getItem("user");
    const user = JSON.parse(StoredData);

    const IP = CONFIG.IP || 'localhost';
    const PORT = CONFIG.PORT;

    const navigate = useNavigate();

    const Chat = async () => {
        let data;
        const StoredData = localStorage.getItem("user");
        const user = JSON.parse(StoredData);

        const mail2 = props.email;
        const mail1 = user.email;
        const Check = {
            mail1,
            mail2
        }


        const response = await fetch(`http://${IP}:${PORT}/rooms/chatRoom`, {
            method: 'POST',
            body: JSON.stringify(Check),
            headers: { 'Content-Type': 'application/json' }
        });

        data = await response.json();

        const profile = {
            username: props.username,
            email: props.email,
            profession: props.occupation,
            city: props.city,
            country: props.country,
            photo: props.profile_image,
            room: data
        }
        console.log("Chat Function Called");

        const chatH = {chat1:mail1, chat2:mail2}
        const saveResponse = await fetch(`http://${IP}:${PORT}/rooms/saveChatHistory`,{
            method: 'POST',
            body: JSON.stringify(chatH),
            headers:{
                'Content-Type':'application/json'
            }
        });
        navigate('/chat', { state: { profile } });
    }

    const Propose = async () => {
        const Proposal = {
            proposal: user.email,
            proposed: props.email,
            state: 'N'
        }

        const response = await fetch(`http://${IP}:${PORT}/proposals/saveProposal`, {
            method: 'POST',
            body: JSON.stringify(Proposal),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const MailData = {
                to: props.email,
                username: user.username,
                proposedName: props.username,
                country: user.profile.country,
                city: user.profile.city,
                religion: user.profile.religion,
                occupation: user.profile.occupation,
                message: proposalMessage
            }

            const MailResponse = await fetch(`http://${IP}:${PORT}/proposals/sendMail`, {
                method: 'POST',
                body: JSON.stringify(MailData),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (MailResponse.ok) {
                console.log("Mail sent successfully");
            } else {
                console.log("Failed to Send Mail");
            }
        } else {
            console.log("Failed to Save Proposal");
        }
    }

    useEffect(() => {
        const checkLikeStatus = async () => {
            try {
                const response = await fetch(`http://${IP}:${PORT}/likes/checkLikeStatus`, {
                    method: 'POST',
                    body: JSON.stringify({ saver: user.email, saved: props.email }),
                    headers: { 'Content-Type': 'application/json' },
                });
    
                if (response.ok) {
                    const data = await response.json();
                    console.log("Like Status Response:", data);
                    setLiked(data.liked ? 'Liked' : 'Like');
                } else {
                    console.error("Failed to fetch like status.");
                }
            } catch (error) {
                console.error("Error checking like status:", error);
            }
        };
    
        checkLikeStatus();
    }, [user.email, props.email, setLiked]);

    const handleMatchClick = () => {
        setShowMatchPopup(true);
    };

    const handleClosePopup = () => {
        
        setShowMatchPopup(false);
        setSuggestionPopup(true);
    };

    const handleProposeClick = () => {
        setShowProposePopup(true);
    };

    const handleCancelPropose = () => {
        setShowProposePopup(false);
        setProposalMessage('');
    };

    const handleSuggestionClick = async(r) => {
        
        const uptMatch = {
            matcher: user.email,
            matched: props.email,
            review: r
        }
        const response = await fetch(`http://${IP}:${PORT}/likes/updateMatch`,{
            method: 'POST',
            body: JSON.stringify(uptMatch),
            headers:{
                'Content-Type':'application/json'
            }
        });

        if(response.ok)
        setSuggestionPopup(false);
        console.log("Error in Feedback");
    }

    

    const LikeProfile = async () => {
        if (like === 'Unlike') {
            alert('Already liked');
            return;
        }

        const Like = {
            saver: user.email,
            saved: props.email
        };

        const response = await fetch(`http://${IP}:5000/likes/likeProfile`, {
            method: 'POST',
            body: JSON.stringify(Like),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            setLiked('Unlike');
        } else {
            console.log('Failed to Like');
        }
    };

    return (
        <div className="flex flex-row p-[2vh] border border-gray-300 ml-[2vw] my-[2vh] w-[54vw]">
            <div className="flex flex-col">
            <ProfileImage profile_image={props.profile_image} email={props.email}/>
                <div className="flex flex-col">
                    <p className="text-gray-600 text-[0.8vw] m-[0.1vw]">Marital Status: {props.maritalStatus}</p>
                    <p className="text-gray-600 text-[0.8vw] m-[0.1vw]">Build: {props.build}</p>
                    <p className="text-gray-600 text-[0.8vw] m-[0.1vw]">Children: {props.children}</p>
                    <p className="text-gray-600 text-[0.8vw] m-[0.1vw]">Smoking: {props.smoking}</p>
                    <p className="text-gray-600 text-[0.8vw] m-[0.1vw]">Drinking: {props.drinking}</p>
                </div>
            </div>

            <div className="flex flex-col ml-[2vw]">
                <div className="flex flex-row w-[28vw]">
                    <div className="flex flex-col">
                    <div className='flex flex-row gap-[1vw] items-center'>
                        <p className="text-clr1 text-[1.4vw] font-bold m-[0.1vw]">{props.username}</p>
                        <div className={`w-[0.8vw] h-[0.8vw] rounded-full ${props.state === 'online' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    </div>
                        <p className="text-gray-600 text-[1vw] m-[0.1vw]">{props.city} / {props.country}</p>
                        <p className="text-gray-600 text-[1vw] m-[0.1vw]">{props.occupation}</p>
                        <p className="text-gray-600 text-[1vw] m-[0.1vw]">{props.religion}</p>
                        <p className="text-gray-600 text-[1vw] m-[0.1vw]">{props.education}</p>
                    </div>
                </div>
                <p className="text-gray-600 text-[0.8vw] m-[0.1vw] w-[29vw]">{props.description}</p>
            </div>
            <div className="flex flex-col ml-[1vw]">
            <button
                onClick={handleMatchClick}
                className="flex flex-row items-center justify-center text-white bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 hover:from-purple-600 hover:to-red-500 rounded-[0.4vw] py-[0.8vh] px-[2.5vw] mb-[1vh] shadow-[0_0_15px_rgba(255,0,255,0.8)] transform hover:scale-105 transition-all duration-300"
                >
                <FaHeart className="mr-2 text-[1.5vw] animate-pulse" /> 
                <span className="text-[1vw] flex text-nowrap font-bold tracking-wider">AI Match</span>
                </button>
                {showMatchPopup && <MatchPopup onClose={handleClosePopup} data={props} />}
                <button onClick={LikeProfile}
                    className="flex items-center text-[1vw] text-white bg-clr1 hover:bg-red-700 rounded-[0.4vw] py-[0.8vh] px-[2vw] mb-[1vh]">
                    <FaThumbsUp className="mr-2" /> {like}
                </button>
                <button onClick={Chat}
                    className="flex items-center text-[1vw] text-white bg-green-600 hover:bg-green-800 rounded-[0.4vw] py-[0.8vh] px-[2vw] mb-[1vh]">
                    <FaComment className="mr-2" /> Chat
                </button>
                <button onClick={handleProposeClick}
                    className="flex items-center text-[1vw] text-white bg-clr4 hover:bg-blue-600 rounded-[0.4vw] py-[0.8vh] px-[2vw] mb-[1vh]">
                    <FaHandshake className="mr-2" /> Propose
                </button>
            </div>

            {showProposePopup && (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="relative bg-gradient-to-r from-clr3 to-pink-200 w-[34vw] p-5 rounded-lg shadow-lg">
            <FaHeart
                className="absolute bottom-[-0.2vw] left-[-0.4vw] text-[#FFD700] text-[8vw]"
                style={{ transform: 'rotate(30deg)' }}
                />

            <div className="absolute top-[1vw] right-[1vw] flex flex-col items-center space-y-1">
                <FaStar className="text-[#FFD700] opacity-80 text-[4vw]" />
                <FaStar className="text-[#FFD700] opacity-80 text-[3vw]" />
                <FaStar className="text-[#FFD700] opacity-80 text-[2vw]" />
            </div>

            <textarea
                className="w-full h-40 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-200 shadow-sm text-clr2 italic"
                placeholder="Enter your message..."
                value={proposalMessage}
                onChange={(e) => setProposalMessage(e.target.value)}
            ></textarea>

            <div className="flex justify-end mt-3">
            <button
                className="bg-clr1 text-white px-4 py-2 rounded shadow-md hover:bg-clr2 transition-transform transform hover:scale-105 flex items-center space-x-2"
                onClick={() => {
                    Propose();
                    setShowProposePopup(false);
                }}
            >
                <FaRing className="text-xl text-[#FFD700]" />
                <span className="text-lg">Propose</span>
                <FaHeart className="text-xl text-clr3" />
            </button>

                <button
                    className="bg-gray-500 text-white px-4 py-2 rounded shadow-md hover:bg-gray-600 transition-transform transform hover:scale-105 ml-2"
                    onClick={handleCancelPropose}
                >
                    Cancel
                </button>
            </div>
        </div>
    </div>
)}

{suggestionPopup && (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-pink-300 flex flex-row justify-center items-center rounded-lg p-6 shadow-lg w-1/3">
            <h2 className="text-[1.1vw] font-semibold mr-[3vw] text-clr2 mb-4">Was Suggestion Helpful ?</h2>
                <button
                    className="bg-green-500 text-white mx-2 text-[1vw] py-1 px-3 rounded hover:bg-green-600 transition"
                    onClick={() => handleSuggestionClick('Y')}
                >
                    Yes
                </button>
                <button
                    className="bg-red-500 text-white text-[1vw] py-1 px-4 rounded hover:bg-red-600 transition"
                    onClick={() => handleSuggestionClick('N')}
                >
                    No
                </button>
        </div>
    </div>
)}


        </div>
    );
}

export default ProfileCard;