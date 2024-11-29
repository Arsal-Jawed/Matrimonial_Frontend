import { useState } from "react";
import CONFIG from '../Configuration';
import { AiOutlineDelete } from 'react-icons/ai';


function ImageCard(props) {
  
  const [isHovered, setIsHovered] = useState(false);

  const StoredData = localStorage.getItem("user");
  const user = JSON.parse(StoredData);

  const IP = CONFIG.IP || 'localhost';
  const PORT = CONFIG.PORT;

  const handleSetProfile = async () => {
    try {
      const email = user.email;
      const imageUrl = props.imageUrl; 

      const response = await fetch(`http://${IP}:${PORT}/images/updateProfileImage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, imageUrl }),
      });

      if (response.ok) {
        alert("Profile Image Updated Successfully");
      } else {
        alert("Error Updating Profile Image");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDeleteImage = async () => {
    try {
      const email = user.email;
      const imageUrl = props.imageUrl;

      const response = await fetch(`http://${IP}:${PORT}/images/deleteImage`, {
        method: "POST",
        body: JSON.stringify({ email,imageUrl }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        alert("Image Deleted Successfully");
      } else {
        alert("Error Deleting Image");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div
      className="relative w-[14vw] h-[34vh] rounded-lg overflow-hidden shadow-lg cursor-pointer m-[1vw]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={props.imageUrl}
        alt="Profile Background"
        className="w-full h-full object-cover"
      />
      <div
        className={`absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex flex-col justify-center items-center gap-4">
          <button
            onClick={handleSetProfile}
            className="px-2 py-2 text-[0.8vw] w-[8vw] bg-clr1 text-white rounded-lg hover:bg-clr2 transition duration-300"
          >
            Set as Profile
          </button>
          <button
          onClick={handleDeleteImage}
          className="px-2 py-2 text-[0.8vw] w-[8vw] bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300 flex items-center justify-center gap-2"
        >
          <AiOutlineDelete className="text-white text-[1.6vw]" />
          Delete
        </button>
        </div>
      </div>
    </div>
  );
}

export default ImageCard;
