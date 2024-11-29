import { Titlebar, LocationCard, LocationForm } from '../Components';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AiOutlineHeart } from 'react-icons/ai';
import { BsChatSquareHeart } from 'react-icons/bs';
import '../Styles/CustomBar.css';
import CONFIG from '../Configuration';

function Location() {
  const location = useLocation();
  const { targetInfo } = location.state;

  const [target, setTarget] = useState([]);
  const [locationsData, setLocationsData] = useState([]);
  const [aiResponse, setAiResponse] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const storedData = localStorage.getItem("user");
  const user = JSON.parse(storedData);

  const IP = CONFIG.IP || 'localhost';
  const PORT = CONFIG.PORT;

  const fetchLocation = async () => {
    try {
      const response = await fetch(`http://${IP}:${PORT}/locations/getLocations`);
      const locationResult = await response.json();
      const filteredLocations = locationResult.filter(
        (loc) => loc.city === targetInfo.city && (loc.provider === 'admin' || loc.provider === user.email)
      );
      setLocationsData(filteredLocations);
    } catch (error) {
      console.error("Error fetching location data:", error);
    }
  };

  const BrainStorm = async (email) => {
    try {
      if (!email) {
        throw new Error('Email is required to fetch user data.');
      }
      console.log("Email:"+email);
      const response = await fetch(`http://${IP}:${PORT}/users/getProfileByEmail?email=${email}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch target user: ${response.statusText}`);
      }
      const data = await response.json();
      setTarget(data);
      console.log("Target User:", target);
    } catch (error) {
      console.error("Error fetching target user data:", error);
    }
    const prompt = `I have to date someone with his/her family for discussing our marriage, his/her information: occupation: ${target.profile.occupation}, self-description: ${target.profile.description}, suggest me a place for this type of person, describe the place in 1 vague sentence only in the form of a quote.`;

    const response = await fetch(`http://${IP}:${PORT}/locations/guruLocation?prompt=${prompt}`);
    const Answer = await response.json();
    console.log(Answer);
    setAiResponse(Answer.answer);
    setShowPopup(true);
  };

  useEffect(() => {
    fetchLocation();
  }, []);

  return (
    <div className="flex flex-col justify-center bg-white min-h-screen">
      <Titlebar />

      <div className="relative flex flex-col items-center p-6">
        <div className="flex flex-col items-center w-full mb-8">
          <h1 className="text-4xl font-extrabold text-clr2 mb-4 text-center">
            Discover Perfect Locations for Your Love Story ❤️
          </h1>
          <p className="text-lg text-clr3 text-center max-w-3xl">
            Explore dreamy locations to meet your loved one. Add personalized locations, brainstorm with AI, and make every moment magical.
          </p>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-6 w-full">
        <div className="bg-white shadow-2xl rounded-lg w-[36vw] p-8 h-[92vh] flex flex-col items-center justify-center gap-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-pink-200 to-transparent opacity-40 rounded-t-lg pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-full h-1/3 bg-gradient-to-t from-purple-200 to-transparent opacity-40 rounded-b-lg pointer-events-none"></div>
            <div className="flex flex-col items-center gap-4">
                <div className="flex items-center justify-center bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full p-6 shadow-xl transform hover:scale-110 transition-transform">
                <AiOutlineHeart className="text-6xl animate-pulse" />
                </div>
                <h2 className="text-3xl font-extrabold text-gray-800 mt-4">Brainstorm with AI</h2>
                <p className="text-clr3 text-center px-4 leading-relaxed">
                Unlock AI-powered suggestions tailored to your partner's preferences. Make every moment magical!
                </p>
            </div>
            <button
                onClick={() => BrainStorm(targetInfo.targetEmail)}
                className="flex items-center gap-2 bg-pink-600 text-white px-8 py-4 rounded-lg shadow-lg hover:bg-pink-700 hover:shadow-2xl transition-all transform hover:scale-105"
            >
                <BsChatSquareHeart className="text-xl" />
                Get Suggestions
            </button>
            <div className="text-center text-sm text-gray-500 py-2">
                Powered by LoveGuru AI ❤️
            </div>
            </div>

  <div className="w-[40vw] p-8">
    <LocationForm cityName={targetInfo.city} />
  </div>
   </div>
        </div>
        <div className="mt-12 w-full">
          <h2 className="text-3xl font-bold text-clr1 text-center mb-6">Available Locations</h2>
          <div className="flex flex-wrap justify-center gap-6">
            {locationsData.map((loc) => (
              <LocationCard
                key={loc.location_id}
                title={loc.title}
                image={loc.location_image}
                address={loc.address}
                email={targetInfo.targetEmail}
                placeCity={loc.city}
              />
            ))}
          </div>
        </div>
      {showPopup && (
  <div className="fixed inset-0 bg-black bg-opacity-80 z-10 flex items-center justify-center">
    <div className="bg-white p-10 rounded-2xl w-[40vw] shadow-2xl relative text-center transform scale-100 hover:scale-105 transition-transform duration-300">
      <AiOutlineHeart className="absolute top-5 left-5 text-5xl text-red-600 animate-pulse" />
      <BsChatSquareHeart
        className="absolute top-5 right-5 text-4xl text-gray-500 cursor-pointer hover:text-pink-600 transition-colors"
        onClick={() => setShowPopup(false)}
      />
      <h2 className="text-3xl font-extrabold text-pink-600 mb-6">💌 LoveGuru Suggestion</h2>
      <p className="text-gray-800 text-lg italic leading-relaxed mb-8">
        {aiResponse}
      </p>
      <button
        onClick={() => setShowPopup(false)}
        className="px-8 py-3 bg-pink-600 text-white text-lg rounded-full shadow-lg hover:bg-pink-700 transition-all transform hover:scale-105 focus:outline-none"
      >
        OK Guru
      </button>
    </div>
  </div>
)}

    </div>
  );
}

export default Location;
