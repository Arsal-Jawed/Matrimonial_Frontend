import React, { useState } from "react";
import CONFIG from '../Configuration';

function LocationForm({ cityName }) {
  const [locationName, setLocationName] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  
  const StoredData = localStorage.getItem("user");
  const user = JSON.parse(StoredData);

  const IP = CONFIG.IP || 'localhost';
  const PORT = CONFIG.PORT;

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!locationName || !address || !image) {
      setError("All fields are required, including the picture.");
      return;
    }

    const formData = new FormData();
    formData.append('title', locationName);
    formData.append('provider', user.email);
    formData.append('address', address);
    formData.append('city', cityName);
    formData.append('image', image);

    const response = await fetch(`http://${IP}:${PORT}/locations/saveLocation`, {
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      setIsPopupVisible(true);
      setLocationName("");
      setAddress("");
      setImage(null);
    } else {
      setError("Failed to Add Location");
    }

    setError("");
  };

  return (
    <div className="flex justify-center items-center shadow-2xl rounded-xl py-[5vh] bg-gradient-to-br from-clr2 via-clr1 to-clr2">
      <form
        onSubmit={handleSubmit}
        className="w-[40vw] p-8 flex flex-col gap-6"
      >
        <h2 className="text-3xl font-extrabold text-white text-center">Add Location</h2>

        <div className="flex flex-col gap-2">
          <label className="text-white font-medium text-lg">Location Name</label>
          <input
            type="text"
            value={locationName}
            onChange={(e) => setLocationName(e.target.value)}
            placeholder="Enter location name"
            className="p-4 bg-white bg-opacity-20 text-white placeholder-gray-300 rounded-lg shadow-md focus:ring-4 focus:ring-pink-500 outline-none"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-white font-medium text-lg">Address or Map URL</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter address"
            className="p-4 bg-white bg-opacity-20 text-white placeholder-gray-300 rounded-lg shadow-md focus:ring-4 focus:ring-pink-500 outline-none"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-white font-medium text-lg">Picture</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-white file:text-clr2 hover:file:bg-purple-100"
          />
        </div>

        {error && <p className="text-red-500 text-lg">{error}</p>}

        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xl font-semibold rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
        >
          Submit
        </button>
      </form>

      {/* Success Popup */}
      {isPopupVisible && (
        <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white bg-opacity-90 p-8 rounded-xl shadow-2xl flex flex-col items-center">
            <p className="text-gray-800 font-bold text-2xl mb-4">Location added successfully!</p>
            <button
              onClick={() => setIsPopupVisible(false)}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-lg rounded-full shadow-md hover:scale-105 transition-transform duration-300"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default LocationForm;
