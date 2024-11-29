import React, { useState, useEffect } from "react";
import { FaHeart, FaStar, FaSmile, FaBolt } from "react-icons/fa";
import CONFIG from '../Configuration';

function LoyaltyForm() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const IP = CONFIG.IP || 'localhost';
  const PORT = CONFIG.PORT;

  const StoredData = localStorage.getItem("user");
  const user = JSON.parse(StoredData);

  const activateShantu = async () => {
    if (!selectedUser) {
      console.error("No user selected");
      return;
    }
  
    try {
      const response = await fetch(`http://${IP}:${PORT}/loveGuru/checkLoyalty`, {
        method: "POST",
        body: JSON.stringify({
          person: selectedUser.email,
          verifier: user.email,
        }),
        headers: { "Content-Type": "application/json" },
      });
  
      if (response.ok) {
        const result = await response.json();
        console.log("Loyalty check successful:", result);
  
        const { interest, cc, lc, mc, pc, nc } = result.data;
  
        let g = user.gender === "male" ? "She" : "He";
        let gr = user.gender === "male" ? "her" : "him";
        let message = "";
  
        if (interest === 0) {
          message = `${g} doesn't even know you. Best of luck if you like ${gr}!`;
        } else {
          message = `${g} is interested in you, but here's what I found:\n`;
  
          if (cc > 0) {
            message += `- ${cc} chats with others.\n`;
          }
  
          if (lc > 0) {
            message += `- ${lc} likes sent to others.\n`;
          }
  
          if (mc > 0) {
            message += `- ${mc} profile matches with others.\n`;
          }
  
          if (pc > 0) {
            message += `- ${pc} proposals sent to others.\n`;
          }
  
          if (nc > 0) {
            message += `- ${nc} NSFW interactions detected.\n`;
          }

          let loyaltyPercentage = 100;

          
          loyaltyPercentage -= cc * 1;
          loyaltyPercentage -= mc * 1;
          loyaltyPercentage -= lc * 1;
          loyaltyPercentage -= pc * 5;
          loyaltyPercentage -= nc * 3;
          loyaltyPercentage = Math.max(0, loyaltyPercentage);
  
          if (interest >= 10000) {
            message += `\nIt seems ${g.toLowerCase()} might be deeply connected with you despite these findings.`;
            message += `\nMaybe ${g.toLowerCase()} is planning something special for you! ❤️`;
          } else if (interest >= 1000) {
            message += `\nWow! ${g} matched profiles with you. ${g} might find you really interesting. 💌`;
            if (cc > 0) {
              message += `\nLooks like ${g.toLowerCase()} loves talking to you. 📞`;
            }
          } else if (interest >= 100) {
            message += `\nGreat news! ${g} liked your profile. ${g} seems to admire you. 🌟`;
            if (lc > 0) {
              message += `\nBut ${g.toLowerCase()} likes others too... Stay cautious! 🤔`;
            }
          } else if (interest >= 10) {
            if (cc > 0 && lc === 0) {
              message += `\nGood start! ${g} chatted with you. ${g} seems to enjoy conversations with you. 🗨️`;
            }
          } else {
            message += `\nProceed with caution! It seems ${g.toLowerCase()} hasn't shown significant interest yet.`;
          }
          
          message += `\n\n${g} is ${loyaltyPercentage}% loyal to you. 💖`
          
        }
  
        setPopupMessage(message);
        console.log("Popup Message:", message);
        setShowPopup(true);
      } else {
        console.error("Failed to check loyalty. Status:", response.status);
        const errorDetails = await response.text();
        console.error("Error details:", errorDetails);
      }
    } catch (error) {
      console.error("Error occurred while checking loyalty:", error);
    }
  };
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(user.gender);
        const response = await fetch(
          `http://${IP}:${PORT}/loveGuru/getUsers?gender=${user.gender}`
        );
        if (response.ok) {
          const result = await response.json();
          setUsers(result);
          
        }else{
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="w-[18vw] h-auto max-h-[46vh] mr-[2vw] max-w-md mt-[3vw] mb-[2vw] ml-[3vw] p-6 rounded-3xl bg-white bg-opacity-10 z-50 shadow-lg border border-lightGray">
      <h1 className="text-2xl font-bold text-center text-clr1 mb-6 drop-shadow-lg">
        Loyalty Check
      </h1>

      <div className="mb-6">
        <label
          htmlFor="userSelect"
          className="block text-[lightGray] text-[1vw] font-semibold mb-2"
        >
          Select User:
        </label>
        <select
          id="userSelect"
          value={selectedUser?.username || ""}
          onChange={(e) => {
            const user = users.find((u) => u.username === e.target.value);
            if (user) {
              console.log("Selected User:", user);
              setSelectedUser(user);
            }
          }}
          className="w-full px-3 py-1 text-[1vw] bg-white bg-opacity-60 border border-[lightGray] rounded-lg shadow-md text-[Gray] focus:outline-none focus:ring-4 focus:ring-clr2"
        >
          <option value="">
            -- Choose a User --
          </option>
          {users.map((user) => (
            <option key={user.id} value={user.username}>
              {user.username}
            </option>
          ))}
        </select>
      </div>


      {selectedUser && (
        <div className="flex items-center mb-6">
          <img
            src={selectedUser.profile_image}
            alt="User Avatar"
            className="w-14 h-14 rounded-full mr-4 border border-[lightGray] transition-transform duration-300 hover:scale-150"
          />
          <p className="text-clr1 font-semibold text-[1vw]">{selectedUser.username}</p>
        </div>
      )}

      <div className="text-center">
        <button
          onClick={activateShantu}
          className="px-5 py-2 bg-gradient-to-r from-clr1 to-clr2 text-white text-[1vw] font-semibold rounded-[2vw] shadow-lg hover:shadow-[0_4px_15px_rgba(106,90,205,0.5)] transition transform hover:scale-105"
        >
          Activate Shantu
        </button>
      </div>

{showPopup && (
  <div className="fixed top-0 left-0 h-full w-full inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
    <div className="relative bg-gradient-to-r from-red-800 via-red-600 to-pink-500 p-8 rounded-xl shadow-2xl text-center max-w-lg mx-auto animate-fadeIn">
      <FaHeart className="absolute top-[-14%] left-[-12%] text-white text-[8rem] rotate-[30deg] opacity-40" />
      <FaStar className="absolute bottom-[-15%] right-[5%] text-white text-[4rem] rotate-[45deg] opacity-50" />
      <FaSmile className="absolute top-[10%] right-[-10%] text-white text-[5rem] rotate-[-25deg] opacity-30" />
      <FaBolt className="absolute bottom-[-10%] left-[10%] text-white text-[6rem] rotate-[60deg] opacity-20" />

      <p className="text-2xl font-bold text-white mb-6 drop-shadow-lg">
        {popupMessage}
      </p>
      <button
        onClick={() => setShowPopup(false)}
        className="px-6 py-3 bg-white text-red-700 font-bold rounded-full shadow-md hover:bg-red-700 hover:text-white transition-transform transform hover:scale-105"
      >
        Close
      </button>
    </div>
  </div>
)}

    </div>
  );
}

export default LoyaltyForm;
