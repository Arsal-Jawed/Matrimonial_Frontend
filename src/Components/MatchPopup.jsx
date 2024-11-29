import React, { useState, useEffect } from 'react';
import { FaHeart, FaRing, FaGlassCheers, FaCalendarAlt, FaCrown, FaStar } from 'react-icons/fa';
import CONFIG from '../Configuration';

function MatchPopup({ onClose, data }) {
    
    const StoredData = localStorage.getItem("user");
    const user = JSON.parse(StoredData);

    const IP = CONFIG.IP || 'localhost';
    const PORT = CONFIG.PORT;

    const [targetGender, setTargetGender] = useState(user.gender === 'female' ? 'male' : 'female');
    const [matchAns, setMatchAns] = useState('');
    const [loading, setLoading] = useState(true);

    const SendPrompt = async () => {
        
        const checkMatcher = {
            matcher: user.email,
            matched: data.email
        };
        
        try {
            const check = await fetch(`http://${IP}:${PORT}/likes/checkMatch`, {
                method: 'POST',
                body: JSON.stringify(checkMatcher),
                headers: {
                    'Content-Type':'application/json'
                }
            });

            if (check.ok) {
                const Answer = await check.json();
                setMatchAns(Answer[0]?.suggestion || "No previous suggestion found");
                setLoading(false);
            } else {
                const response = await fetch(`http://${IP}:${PORT}/likes/loveGuru`, {
                    method: 'POST',
                    body: JSON.stringify({
                        prompt: `Profile-01: a ${user.gender} whose religion is ${user.profile.religion}, occupation is ${user.profile.occupation}, and description is ${user.profile.description}, Profile-02: a ${targetGender} whose religion is ${data.religion}, occupation is ${data.occupation}, and description is ${data.description}. Compare these profiles and write 5 lines to tell how much they are similar to each other and if they can be a good couple. Please highlight both positive and negative aspects, try to be as concise as you can.`
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                const Answer = await response.json();
                setMatchAns(Answer.answer);
                setLoading(false);

                const match = {
                    matcher: user.email,
                    matched: data.email,
                    suggestion: Answer.answer,
                    review: 'N'
                };

                await fetch(`http://${IP}:${PORT}/likes/saveMatch`, {
                    method: 'POST',
                    body: JSON.stringify(match),
                    headers: {
                        'Content-Type':'application/json'
                    }
                });
            }
        } catch (error) {
            console.error("Error fetching suggestion:", error);
            setLoading(false);
            setMatchAns("Failed to load suggestion");
        }
    };

    useEffect(() => {
        if (!matchAns) {
            SendPrompt();
        }
    }, [matchAns, data, user]);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="relative bg-gradient-to-r from-white to-pink-400 p-8 rounded-3xl shadow-2xl w-[50vw] h-[50vh] border border-pink-200">
                <div className="absolute top-0 right-0 p-2 cursor-pointer text-gray-500 text-2xl" onClick={onClose}>
                    ✕
                </div>

                <div className="flex justify-center items-center mb-4">
                    <FaCrown className="text-yellow-500 text-[2vw] mr-2" />
                    <h2 className="text-[1.5vw] font-bold text-clr2">LoveGuru Suggestion</h2>
                    <FaStar className="text-yellow-500 text-[1.5vw] ml-2" />
                </div>

                <div className="flex justify-between items-center h-full relative">
                    <div className="relative flex flex-col items-center">
                        <img
                            src={user.profile.profile_image}
                            alt="User 1"
                            className="rounded-full w-[10vw] h-[10vw] object-cover"
                        />
                        <p className="text-clr2 text-[1.4vw] font-serif font-bold mt-2">{user.username}</p>
                    </div>
                    <div className="flex flex-col items-center relative">
                        <div className="bg-pink-100 rounded-tr-2xl rounded-bl-2xl h-[24vh] w-[22vw] overflow-auto no-scrollbar">
                            <p className='text-[1.1vw] text-clr2 p-[0.4vh] italic'>
                                {loading ? "LoveGuru is Writing suggestion ..." : matchAns}
                            </p>
                        </div>
                        <div className="flex space-x-4 mt-4 text-gray-600">
                            <FaRing className="text-yellow-500 text-[2vw] relative" />
                            <FaGlassCheers className="text-blue-500 text-[2vw] relative" />
                            <FaCalendarAlt className="text-green-500 text-[2vw] relative" />
                        </div>
                    </div>
                    <div className="relative flex flex-col items-center">
                        <img
                            src={data.profile_image}
                            alt="User 2"
                            className="rounded-full w-[10vw] h-[10vw] object-cover"
                        />
                        <p className="text-clr2 text-[1.4vw] font-serif font-bold mt-2">{data.username}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MatchPopup;
