import {Chat,Titlebar} from '../Components';
import { FaHeart, FaComments, FaUsers, FaSmile, FaStar, FaThumbsUp, FaGift, FaEnvelope, FaGlobe } from 'react-icons/fa';

function ChatPage(){

    return(
        <div className='flex flex-col'>
            <Titlebar/>
            <div className='flex flex-row mt-[2vh] items-center'>
            <div className='relative flex flex-col items-center p-[1vh] ml-[3vw] gap-[2.4vh]'>
  
            <FaHeart className='absolute text-gray-400 opacity-35' style={{ top: '-30%', left: '-5%', fontSize: '10vw', transform: 'rotate(20deg)' }} />
            <FaComments className='absolute text-gray-300 opacity-35' style={{ top: '54%', left: '102%', fontSize: '7vw', transform: 'rotate(-15deg)' }} />
            <FaStar className='absolute text-clr3 opacity-35' style={{ top: '-30%', left: '40%', fontSize: '6vw', transform: 'rotate(10deg)' }} />
            <FaUsers className='absolute text-gray-400 opacity-35' style={{ top: '75%', left: '-5%', fontSize: '9vw', transform: 'rotate(-30deg)' }} />
            <FaHeart className='absolute text-clr3 opacity-35' style={{ top: '20%', left: '110%', fontSize: '6.5vw', transform: 'rotate(5deg)' }} />
            <FaSmile className='absolute text-gray-400 opacity-35' style={{ top: '-25%', left: '110%', fontSize: '8vw', transform: 'rotate(15deg)' }} />
            <FaStar className='absolute text-gray-300 opacity-35' style={{ top: '30%', left: '70%', fontSize: '8vw', transform: 'rotate(-10deg)' }} />
            <FaThumbsUp className='absolute text-clr3 opacity-35' style={{ top: '100%', left: '20%', fontSize: '9.5vw', transform: 'rotate(35deg)' }} />
            <FaGift className='absolute text-gray-300 opacity-35' style={{ top: '80%', left: '55%', fontSize: '11vw', transform: 'rotate(20deg)' }} />
            <FaEnvelope className='absolute text-clr3 opacity-35' style={{ top: '95%', left: '96%', fontSize: '11vw', transform: 'rotate(-15deg)' }} />
            <FaStar className='absolute text-gray-400 opacity-35' style={{ top: '25%', left: '8%', fontSize: '6.8vw', transform: 'rotate(10deg)' }} />
            <FaSmile className='absolute text-gray-300 opacity-35' style={{ top: '35%', left: '30%', fontSize: '8.2vw', transform: 'rotate(-30deg)' }} />
            <FaGlobe className='absolute text-clr3 opacity-35' style={{ top: '-15%', left: '75%', fontSize: '9vw', transform: 'rotate(15deg)' }} />

  <p className='text-[3.8vw] text-clr2 font-bold z-10'>Matrimonial AI</p>
  <p className='text-[3.8vw] text-clr3 font-bold ml-[16vw] z-10'>Chat Room</p>
  <p className='text-[1vw] text-gray-500 font-semibold w-[20vw] z-10'>
    Engage in meaningful conversations with your love interest in a private and secure environment. Build deeper connections, share your dreams, and explore your future together with every message.
  </p>
</div>
                <div className='ml-[12vw]'><Chat/></div>      
            </div>
        </div>
    );
}

export default ChatPage;