import { UpdateProfileForm } from '../Components';
import { FaHeart, FaComments, FaStar, FaUsers, FaSmile, FaThumbsUp, FaGift, FaEnvelope, FaGlobe } from 'react-icons/fa';

function UpdateProfile() {
    return (
        <div className="flex flex-col justify-center items-center w-[100vw] relative overflow-hidden">
            <div className="absolute left-0 flex flex-col items-end space-y-4 opacity-35">
                <FaHeart className="text-gray-400" style={{ fontSize: '10vw', transform: 'rotate(20deg)', marginTop: '-30%' }} />
                <FaComments className="text-gray-300" style={{ fontSize: '7vw', transform: 'rotate(-15deg)', marginTop: '20%' }} />
                <FaStar className="text-clr3" style={{ fontSize: '6vw', transform: 'rotate(10deg)', marginTop: '15%' }} />
                <FaUsers className="text-gray-400" style={{ fontSize: '9vw', transform: 'rotate(-30deg)', marginTop: '25%' }} />
                <FaSmile className="text-gray-300" style={{ fontSize: '8vw', transform: 'rotate(15deg)', marginTop: '30%' }} />
            </div>
            <div className="flex justify-center items-center">
                <UpdateProfileForm />
            </div>
            <div className="absolute right-0 flex flex-col items-start space-y-4 opacity-35">
                <FaStar className="text-gray-300" style={{ fontSize: '8vw', transform: 'rotate(-10deg)', marginTop: '5%' }} />
                <FaThumbsUp className="text-clr3" style={{ fontSize: '9.5vw', transform: 'rotate(35deg)', marginTop: '20%' }} />
                <FaGift className="text-gray-300" style={{ fontSize: '11vw', transform: 'rotate(20deg)', marginTop: '10%' }} />
                <FaEnvelope className="text-clr3" style={{ fontSize: '11vw', transform: 'rotate(-15deg)', marginTop: '15%' }} />
                <FaGlobe className="text-clr3" style={{ fontSize: '9vw', transform: 'rotate(15deg)', marginTop: '25%' }} />
            </div>
        </div>
    );
}

export default UpdateProfile;
