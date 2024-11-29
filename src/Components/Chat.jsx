import '../Styles/chat.css';
import socketIo from 'socket.io-client';
import Message from "./Message";
import ReactScrollToBottom from "react-scroll-to-bottom";
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import EmojiPicker from 'emoji-picker-react';
import CONFIG from '../Configuration';

let socket;

const NSFW_WORDS = [
    'abuse', 'fuck', 'fucked', 'racist', 'fucker', 'ass', 'exploit', 'porn', 'explicit', 'vulgar', 'naked', 
    'kill', 'murder', 'terrorist', 'rape', 'pussy', 'vagina', 'harass', 'slur', 'dick', 'abuser', 'bully', 
    'molest', 'illegal', 'drugs', 'cock', 'asshole', 'gay', 'transgender', 'sexy', 'suicide', 'kafir', 
    'misogyny', 'sexism', 'xenophobia', 'homophobia', 'transphobia', 'abduction', 'exploitation', 'trafficking', 
    'profanity', 'kaafir', 'degrading', 'humiliate', 'exploitative', 'sadist', 'cum', 'malicious', 'extremism', 
    'missionary', 'doggy', 'doggystyle', 'whore', 'boobs', 'boob', 'breast', 'hip', 'hips', 'nipple', 'orgasm', 
    'masturbate', 'masturbation', 'ejaculation', 'anal', 'squirting', 'squirt','blowjob', 'handjob', 'threesome', 
    'foursome', 'incest', 'penetration', 'creampie', 'gangbang', 'hentai', 'xhamster', 'fetish', 'dominatrix', 
    'submissive', 'sadomasochism', 'erotic', 'bondage', 'nude', 'strip', 'striptease', 'pornhub', 'xvideos', 
    'redtube', 'onlyfans', 'camgirl', 'camsite', 'amateur', 'adult', 'swinger', 'foreplay', 'hookup', 'sexcam',
    'brazzers', 'bangbros', 'naughtyamerica', 'teamSkeet', 'metart', 'joymii', 'realitykings', 'evilangel', 
    'digitalplayground', 'kink', 'vrporn', 'javhub', 'pornhd', 'desipapa', 'tamilsex', 'bhabhixxx', 'hindisex', 
    'bhabhiporn', 'desisexvideos', 'bangla', 'punesex', 'keralaporn', 'sikhporn', 'indiansex', 'malluporn', 
    'indianbhabhi', 'hotindian', 'indianfuck', 'indianporn', 'indiananal', 'indianhentai',
    'chutiya', 'gandu', 'bhenchod', 'madarchod', 'lund', 'chut', 'behenchod', 'bhosdike', 'gaand', 'chod', 
    'randi', 'saala', 'saali', 'chutmarani', 'bhen', 'ma', 'haraami', 'harami', 'paagal', 'bakchod', 
    'chodu', 'rakhail', 'chutiyapa', 'chutkula', 'ghus', 'bhadwa', 'bhadwe', 'lauda', 'laude', 'gaandfat', 
    'peshab', 'thook', 'chachundar', 'saand', 'gobar', 'kutta', 'kaminey', 'kaminay', 'hijra', 'gand', 'bsdk',
    'rapist', 'peeping', 'voyeur', 'scat', 'vomit', 'bestiality', 'pedophile', 'molester', 'maniac', 
    'pervert', 'necrophilia', 'zoophilia', 'gore', 'degradation', 'incel', 'simp', 'slut', 'hoe', 
    'hooker', 'bimbo', 'goldigger', 'smut', 'obscene', 'perversion', 'smutty', 'taboo', 'seduction', 
    'lewd', 'lustful', 'adultwork','infidelity','pornstar','bbc','blacked','blackedraw','bbw','spank','brazzer'
];


const checkNSFW = (text) => {
    const words = text.toLowerCase().split(/\s+/);
    return words.some(word => NSFW_WORDS.includes(word));
};

