import { useState, useEffect } from "react";
import CONFIG from '../Configuration';

function ChatHistory() {
  const [history, setHistory] = useState([]);

  const StoredData = localStorage.getItem("user");
  const user = JSON.parse(StoredData);
  
  const IP = CONFIG.IP || 'localhost';
  const PORT = CONFIG.PORT;

  const email = user.email;

  const FetchChatHistory = async () => {
    try {
      const response = await fetch(
        `http://${IP}:${PORT}/rooms/getChatHistory?email=${email}`
      );
      const result = await response.json();
      console.log("Fetched History:", result);
      setHistory(result);
    } catch (error) {
      console.error("Error fetching chat history:", error);
    }
  };

  useEffect(() => {
    FetchChatHistory();
  }, []);

  return (
    <div className="flex p-[6vh] h-[80vh]">
      <table className="text-left bg-white bg-opacity-10 backdrop-blur-lg rounded-lg shadow-lg text-white">
        <thead>
          <tr className="border-b border-white">
            <th className="px-[2vw] py-[1vh]">Chat with</th>
            <th className="px-[2vw] py-[1vh]">Date</th>
          </tr>
        </thead>
        <tbody>
          {history.length > 0 ? (
            history.map((chat, index) => (
              <tr key={index} className="border-b border-gray-300">
                <td className="px-[2vw] py-[1vh]">{chat.username || chat.receiver || "Unknown"}</td>
                <td className="px-[2vw] py-[1vh]">
                  {chat.date ? new Date(chat.date).toLocaleDateString() : "No date"}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2" className="text-center px-[2vw] py-[1vh]">
                No chat history available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ChatHistory;
