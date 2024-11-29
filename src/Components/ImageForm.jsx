import { useState } from "react";
import { AiOutlineUpload } from "react-icons/ai";
import CONFIG from '../Configuration';

function ImageForm() {
  const [image, setImage] = useState(null);
  const [imageFile, setFile] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const StoredData = localStorage.getItem("user");
  const user = JSON.parse(StoredData);

  const IP = CONFIG.IP || 'localhost';
  const PORT = CONFIG.PORT;

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setFile(file);
    }
  };
   
  const addImage = async(e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('email', user.email);
    formData.append('image', imageFile);

    const response = await fetch(`http://${IP}:${PORT}/images/addImage`, {
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      setShowPopup(true);
      handleCancel();
    }
  };

  const handleCancel = () => {
    setImage(null);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="flex flex-col shadow-lg rounded-[2vw] p-[4vh] m-[2vw] items-center bg-white z-10 w-[20vw] mt-[18vh]">
      <label className="w-full h-[200px] flex items-center justify-center border-2 border-dashed border-clr1 rounded-lg cursor-pointer">
        {image ? (
          <img src={image} alt="Uploaded" className="h-full w-full object-cover rounded-lg" />
        ) : (
          <AiOutlineUpload className="text-clr1 text-6xl" />
        )}
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageUpload}
        />
      </label>
      
      {image && (
        <div className="flex mt-4 space-x-4">
          <button onClick={addImage} className="px-4 py-2 bg-clr1 text-white rounded-lg hover:bg-clr2 transition duration-300">
            Add Image
          </button>
          <button onClick={handleCancel} className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition duration-300">
            Cancel
          </button>
        </div>
      )}

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <p className="text-lg text-green-600 font-semibold mb-4">Image Uploaded Successfully</p>
            <button
              onClick={closePopup}
              className="px-4 py-2 bg-clr1 text-white rounded-lg hover:bg-clr2 transition duration-300"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ImageForm;
