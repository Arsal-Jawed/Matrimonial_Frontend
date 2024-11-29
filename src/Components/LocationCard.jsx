import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaRing, FaStar, FaKissWinkHeart, FaCrown } from "react-icons/fa";
import CONFIG from "../Configuration";

function LocationCard(props) {
  const { title, image, email, address, placeCity } = props;
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const navigate = useNavigate();

  const storedData = localStorage.getItem("user");
  const user = JSON.parse(storedData);

  const IP = CONFIG.IP || "localhost";
  const PORT = CONFIG.PORT;

  const ProposeMeeting = async (email) => {
    console.log(email);
    const response = await fetch(
      `http://${IP}:${PORT}/users/getProfileByEmail?email=${email}`
    );
    const result = await response.json();

    const MailData = {
      to: email,
      username: user.username,
      proposedName: result.username,
      country: user.profile.country,
      city: user.profile.city,
      religion: user.profile.religion,
      occupation: user.profile.occupation,
      place: title,
      address: address,
      placeCity: placeCity,
    };

    const MailResponse = await fetch(`http://${IP}:${PORT}/proposals/sendMeeting`, {
      method: "POST",
      body: JSON.stringify(MailData),
      headers: { "Content-Type": "application/json" },
    });

    if (MailResponse.ok) {
      console.log("Meeting Proposal Sent");
      setIsPopupVisible(true);
    }
    console.log(result);
  };

  return (
    <div>
      <div className="relative w-[20vw] h-[26vh] rounded-lg overflow-hidden shadow-2xl group m-[0.8vw]">
        <img className="w-full h-full" src={image} alt="location pic"></img>
        <div className="absolute inset-0 bg-black opacity-30 group-hover:opacity-60 transition-opacity duration-300"></div>
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 backdrop-blur-sm text-white text-center py-4">
          <h3 className="text-[1vw] font-semibold">{title}</h3>
        </div>
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={() => ProposeMeeting(email)}
            className="bg-clr1 text-white py-1 px-3 rounded-full shadow-md font-semibold text-[1vw] hover:bg-white hover:text-clr1 transition-colors duration-300"
          >
            Propose Meeting
          </button>
        </div>
      </div>

      {isPopupVisible && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
          <div
            className="fixed inset-0 flex items-center justify-center z-50"
          >
            <div
              className="relative p-6 rounded-lg shadow-xl w-[40vw] h-[20vw] flex flex-col items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #FF0000, #800000)",
              }}
            >
              <FaHeart
                className="absolute text-[gold] text-[5vw]"
                style={{ top: "10%", left: "20%", transform: "rotate(-15deg)" }}
              />
              <FaRing
                className="absolute text-[gold] text-[3vw]"
                style={{ top: "55%", right: "8%" }}
              />
              <FaStar
                className="absolute text-[gold] text-[4vw]"
                style={{ bottom: "20%", left: "25%", transform: "rotate(30deg)" }}
              />
              <FaKissWinkHeart
                className="absolute text-[gold] text-[2.5vw]"
                style={{ bottom: "10%", right: "30%", transform: "rotate(-25deg)" }}
              />
              <FaCrown
                className="absolute text-[gold] text-[4vw]"
                style={{ top: "5%", right: "10%", transform: "rotate(15deg)" }}
              />
              <h2 className="text-3xl font-bold text-white mb-6 text-center">
                Meeting Proposal Sent! 💍
              </h2>
              <button
                onClick={() => navigate("/main")}
                className="bg-[gold] text-white py-2 px-8 rounded-full text-lg hover:bg-red-700 transition-colors duration-300"
              >
                OK
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default LocationCard;
