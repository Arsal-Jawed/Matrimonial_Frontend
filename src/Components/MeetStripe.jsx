import React, { useState } from 'react';
import { FaHeart, FaHandshake } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import CONFIG from '../Configuration';

function MeetStripe(props) {
    const { status, username, email } = props;
    const [showPopup, setShowPopup] = useState(false);

    const navigate = useNavigate();
    const IP = CONFIG.IP || 'localhost';
    const PORT = CONFIG.PORT;

    const StoredData = localStorage.getItem("user");
    const user = JSON.parse(StoredData);

    const Meet = () => {
        navigate("/city", { state: { email } });
    };

    const deleteProposal = async () => {
        const propose = {
            proposal: user.email,
            proposed: email,
        };
        const response = await fetch(`http://${IP}:${PORT}/proposals/deleteproposal`, {
            method: 'POST',
            body: JSON.stringify(propose),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            console.log("Proposal Deleted");
            setShowPopup(true);
        }
    };

    return (
        <>
            <div className="flex flex-row items-center m-[0.6vw] mb-[1vw] p-[1.2vh] shadow-lg justify-between bg-gradient-to-r from-gray-50 to-gray-200 rounded-[1vw] transition-all duration-300">
                <FaHeart className="text-clr1 text-[2.5vw]" />

                <p className="flex-1 text-center text-clr2 text-[1.2vw] font-semibold italic">
                    {username}
                </p>
                {status === "N" && (
                    <p className="text-yellow-500 text-[1vw] font-bold">Pending...</p>
                )}
                {status === "R" && (
                    <p className="text-red-600 text-[1vw] font-bold">Rejected</p>
                )}
                {status === "A" && (
                    <button
                        onClick={Meet}
                        className="flex items-center gap-[0.4vw] text-white text-[1vw] py-[0.8vh] px-[1.2vw] bg-green-600 hover:bg-green-700 rounded-full shadow-md transition-all duration-300 transform hover:scale-105"
                    >
                        <FaHandshake />
                        Meet
                    </button>
                )}

                {status === "B" && (
                    <div className="flex flex-row justify-center items-center gap-[0.8vw]">
                        <p className="text-red-600 text-[1vw] font-bold">Blocked</p>
                        <button
                            onClick={deleteProposal}
                            className="flex items-center gap-[0.4vw] text-white text-[1vw] py-[0.8vh] px-[1.2vw] bg-red-600 hover:bg-red-700 rounded-full shadow-md transition-all duration-300 transform hover:scale-105"
                        >
                            Delete
                        </button>
                    </div>
                )}
            </div>
            {showPopup && (
                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
                    <div className="relative bg-gradient-to-r from-blue-500 to-blue-300 p-6 rounded-lg shadow-lg text-center">
                        <p className="text-white text-2xl font-bold mb-4">Proposal Deleted</p>
                        <button
                            onClick={() => setShowPopup(false)}
                            className="mt-4 bg-white text-blue-500 font-semibold px-6 py-2 rounded-lg shadow-md hover:scale-105 transition-transform"
                        >
                            OK
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

export default MeetStripe;