function Chat() {
    const location = useLocation();
    const { profile } = location.state;
    const StoredData = localStorage.getItem("user");
    const user = JSON.parse(StoredData);
    const [id, setid] = useState("");
    const [messages, setMessages] = useState([]);
    const [name, setName] = useState(user.username);
    const [room, setRoom] = useState(profile.room);
    const [showWarning, setShowWarning] = useState(false);
    const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);
    const [chatInput, setChatInput] = useState('');


    const IP = CONFIG.IP || 'localhost';
    const PORT = CONFIG.PORT;

    const joinRoom = () => {
        socket.emit('joinRoom', room);
    };
     
    const Warn = async () => {
        const email = user.email;
        const response = await fetch(`http://${IP}:${PORT}/rooms/giveWarning`, {
            method: 'POST',
            body: JSON.stringify({ email }),
            headers: { 'Content-Type': 'application/json' },
        });
    
        if (response.ok) {
            setShowWarning(true);
        } else {
            console.log("Error in Giving Warning");
        }
    };
    

    const send = () => {
        const message = document.getElementById('chatInput').value;

        if (checkNSFW(message)) {
            Warn();
            return;
        }

        socket.emit('message', { message, id, room });
        document.getElementById('chatInput').value = "";
    };

    const RequestChat = async () => {
        const chat1 = user.email;
        const chat2 = profile.email;
        const response = await fetch(`http://${IP}:${PORT}/rooms/saveChatRequest`, {
            method: 'POST',
            body: JSON.stringify({ chat1, chat2 }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) console.log("Request Sent");
        else console.log("Request Not Sent");
    };

    const handleEmojiClick = (emoji) => {
        setChatInput((prevInput) => prevInput + emoji.emoji);
    };

    useEffect(() => {
        socket = socketIo(`http://${IP}:4500`, { transports: ['websocket'] });
        socket.on("connect", () => {
            setid(socket.id);
        });
        joinRoom();
        socket.emit("joined", { name });
        socket.on("welcome", (data) => {
            setMessages([...messages, data]);
        });
        socket.on('userjoined', (data) => {
            setMessages([...messages, data]);
        });
        socket.on('leave', (data) => {
            setMessages([...messages, data]);
        });

        return () => {
            socket.off();
        };
    }, []);

    useEffect(() => {
        socket.on('sendMessage', (data) => {
            setMessages([...messages, data]);
            console.log(data.user, data.message, data.id);
        });
        return () => {
            socket.off();
        };
    }, [messages]);

    return (
        <div className='chat-container'>
           {showWarning && (
                <div className="absolute top-0 left-0 h-full w-full inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
                    <div className="warning-popup">
                        <div className="warning-content">
                            <div className="warning-icon">
                                <i className="fas fa-exclamation-circle"></i>
                            </div>
                            <p>Warning: Inappropriate language detected!</p>
                            <button onClick={() => setShowWarning(false)}>I am Sorry</button>
                        </div>
                    </div>
                </div>
            )}
            <div className='header'>
                <div className='profileInfo'>
                    <img src={profile.photo} className='chatimg' alt="Profile" />
                    <h2 className='sname'>{profile.username}</h2>
                </div>
                <div>
                    <button onClick={RequestChat}
                        className='text-white p-[0.7vh] border border-white rounded-[0.6vw] text-[1vw] mx-[1vw] hover:bg-white hover:text-pink-600'>Request Chat</button>
                </div>
            </div>
            <ReactScrollToBottom className="chatBox">
                {messages.map((item, i) => (
                    <Message
                        key={i}
                        user={item.id === id ? '' : item.user}
                        message={item.message}
                        classs={item.id === id ? 'right' : 'left'}
                    />
                ))}
            </ReactScrollToBottom>
            <div className="inputBox">
                {emojiPickerVisible && (
                    <div className="emoji-picker">
                        <EmojiPicker onEmojiClick={handleEmojiClick} />
                    </div>
                )}
                <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyPress={(event) => (event.key === 'Enter' ? send() : null)}
                    placeholder="Type a message..."
                    id="chatInput"
                />
                <button onClick={() => setEmojiPickerVisible(!emojiPickerVisible)} className="emoji-btn">
                    😊
                </button>
                <button onClick={send} className="sendBtn">
                    <img src="send.png" alt="Send" />
                </button>
            </div>
        </div>
    );
}

export default Chat;
