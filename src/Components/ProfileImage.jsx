import { useState, useEffect } from "react";
import { AiOutlineEye, AiOutlineClose } from "react-icons/ai";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import CONFIG from '../Configuration';

function ProfileImage({ profile_image, email }) {
  const [isHovered, setIsHovered] = useState(false);
  const [showCarousel, setShowCarousel] = useState(false);
  const [images, setImages] = useState([]);

  const IP = CONFIG.IP || 'localhost';
  const PORT = CONFIG.PORT;

  
  useEffect(() => {
    if (showCarousel) {
      const fetchImages = async () => {
        const response = await fetch(`http://${IP}:${PORT}/images/getImages?email=${email}`);
        const data = await response.json();
        setImages(data);
        console.log(data);
      };

      fetchImages();
    }
  }, [showCarousel, email]);

  const showProfileImages = () => {
    setShowCarousel(true);
  };

  const closeCarousel = () => {
    setShowCarousel(false);
  };

  return (
    <div className="relative w-[8vw] h-[18vh] cursor-pointer" 
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => setIsHovered(false)}
    >
      <img src={profile_image} alt="profile pic" className="w-full h-full object-cover" />
      <div
        className={`absolute inset-0 bg-black flex items-center justify-center 
            transition-opacity duration-300 ${isHovered ? 'bg-opacity-50 opacity-100' : 'bg-opacity-0 opacity-0'}`}
      >
        <AiOutlineEye
          className="text-white text-[4vw]"
          onClick={showProfileImages}
        />
      </div>

      {showCarousel && (
        <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="relative w-[60vw] h-[70vh] max-w-4xl max-h-[80vh] bg-white rounded-lg overflow-hidden shadow-lg">
      
            <button 
              className="absolute top-4 right-4 p-2 z-40 bg-gray-700 text-white rounded-full"
              onClick={closeCarousel}
            >
              <AiOutlineClose className="text-xl" />
            </button>

            <Carousel 
              showThumbs={false} 
              showIndicators={true} 
              autoPlay={true} 
              infiniteLoop={true} 
              emulateTouch={true}
              swipeable={true}
              centerMode={true}
            >
              {images.length > 0 ? (
                images.map((image, index) => (
                  <div key={index}>
                    <img 
                      src={`${image.image}`} 
                      alt={`Image ${index + 1}`} 
                      className="object-cover w-full h-[70vh] z-10"
                    />
                  </div>
                ))
              ) : (
                <div>No images available</div>
              )}
            </Carousel>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileImage;
