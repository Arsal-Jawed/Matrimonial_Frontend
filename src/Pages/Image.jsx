import { useState, useEffect } from 'react';
import { Titlebar, ImageForm, ImageCard } from '../Components';
import CONFIG from '../Configuration';
import { FaPlus, FaHeart, FaStar } from 'react-icons/fa';

function Image() {
  const [images, setImages] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const IP = CONFIG.IP || 'localhost';
  const PORT = CONFIG.PORT;

  useEffect(() => {
    const StoredData = localStorage.getItem("user");
    const user = JSON.parse(StoredData);
    const email = user?.email;

    const fetchImages = async () => {
      try {
        const response = await fetch(
          `http://${IP}:${PORT}/images/getImages?email=${email}`
        );
        if (response.ok) {
          const data = await response.json();
          setImages(data);
        } else {
          console.error("Error retrieving images");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchImages();
  }, []);

  return (
    <div className="relative flex flex-col h-screen">
      <Titlebar />
      {showForm && (
        <>
          <div
            className="absolute inset-0 bg-black bg-opacity-20 z-20 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setShowForm(false)}
          ></div>
          <div className="absolute inset-0 flex items-center justify-center z-30">
            <div className="relative bg-white rounded-lg shadow-xl p-6 animate-fadeIn">
              <ImageForm />
              <button
                className="absolute top-3 right-3 px-3 py-1 font-bold text-sm text-clr3 hover:text-red-500"
                onClick={() => setShowForm(false)}
              >
                X
              </button>
            </div>
          </div>
        </>
      )}

      <div className="flex flex-col items-center w-full mt-8 h-[90vh] p-6 relative">
      <div className="absolute top-10 left-10 text-[silver] opacity-80 animate-spin-slow transform scale-110 hover:scale-125 transition-all duration-300 ease-in-out">
      <FaStar size={80} className="text-yellow-500 hover:text-pink-500" />
    </div>
    <div className="absolute bottom-10 right-10 text-[silver] opacity-80 animate-spin-reverse transform scale-110 hover:scale-125 transition-all duration-300 ease-in-out">
      <FaStar size={70} className="text-yellow-500 hover:text-pink-500" />
    </div>
        <div className="flex flex-col w-full max-w-4xl bg-white shadow-xl rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between bg-gradient-to-r from-clr1 to-red-400 text-white p-6">
            <h2 className="text-lg font-bold tracking-wide uppercase">Your Images</h2>
            <button
              className="flex items-center gap-2 bg-clr2 hover:bg-red-900 px-4 py-2 rounded-full text-sm shadow-lg transform transition-transform hover:scale-105"
              onClick={() => setShowForm(true)}
            >
              <FaPlus /> Add New Image
            </button>
          </div>
          <div className="p-6 flex gap-4 overflow-x-auto custom-scrollbar">
            {images.length > 0 ? (
              images.map((img, index) => (
                <ImageCard
                  key={index}
                  imageUrl={img.image}
                  className="transition-transform transform hover:scale-105"
                />
              ))
            ) : (
              <div className="text-center text-gray-500 w-full">
                <FaHeart size={24} className="mx-auto mb-2 text-pink-500" />
                <p>No images yet. Add some to get started!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Image;
